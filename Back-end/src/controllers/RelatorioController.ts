import { Request, Response } from 'express';
import { AppDataSource } from '../database/AppDataSource';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import Venda from '../models/Venda';
import ItemVenda from '../models/ItemVenda';
import { Produto } from '../models/Produto';
import { IsNull, Not } from 'typeorm';
import Movimentacao, { TipoMovimentacao } from '../models/Movimentacao'; // Importe Movimentacao e o Enum

// Função auxiliar para validar as datas recebidas
interface ValidacaoPeriodo {
  isValid: boolean;
  message: string;
  dataInicio: Date;
  dataFim: Date;
}

const validarPeriodo = (dataInicioStr: any, dataFimStr: any): ValidacaoPeriodo => {
  // Verificação obrigatória
  if (!dataInicioStr || !dataFimStr) {
    return {
      isValid: false,
      message: 'As datas de início e fim são obrigatórias.',
      dataInicio: new Date(), // Valor padrão
      dataFim: new Date()     // Valor padrão
    };
  }
  
  const dataInicio = new Date(dataInicioStr);
  const dataFim = new Date(dataFimStr);
  
  // Verificação de datas inválidas
  if (isNaN(dataInicio.getTime()) || isNaN(dataFim.getTime())) {
    return {
      isValid: false,
      message: 'Formato de data inválido.',
      dataInicio: new Date(),
      dataFim: new Date()
    };
  }
  
  // Verificação de intervalo
  if (dataInicio > dataFim) {
    return {
      isValid: false,
      message: 'A data de início não pode ser posterior à data de fim.',
      dataInicio,
      dataFim
    };
  }
  
  // Ajuste do horário
  dataFim.setHours(23, 59, 59, 999);
  
  return {
    isValid: true,
    message: '',
    dataInicio,
    dataFim
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
        .getRawMany();

      return res.status(200).json({ success: true, data: relatorio});
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
        .getRawMany();

      return res.status(200).json({ success: true, data: relatorio });
    } catch (error) {
      console.error('Erro ao gerar relatório de produtos mais vendidos:', error);
      return res.status(500).json({ success: false, message: 'Erro interno no servidor.' });
    }
  }

  /**
   * Gera um relatório financeiro com o total de entradas, saídas e o saldo em um período.
   * - Entradas: Vendas completadas + Movimentações manuais de 'ENTRADA'.
   * - Saídas: Movimentações manuais de 'SAIDA'.
   * - Saldo: Entradas - Saídas.
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
      // 1. Promessa para buscar o total de vendas completadas
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

      // 2. Promessa para buscar o total de movimentações de ENTRADA (ex: aportes)
      const totalEntradasManuaisPromise = AppDataSource.getRepository(Movimentacao)
        .createQueryBuilder('movimentacao')
        .innerJoin('movimentacao.caixa', 'caixa') // Junta com Caixa para filtrar pela loja
        .select('SUM(movimentacao.valor)', 'total')
        .where('caixa.id_loja = :id_loja', { id_loja })
        .andWhere('movimentacao.tipo = :tipo', { tipo: TipoMovimentacao.ENTRADA })
        .andWhere('movimentacao.criado_em BETWEEN :dataInicio AND :dataFim', {
          dataInicio,
          dataFim,
        })
        .getRawOne();

      // 3. Promessa para buscar o total de movimentações de SAÍDA (ex: sangrias, pagamentos)
      const totalSaidasPromise = AppDataSource.getRepository(Movimentacao)
        .createQueryBuilder('movimentacao')
        .innerJoin('movimentacao.caixa', 'caixa') // Junta com Caixa para filtrar pela loja
        .select('SUM(movimentacao.valor)', 'total')
        .where('caixa.id_loja = :id_loja', { id_loja })
        .andWhere('movimentacao.tipo = :tipo', { tipo: TipoMovimentacao.SAIDA })
        .andWhere('movimentacao.criado_em BETWEEN :dataInicio AND :dataFim', {
          dataInicio,
          dataFim,
        })
        .getRawOne();

      // Executa todas as consultas em paralelo
      const [resultadoVendas, resultadoEntradasManuais, resultadoSaidas] = await Promise.all([
        totalVendasPromise,
        totalEntradasManuaisPromise,
        totalSaidasPromise,
      ]);

      // Converte os resultados para número, tratando casos de valor nulo
      const totalDeVendas = parseFloat(resultadoVendas?.total) || 0;
      const totalEntradasManuais = parseFloat(resultadoEntradasManuais?.total) || 0;
      const totalSaidas = parseFloat(resultadoSaidas?.total) || 0;

      // Calcula os valores finais
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
   * Lista produtos cujo estoque total (soma de todas as suas variações)
   * está abaixo de um limite especificado (padrão: 7).
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
          relatorioConfig = await this.configurarRelatorioFormaPagamento(id_loja as string, filters);
          break;
        
        case 'estoque-baixo':
          relatorioConfig = await this.configurarRelatorioEstoque(id_loja as string, filters);
          break;
        
        default:
          return res.status(400).json({ success: false, message: 'Tipo de relatório inválido' });
      }
      
      // Gera o PDF
      const pdfBuffer = await this.gerarPDF(relatorioConfig);
      
      // Configura a resposta
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=${relatorioConfig.fileName}`);
      return res.send(pdfBuffer);
      
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      return res.status(500).json({ success: false, message: 'Erro ao gerar PDF' });
    }
  }
  
  // ==============================================
  // Métodos auxiliares para cada tipo de relatório
  // ==============================================
  
  private async configurarRelatorioFinanceiro(id_loja: string, filters: any) {
    const validacao = validarPeriodo(filters.dataInicio, filters.dataFim);
    
    if (!validacao.isValid) {
      throw new Error(validacao.message);
    }
    
    // Agora pode usar diretamente, sem verificação adicional
    const { dataInicio, dataFim } = validacao;
    
    try {
      // 1. Consultas paralelas com tipagem explícita
      const [totalVendas, totalEntradasManuais, totalSaidas] = await Promise.all([
        // Vendas completadas
        AppDataSource.getRepository(Venda)
            .createQueryBuilder('venda')
            .select('SUM(venda.total)', 'total')
            .where('venda.id_loja = :id_loja', { id_loja })
            .andWhere('venda.status = :status', { status: 'COMPLETADA' })
            .andWhere('venda.data_hora BETWEEN :dataInicio AND :dataFim', {
              dataInicio: validacao.dataInicio,
              dataFim: validacao.dataFim
            })
            .getRawOne<{ total: string | null }>(), // Tipagem do resultado
        
        // Movimentações de entrada
        AppDataSource.getRepository(Movimentacao)
            .createQueryBuilder('movimentacao')
            .innerJoin('movimentacao.caixa', 'caixa')
            .select('SUM(movimentacao.valor)', 'total')
            .where('caixa.id_loja = :id_loja', { id_loja })
            .andWhere('movimentacao.tipo = :tipo', { tipo: TipoMovimentacao.ENTRADA })
            .andWhere('movimentacao.criado_em BETWEEN :dataInicio AND :dataFim', {
              dataInicio: validacao.dataInicio,
              dataFim: validacao.dataFim
            })
            .getRawOne<{ total: string | null }>(),
        
        // Movimentações de saída
        AppDataSource.getRepository(Movimentacao)
            .createQueryBuilder('movimentacao')
            .innerJoin('movimentacao.caixa', 'caixa')
            .select('SUM(movimentacao.valor)', 'total')
            .where('caixa.id_loja = :id_loja', { id_loja })
            .andWhere('movimentacao.tipo = :tipo', { tipo: TipoMovimentacao.SAIDA })
            .andWhere('movimentacao.criado_em BETWEEN :dataInicio AND :dataFim', {
              dataInicio: validacao.dataInicio,
              dataFim: validacao.dataFim
            })
            .getRawOne<{ total: string | null }>()
      ]);
      
      // 2. Converter valores para número (tratando null/undefined)
      const toNumber = (value: string | null | undefined) => parseFloat(value || '0') || 0;
      
      const totalVendasValue = toNumber(totalVendas?.total);
      const totalEntradasValue = toNumber(totalEntradasManuais?.total);
      const totalSaidasValue = toNumber(totalSaidas?.total);
      
      // 3. Calcular totais
      const total_entradas = totalVendasValue + totalEntradasValue;
      const saldo = total_entradas - totalSaidasValue;
      
      // 4. Retornar estrutura para o PDF
      return {
        title: 'Relatório Financeiro',
        fileName: 'relatorio-financeiro.pdf',
        columns: [
          { title: 'Descrição', dataKey: 'descricao' },
          { title: 'Valor (R$)', dataKey: 'valor', format: 'currency' }
        ],
        data: [
          { descricao: 'Total de Vendas', valor: totalVendasValue },
          { descricao: 'Entradas Manuais', valor: totalEntradasValue },
          { descricao: 'Total de Saídas', valor: totalSaidasValue },
          { descricao: 'Saldo Final', valor: saldo }
        ],
        filters: {
          periodo: `${validacao.dataInicio.toLocaleDateString()} a ${validacao.dataFim.toLocaleDateString()}`,
          loja: id_loja
        }
      };
      
    } catch (error) {
      console.error('Erro ao gerar relatório financeiro:', error);
      throw new Error('Falha ao processar relatório financeiro');
    }
  }
  
  private async configurarRelatorioFormaPagamento(id_loja: string, filters: any) {
    const validacao = validarPeriodo(filters.dataInicio, filters.dataFim);
    if (!validacao.isValid || !validacao.dataInicio || !validacao.dataFim) {
      throw new Error(validacao.message || 'Período inválido');
    }
    
    const data = await AppDataSource.getRepository(Venda)
        .createQueryBuilder('venda')
        // ... (consulta existente do getVendasPorFormaPagamento)
        .getRawMany();
    
    return {
      title: 'Vendas por Forma de Pagamento',
      fileName: 'vendas-forma-pagamento.pdf',
      columns: [
        { title: 'Forma de Pagamento', dataKey: 'forma_pagamento' },
        { title: 'Total Arrecadado (R$)', dataKey: 'total_arrecadado', format: 'currency' },
        { title: 'Qtd. Transações', dataKey: 'quantidade_transacoes' }
      ],
      data,
      filters: {
        periodo: `${validacao.dataInicio.toLocaleDateString()} a ${validacao.dataFim.toLocaleDateString()}`,
        loja: id_loja
      }
    };
  }
  
  private async configurarRelatorioEstoque(id_loja: string, filters: any) {
    const limite = parseInt(filters.limite as string) || 7;
    
    const data = await AppDataSource.getRepository(Produto)
        .createQueryBuilder('produto')
        // ... (consulta existente do getProdutosComEstoqueBaixo)
        .getRawMany();
    
    return {
      title: 'Produtos com Estoque Baixo',
      fileName: 'estoque-baixo.pdf',
      columns: [
        { title: 'Referência', dataKey: 'referencia' },
        { title: 'Produto', dataKey: 'nome' },
        { title: 'Estoque Total', dataKey: 'estoque_total' }
      ],
      data,
      filters: {
        limite,
        loja: id_loja
      }
    };
  }
  
  private async configurarRelatorioFuncionarios(id_loja: string, filters: any) {
    const validacao = validarPeriodo(filters.dataInicio, filters.dataFim);
    if (!validacao.isValid) throw new Error(validacao.message);
    
    const data = await AppDataSource.getRepository(Venda)
        .createQueryBuilder('venda')
        // ... (consulta existente do getRankingFuncionariosPorVenda)
        .getRawMany();
    
    return {
      title: 'Ranking de Funcionários',
      fileName: 'ranking-funcionarios.pdf',
      columns: [
        { title: 'Funcionário', dataKey: 'nome_funcionario' },
        { title: 'Total Vendido (R$)', dataKey: 'total_vendido', format: 'currency' }
      ],
      data,
      filters: {
        periodo: `${validacao.dataInicio.toLocaleDateString()} a ${validacao.dataFim.toLocaleDateString()}`,
        loja: id_loja
      }
    };
  }
  
  private async configurarRelatorioProdutos(id_loja: string, filters: any) {
    const validacao = validarPeriodo(filters.dataInicio, filters.dataFim);
    if (!validacao.isValid) throw new Error(validacao.message);
    
    const data = await AppDataSource.getRepository(ItemVenda)
        .createQueryBuilder('item_venda')
        // ... (consulta existente do getProdutosMaisVendidos)
        .getRawMany();
    
    return {
      title: 'Produtos Mais Vendidos',
      fileName: 'produtos-mais-vendidos.pdf',
      columns: [
        { title: 'Produto', dataKey: 'nome_produto' },
        { title: 'Referência', dataKey: 'referencia_produto' },
        { title: 'Qtd. Vendida', dataKey: 'total_unidades_vendidas' }
      ],
      data,
      filters: {
        periodo: `${validacao.dataInicio.toLocaleDateString()} a ${validacao.dataFim.toLocaleDateString()}`,
        loja: id_loja
      }
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
      unit: 'mm'
    });
    
    // Cabeçalho
    doc.setFontSize(16);
    doc.text(config.title, 14, 20);
    doc.setFontSize(10);
    doc.text(`Período: ${config.filters.periodo}`, 14, 30);
    doc.text(`Loja: ${config.filters.loja}`, 14, 35);
    
    // Preparar dados da tabela
    const body = config.data.map(item =>
        config.columns.map(col => {
          if (col.format === 'currency') {
            return `R$ ${parseFloat(item[col.dataKey]).toFixed(2)}`;
          }
          return item[col.dataKey];
        })
    );
    
    // Gerar tabela
    (doc as any).autoTable({
      head: [config.columns.map(col => col.title)],
      body: body,
      startY: 40,
      margin: { top: 40 },
      styles: {
        fontSize: 8,
        cellPadding: 2,
        overflow: 'linebreak'
      },
      columnStyles: {
        1: { cellWidth: 30 }, // Ajuste conforme necessário
      }
    });
    
    // Rodapé
    const date = new Date().toLocaleString();
    doc.setFontSize(8);
    doc.text(`Gerado em: ${date}`, 14, (doc as any).lastAutoTable.finalY + 10);
    
    return doc.output('arraybuffer');
  }
}
