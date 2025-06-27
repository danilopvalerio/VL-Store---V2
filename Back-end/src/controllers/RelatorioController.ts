import { Request, Response } from 'express';
import { AppDataSource } from '../database/AppDataSource';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import Venda from '../models/Venda';
import ItemVenda from '../models/ItemVenda';
import { Produto } from '../models/Produto';
import { IsNull, Not } from 'typeorm';
import Movimentacao, { TipoMovimentacao } from '../models/Movimentacao';

// Função auxiliar para validar as datas recebidas
interface ValidacaoPeriodo {
  isValid: boolean;
  message: string;
  dataInicio: Date;
  dataFim: Date;
}

/**
 * Função auxiliar ajustada para validar e formatar o período corretamente.
 * Trata as strings 'AAAA-MM-DD' para cobrir o dia inteiro no fuso horário local.
 */
const validarPeriodo = (dataInicioStr: any, dataFimStr: any): ValidacaoPeriodo => {
  // Verificação obrigatória
  if (!dataInicioStr || !dataFimStr) {
    return {
      isValid: false,
      message: 'As datas de início e fim são obrigatórias.',
      dataInicio: new Date(),
      dataFim: new Date(),
    };
  }

  // Constrói a data com hora para forçar o fuso horário local e evitar ambiguidades do UTC
  const dataInicio = new Date(`${dataInicioStr}T00:00:00`);
  const dataFim = new Date(`${dataFimStr}T00:00:00`);

  // Verificação de datas inválidas
  if (isNaN(dataInicio.getTime()) || isNaN(dataFim.getTime())) {
    return {
      isValid: false,
      message: 'Formato de data inválido. Use AAAA-MM-DD.',
      dataInicio: new Date(),
      dataFim: new Date(),
    };
  }

  // Verificação de intervalo
  if (dataInicio > dataFim) {
    return {
      isValid: false,
      message: 'A data de início não pode ser posterior à data de fim.',
      dataInicio,
      dataFim,
    };
  }

  // Garante que o intervalo cubra o dia inteiro
  // Define a data de início para o primeiro milissegundo do dia.
  dataInicio.setHours(0, 0, 0, 0);
  // Define a data de fim para o último milissegundo do dia.
  dataFim.setHours(23, 59, 59, 999);

  return {
    isValid: true,
    message: '',
    dataInicio,
    dataFim,
  };
};

export default class RelatorioController {
  /**
   * Relatório de ranking de funcionários por total de vendas em um período.
   */
  async getRankingFuncionariosPorVenda(req: Request, res: Response) {
    const { id_loja } = req.params;
    const { dataInicio: dataInicioStr, dataFim: dataFimStr } = req.query;

    const validacao = validarPeriodo(dataInicioStr, dataFimStr);
    if (!validacao.isValid) {
      return res.status(400).json({ success: false, message: validacao.message });
    }
    const { dataInicio, dataFim } = validacao;

    try {
      const relatorio = await AppDataSource.getRepository(Venda)
        .createQueryBuilder('venda')
        .select('funcionario.nome', 'nome_funcionario')
        .addSelect('SUM(venda.total)', 'total_vendido')
        .innerJoin('venda.funcionario', 'funcionario')
        .where('venda.id_loja = :id_loja', { id_loja })
        .andWhere('venda.status = :status', { status: 'COMPLETADA' })
        .andWhere('venda.data_hora BETWEEN :dataInicio AND :dataFim', {
          dataInicio,
          dataFim,
        })
        .groupBy('funcionario.id_funcionario, funcionario.nome')
        .orderBy('total_vendido', 'DESC')
        .limit(15)
        .getRawMany();

      return res.status(200).json({ success: true, data: relatorio });
    } catch (error) {
      console.error('Erro ao gerar relatório de ranking de funcionários:', error);
      return res.status(500).json({ success: false, message: 'Erro interno no servidor.' });
    }
  }

  /**
   * Relatório de produtos mais vendidos (em unidades) em um período.
   */
  async getProdutosMaisVendidos(req: Request, res: Response) {
    const { id_loja } = req.params;
    const { dataInicio: dataInicioStr, dataFim: dataFimStr } = req.query;

    const validacao = validarPeriodo(dataInicioStr, dataFimStr);
    if (!validacao.isValid) {
      return res.status(400).json({ success: false, message: validacao.message });
    }
    const { dataInicio, dataFim } = validacao;

    try {
      const relatorio = await AppDataSource.getRepository(ItemVenda)
        .createQueryBuilder('item_venda')
        .select('produto.nome', 'nome_produto')
        .addSelect('produto.referencia', 'referencia_produto')
        .addSelect('SUM(item_venda.quantidade)', 'total_unidades_vendidas')
        .innerJoin('item_venda.venda', 'venda')
        .innerJoin('item_venda.variacao', 'variacao')
        .innerJoin('variacao.produto', 'produto')
        .where('venda.id_loja = :id_loja', { id_loja })
        .andWhere('venda.status = :status', { status: 'COMPLETADA' })
        .andWhere('venda.data_hora BETWEEN :dataInicio AND :dataFim', {
          dataInicio,
          dataFim,
        })
        .groupBy('produto.referencia, produto.nome')
        .orderBy('total_unidades_vendidas', 'DESC')
        .limit(15)
        .getRawMany();

      return res.status(200).json({ success: true, data: relatorio });
    } catch (error) {
      console.error('Erro ao gerar relatório de produtos mais vendidos:', error);
      return res.status(500).json({ success: false, message: 'Erro interno no servidor.' });
    }
  }

  /**
   * Gera um relatório financeiro com o total de entradas, saídas e o saldo em um período.
   */
  async getRelatorioFinanceiro(req: Request, res: Response) {
    const { id_loja } = req.params;
    const { dataInicio: dataInicioStr, dataFim: dataFimStr } = req.query;

    const validacao = validarPeriodo(dataInicioStr, dataFimStr);
    if (!validacao.isValid) {
      return res.status(400).json({ success: false, message: validacao.message });
    }
    const { dataInicio, dataFim } = validacao;

    try {
      const totalVendasPromise = AppDataSource.getRepository(Venda)
        .createQueryBuilder('venda')
        .select('SUM(venda.total)', 'total')
        .where('venda.id_loja = :id_loja', { id_loja })
        .andWhere('venda.status = :status', { status: 'COMPLETADA' })
        .andWhere('venda.data_hora BETWEEN :dataInicio AND :dataFim', {
          dataInicio,
          dataFim,
        })
        .getRawOne();

      const totalEntradasManuaisPromise = AppDataSource.getRepository(Movimentacao)
        .createQueryBuilder('movimentacao')
        .innerJoin('movimentacao.caixa', 'caixa')
        .select('SUM(movimentacao.valor)', 'total')
        .where('caixa.id_loja = :id_loja', { id_loja })
        .andWhere('movimentacao.tipo = :tipo', { tipo: TipoMovimentacao.ENTRADA })
        .andWhere('movimentacao.criado_em BETWEEN :dataInicio AND :dataFim', {
          dataInicio,
          dataFim,
        })
        .getRawOne();

      const totalSaidasPromise = AppDataSource.getRepository(Movimentacao)
        .createQueryBuilder('movimentacao')
        .innerJoin('movimentacao.caixa', 'caixa')
        .select('SUM(movimentacao.valor)', 'total')
        .where('caixa.id_loja = :id_loja', { id_loja })
        .andWhere('movimentacao.tipo = :tipo', { tipo: TipoMovimentacao.SAIDA })
        .andWhere('movimentacao.criado_em BETWEEN :dataInicio AND :dataFim', {
          dataInicio,
          dataFim,
        })
        .getRawOne();

      const [resultadoVendas, resultadoEntradasManuais, resultadoSaidas] = await Promise.all([
        totalVendasPromise,
        totalEntradasManuaisPromise,
        totalSaidasPromise,
      ]);

      const totalDeVendas = parseFloat(resultadoVendas?.total) || 0;
      const totalEntradasManuais = parseFloat(resultadoEntradasManuais?.total) || 0;
      const totalSaidas = parseFloat(resultadoSaidas?.total) || 0;

      const total_entradas = totalDeVendas + totalEntradasManuais;
      const total_saidas = totalSaidas;
      const saldo = total_entradas - total_saidas;

      return res.status(200).json({
        success: true,
        data: {
          total_entradas: total_entradas,
          total_saidas: total_saidas,
          saldo: saldo,
        },
      });
    } catch (error) {
      console.error('Erro ao gerar relatório financeiro:', error);
      return res.status(500).json({ success: false, message: 'Erro interno no servidor.' });
    }
  }

  /**
   * Relatório de vendas agrupadas por forma de pagamento em um período.
   */
  async getVendasPorFormaPagamento(req: Request, res: Response) {
    const { id_loja } = req.params;
    const { dataInicio: dataInicioStr, dataFim: dataFimStr } = req.query;

    const validacao = validarPeriodo(dataInicioStr, dataFimStr);
    if (!validacao.isValid) {
      return res.status(400).json({ success: false, message: validacao.message });
    }
    const { dataInicio, dataFim } = validacao;

    try {
      const relatorio = await AppDataSource.getRepository(Venda)
        .createQueryBuilder('venda')
        .select('venda.forma_pagamento', 'forma_pagamento')
        .addSelect('SUM(venda.total)', 'total_arrecadado')
        .addSelect('COUNT(venda.id_venda)', 'quantidade_transacoes')
        .where('venda.id_loja = :id_loja', { id_loja })
        .andWhere('venda.status = :status', { status: 'COMPLETADA' })
        .andWhere('venda.data_hora BETWEEN :dataInicio AND :dataFim', {
          dataInicio,
          dataFim,
        })
        .groupBy('venda.forma_pagamento')
        .orderBy('total_arrecadado', 'DESC')
        .getRawMany();

      return res.status(200).json({ success: true, data: relatorio });
    } catch (error) {
      console.error('Erro ao gerar relatório por forma de pagamento:', error);
      return res.status(500).json({ success: false, message: 'Erro interno no servidor.' });
    }
  }

  /**
   * Lista produtos cujo estoque total está abaixo de um limite.
   */
  async getProdutosComEstoqueBaixo(req: Request, res: Response) {
    const { id_loja } = req.params;
    const limite = parseInt(req.query.limite as string) || 7;

    try {
      const relatorio = await AppDataSource.getRepository(Produto)
        .createQueryBuilder('produto')
        .select('produto.referencia', 'referencia')
        .addSelect('produto.nome', 'nome')
        .addSelect('SUM(variacao.quant_variacao)', 'estoque_total')
        .leftJoin('produto.variacoes', 'variacao')
        .where('produto.id_loja = :id_loja', { id_loja })
        .groupBy('produto.referencia, produto.nome')
        .having('SUM(variacao.quant_variacao) < :limite OR SUM(variacao.quant_variacao) IS NULL', {
          limite,
        })
        .orderBy('estoque_total', 'ASC')
        .getRawMany();

      return res.status(200).json({ success: true, data: relatorio });
    } catch (error) {
      console.error('Erro ao gerar relatório de estoque baixo:', error);
      return res.status(500).json({ success: false, message: 'Erro interno no servidor.' });
    }
  }

  /**
   * Rota principal para gerar qualquer relatório em formato PDF.
   */
  async gerarRelatorioPDF(req: Request, res: Response) {
    const { tipo, id_loja, ...filters } = req.query;

    try {
      let relatorioConfig: any;

      switch (tipo) {
        case 'ranking-funcionarios':
          relatorioConfig = await this.configurarRelatorioFuncionarios(id_loja as string, filters);
          break;

        case 'produtos-mais-vendidos':
          relatorioConfig = await this.configurarRelatorioProdutos(id_loja as string, filters);
          break;

        case 'financeiro':
          relatorioConfig = await this.configurarRelatorioFinanceiro(id_loja as string, filters);
          break;

        case 'vendas-forma-pagamento':
          relatorioConfig = await this.configurarRelatorioFormaPagamento(
            id_loja as string,
            filters,
          );
          break;

        case 'estoque-baixo':
          relatorioConfig = await this.configurarRelatorioEstoque(id_loja as string, filters);
          break;

        default:
          return res.status(400).json({ success: false, message: 'Tipo de relatório inválido' });
      }

      const pdfBuffer = await this.gerarPDF(relatorioConfig);

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=${relatorioConfig.fileName}`);
      return res.send(pdfBuffer);
    } catch (error) {
      // Se o erro for de validação, envia a mensagem específica
      if (
        error instanceof Error &&
        (error.message.includes('obrigatórias') || error.message.includes('inválido'))
      ) {
        return res.status(400).json({ success: false, message: error.message });
      }
      console.error('Erro ao gerar PDF:', error);
      return res.status(500).json({ success: false, message: 'Erro interno ao gerar PDF' });
    }
  }

  // ==============================================
  // Métodos auxiliares privados para configurar cada relatório
  // ==============================================

  private async configurarRelatorioFinanceiro(id_loja: string, filters: any) {
    const validacao = validarPeriodo(filters.dataInicio, filters.dataFim);
    if (!validacao.isValid) {
      throw new Error(validacao.message);
    }
    const { dataInicio, dataFim } = validacao;

    try {
      const [totalVendas, totalEntradasManuais, totalSaidas] = await Promise.all([
        AppDataSource.getRepository(Venda)
          .createQueryBuilder('venda')
          .select('SUM(venda.total)', 'total')
          .where('venda.id_loja = :id_loja', { id_loja })
          .andWhere('venda.status = :status', { status: 'COMPLETADA' })
          .andWhere('venda.data_hora BETWEEN :dataInicio AND :dataFim', { dataInicio, dataFim })
          .getRawOne<{ total: string | null }>(),

        AppDataSource.getRepository(Movimentacao)
          .createQueryBuilder('movimentacao')
          .innerJoin('movimentacao.caixa', 'caixa')
          .select('SUM(movimentacao.valor)', 'total')
          .where('caixa.id_loja = :id_loja', { id_loja })
          .andWhere('movimentacao.tipo = :tipo', { tipo: TipoMovimentacao.ENTRADA })
          .andWhere('movimentacao.criado_em BETWEEN :dataInicio AND :dataFim', {
            dataInicio,
            dataFim,
          })
          .getRawOne<{ total: string | null }>(),

        AppDataSource.getRepository(Movimentacao)
          .createQueryBuilder('movimentacao')
          .innerJoin('movimentacao.caixa', 'caixa')
          .select('SUM(movimentacao.valor)', 'total')
          .where('caixa.id_loja = :id_loja', { id_loja })
          .andWhere('movimentacao.tipo = :tipo', { tipo: TipoMovimentacao.SAIDA })
          .andWhere('movimentacao.criado_em BETWEEN :dataInicio AND :dataFim', {
            dataInicio,
            dataFim,
          })
          .getRawOne<{ total: string | null }>(),
      ]);

      const toNumber = (value: string | null | undefined) => parseFloat(value || '0') || 0;
      const totalVendasValue = toNumber(totalVendas?.total);
      const totalEntradasValue = toNumber(totalEntradasManuais?.total);
      const totalSaidasValue = toNumber(totalSaidas?.total);
      const total_entradas = totalVendasValue + totalEntradasValue;
      const saldo = total_entradas - totalSaidasValue;

      return {
        title: 'Relatório Financeiro',
        fileName: 'relatorio-financeiro.pdf',
        columns: [
          { title: 'Descrição', dataKey: 'descricao' },
          { title: 'Valor (R$)', dataKey: 'valor', format: 'currency' },
        ],
        data: [
          { descricao: 'Total de Vendas', valor: totalVendasValue },
          { descricao: 'Entradas Manuais', valor: totalEntradasValue },
          { descricao: 'Total de Saídas', valor: totalSaidasValue },
          { descricao: 'Saldo Final', valor: saldo },
        ],
        filters: {
          periodo: `${validacao.dataInicio.toLocaleDateString('pt-BR')} a ${validacao.dataFim.toLocaleDateString('pt-BR')}`,
          loja: id_loja,
        },
      };
    } catch (error) {
      console.error('Erro ao configurar relatório financeiro:', error);
      throw new Error('Falha ao processar relatório financeiro');
    }
  }

  private async configurarRelatorioFormaPagamento(id_loja: string, filters: any) {
    const validacao = validarPeriodo(filters.dataInicio, filters.dataFim);
    if (!validacao.isValid) throw new Error(validacao.message);

    const { dataInicio, dataFim } = validacao;
    const data = await AppDataSource.getRepository(Venda)
      .createQueryBuilder('venda')
      .select('venda.forma_pagamento', 'forma_pagamento')
      .addSelect('SUM(venda.total)', 'total_arrecadado')
      .addSelect('COUNT(venda.id_venda)', 'quantidade_transacoes')
      .where('venda.id_loja = :id_loja', { id_loja })
      .andWhere('venda.status = :status', { status: 'COMPLETADA' })
      .andWhere('venda.data_hora BETWEEN :dataInicio AND :dataFim', { dataInicio, dataFim })
      .groupBy('venda.forma_pagamento')
      .orderBy('total_arrecadado', 'DESC')
      .getRawMany();

    return {
      title: 'Vendas por Forma de Pagamento',
      fileName: 'vendas-forma-pagamento.pdf',
      columns: [
        { title: 'Forma de Pagamento', dataKey: 'forma_pagamento' },
        { title: 'Total Arrecadado (R$)', dataKey: 'total_arrecadado', format: 'currency' },
        { title: 'Qtd. Transações', dataKey: 'quantidade_transacoes' },
      ],
      data,
      filters: {
        periodo: `${validacao.dataInicio.toLocaleDateString('pt-BR')} a ${validacao.dataFim.toLocaleDateString('pt-BR')}`,
        loja: id_loja,
      },
    };
  }

  private async configurarRelatorioEstoque(id_loja: string, filters: any) {
    const limite = parseInt(filters.limite as string) || 7;

    const data = await AppDataSource.getRepository(Produto)
      .createQueryBuilder('produto')
      .select('produto.referencia', 'referencia')
      .addSelect('produto.nome', 'nome')
      .addSelect('SUM(variacao.quant_variacao)', 'estoque_total')
      .leftJoin('produto.variacoes', 'variacao')
      .where('produto.id_loja = :id_loja', { id_loja })
      .groupBy('produto.referencia, produto.nome')
      .having('SUM(variacao.quant_variacao) < :limite OR SUM(variacao.quant_variacao) IS NULL', {
        limite,
      })
      .orderBy('estoque_total', 'ASC')
      .getRawMany();

    return {
      title: 'Produtos com Estoque Baixo',
      fileName: 'estoque-baixo.pdf',
      columns: [
        { title: 'Referência', dataKey: 'referencia' },
        { title: 'Produto', dataKey: 'nome' },
        { title: 'Estoque Total', dataKey: 'estoque_total' },
      ],
      data,
      filters: {
        limite,
        loja: id_loja,
      },
    };
  }

  private async configurarRelatorioFuncionarios(id_loja: string, filters: any) {
    const validacao = validarPeriodo(filters.dataInicio, filters.dataFim);
    if (!validacao.isValid) throw new Error(validacao.message);

    const { dataInicio, dataFim } = validacao;
    const data = await AppDataSource.getRepository(Venda)
      .createQueryBuilder('venda')
      .select('funcionario.nome', 'nome_funcionario')
      .addSelect('SUM(venda.total)', 'total_vendido')
      .innerJoin('venda.funcionario', 'funcionario')
      .where('venda.id_loja = :id_loja', { id_loja })
      .andWhere('venda.status = :status', { status: 'COMPLETADA' })
      .andWhere('venda.data_hora BETWEEN :dataInicio AND :dataFim', { dataInicio, dataFim })
      .groupBy('funcionario.id_funcionario, funcionario.nome')
      .orderBy('total_vendido', 'DESC')
      .getRawMany();

    return {
      title: 'Ranking de Funcionários',
      fileName: 'ranking-funcionarios.pdf',
      columns: [
        { title: 'Funcionário', dataKey: 'nome_funcionario' },
        { title: 'Total Vendido (R$)', dataKey: 'total_vendido', format: 'currency' },
      ],
      data,
      filters: {
        periodo: `${validacao.dataInicio.toLocaleDateString('pt-BR')} a ${validacao.dataFim.toLocaleDateString('pt-BR')}`,
        loja: id_loja,
      },
    };
  }

  private async configurarRelatorioProdutos(id_loja: string, filters: any) {
    const validacao = validarPeriodo(filters.dataInicio, filters.dataFim);
    if (!validacao.isValid) throw new Error(validacao.message);

    const { dataInicio, dataFim } = validacao;
    const data = await AppDataSource.getRepository(ItemVenda)
      .createQueryBuilder('item_venda')
      .select('produto.nome', 'nome_produto')
      .addSelect('produto.referencia', 'referencia_produto')
      .addSelect('SUM(item_venda.quantidade)', 'total_unidades_vendidas')
      .innerJoin('item_venda.venda', 'venda')
      .innerJoin('item_venda.variacao', 'variacao')
      .innerJoin('variacao.produto', 'produto')
      .where('venda.id_loja = :id_loja', { id_loja })
      .andWhere('venda.status = :status', { status: 'COMPLETADA' })
      .andWhere('venda.data_hora BETWEEN :dataInicio AND :dataFim', { dataInicio, dataFim })
      .groupBy('produto.referencia, produto.nome')
      .orderBy('total_unidades_vendidas', 'DESC')
      .getRawMany();

    return {
      title: 'Produtos Mais Vendidos',
      fileName: 'produtos-mais-vendidos.pdf',
      columns: [
        { title: 'Produto', dataKey: 'nome_produto' },
        { title: 'Referência', dataKey: 'referencia_produto' },
        { title: 'Qtd. Vendida', dataKey: 'total_unidades_vendidas' },
      ],
      data,
      filters: {
        periodo: `${validacao.dataInicio.toLocaleDateString('pt-BR')} a ${validacao.dataFim.toLocaleDateString('pt-BR')}`,
        loja: id_loja,
      },
    };
  }

  // ==============================================
  // Gerador de PDF genérico
  // ==============================================
  private async gerarPDF(config: {
    title: string;
    columns: { title: string; dataKey: string; format?: string }[];
    data: any[];
    filters: any;
  }) {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
    });

    doc.setFontSize(16);
    doc.text(config.title, 14, 20);
    doc.setFontSize(10);

    let filterText = '';
    if (config.filters.periodo) {
      filterText = `Período: ${config.filters.periodo}`;
    } else if (config.filters.limite) {
      filterText = `Listando produtos com estoque abaixo de: ${config.filters.limite} unidades`;
    }

    if (filterText) {
      doc.text(filterText, 14, 30);
    }
    doc.text(`Loja: ${config.filters.loja}`, 14, 35);

    const body = config.data.map((item) =>
      config.columns.map((col) => {
        const value = item[col.dataKey];
        if (value === null || value === undefined) return '';

        if (col.format === 'currency') {
          return `R$ ${parseFloat(value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        }
        return value;
      }),
    );

    (doc as any).autoTable({
      head: [config.columns.map((col) => col.title)],
      body: body,
      startY: 45,
      margin: { top: 45 },
      styles: {
        fontSize: 8,
        cellPadding: 2,
        overflow: 'linebreak',
      },
      headStyles: {
        fillColor: [41, 128, 185], // Um tom de azul
        textColor: 255,
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245], // Um cinza bem claro
      },
    });

    const date = new Date().toLocaleString('pt-BR');
    const pageCount = (doc as any).internal.getNumberOfPages();

    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.text(`Gerado em: ${date}`, 14, doc.internal.pageSize.height - 10);
      doc.text(
        `Página ${i} de ${pageCount}`,
        doc.internal.pageSize.width - 35,
        doc.internal.pageSize.height - 10,
      );
    }

    return doc.output('arraybuffer');
  }
}
