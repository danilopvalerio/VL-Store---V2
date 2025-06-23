import { Request, Response } from 'express';
import { AppDataSource } from '../database/AppDataSource';
import Venda from '../models/Venda';
import ItemVenda from '../models/ItemVenda';
import { Produto } from '../models/Produto';
import { IsNull, Not } from 'typeorm';
import Movimentacao, { TipoMovimentacao } from '../models/Movimentacao'; // Importe Movimentacao e o Enum

// Função auxiliar para validar as datas recebidas
const validarPeriodo = (dataInicioStr: any, dataFimStr: any) => {
  if (!dataInicioStr || !dataFimStr) {
    return {
      isValid: false,
      message: 'As datas de início e fim são obrigatórias.',
    };
  }
  const dataInicio = new Date(dataInicioStr);
  const dataFim = new Date(dataFimStr);

  if (isNaN(dataInicio.getTime()) || isNaN(dataFim.getTime())) {
    return { isValid: false, message: 'Formato de data inválido.' };
  }
  if (dataInicio > dataFim) {
    return {
      isValid: false,
      message: 'A data de início não pode ser posterior à data de fim.',
    };
  }

  // Ajusta a data de fim para incluir o dia inteiro
  dataFim.setHours(23, 59, 59, 999);

  return { isValid: true, dataInicio, dataFim, message: '' };
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
}
