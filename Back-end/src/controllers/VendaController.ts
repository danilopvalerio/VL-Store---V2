import { Request, Response } from 'express';
import { In, Repository } from 'typeorm';
import { AppDataSource } from '../database/AppDataSource';
import Venda from '../models/Venda';
import ItemVenda from '../models/ItemVenda';
import { ProdutoVariacao } from './../models/Produto';
import Funcionario from '../models/Funcionario';

interface ItemVendaDTO {
  id_variacao: string;
  quantidade: number;
  preco_unitario: number;
}

interface VendaDTO {
  id_funcionario: string;
  forma_pagamento: string;
  itens: ItemVendaDTO[];
  desconto?: number;
  acrescimo?: number;
}

export default class VendaController {
  private readonly vendaRepositorio: Repository<Venda>;
  private readonly itemVendaRepositorio: Repository<ItemVenda>;
  private readonly variacaoRepositorio: Repository<ProdutoVariacao>;
  private readonly funcionarioRepositorio: Repository<Funcionario>;

  constructor() {
    this.vendaRepositorio = AppDataSource.getRepository(Venda);
    this.itemVendaRepositorio = AppDataSource.getRepository(ItemVenda);
    this.variacaoRepositorio = AppDataSource.getRepository(ProdutoVariacao);
    this.funcionarioRepositorio = AppDataSource.getRepository(Funcionario);
  }

  async createVenda(req: Request, res: Response) {
    const vendaDTO: VendaDTO = req.body;

    try {
      // Validar dados da venda
      if (
        !vendaDTO.id_funcionario ||
        !vendaDTO.forma_pagamento ||
        !vendaDTO.itens ||
        vendaDTO.itens.length === 0
      ) {
        return res.status(400).json({
          success: false,
          message: 'Dados incompletos para registrar a venda',
        });
      }

      // Verificar se funcionário existe
      const funcionario = await this.funcionarioRepositorio.findOneBy({
        id_funcionario: vendaDTO.id_funcionario,
      });

      if (!funcionario) {
        return res.status(404).json({
          success: false,
          message: 'Funcionário não encontrado',
        });
      }

      // Calcular total da venda
      let subtotal = 0;
      const itensComVariacoes = [];

      // Verificar estoque e preços
      for (const item of vendaDTO.itens) {
        const variacao = await this.variacaoRepositorio.findOneBy({
          id_variacao: item.id_variacao,
        });

        if (!variacao) {
          return res.status(404).json({
            success: false,
            message: `Variação ${item.id_variacao} não encontrada`,
          });
        }

        if (variacao.quant_variacao < item.quantidade) {
          return res.status(400).json({
            success: false,
            message: `Estoque insuficiente para a variação ${variacao.descricao_variacao}`,
          });
        }

        subtotal += item.preco_unitario * item.quantidade;
        itensComVariacoes.push({ variacao, item });
      }

      // Aplicar desconto e acréscimo
      const desconto = vendaDTO.desconto || 0;
      const acrescimo = vendaDTO.acrescimo || 0;
      const total = subtotal - desconto + acrescimo;

      // Criar venda
      const venda = new Venda(
        vendaDTO.id_funcionario,
        vendaDTO.forma_pagamento as any, // Conversão para o enum
        total,
        desconto,
        acrescimo,
      );

      // Salvar venda no banco de dados
      const vendaSalva = await this.vendaRepositorio.save(venda);

      // Criar itens da venda e atualizar estoque
      for (const { variacao, item } of itensComVariacoes) {
        // Criar item de venda
        const itemVenda = new ItemVenda(
          vendaSalva.id_venda,
          item.id_variacao,
          item.quantidade,
          item.preco_unitario,
        );
        await this.itemVendaRepositorio.save(itemVenda);

        // Atualizar estoque
        variacao.quant_variacao -= item.quantidade;
        await this.variacaoRepositorio.save(variacao);
      }

      // Retornar venda completa com itens
      const vendaCompleta = await this.vendaRepositorio.findOne({
        where: { id_venda: vendaSalva.id_venda },
        relations: ['itens', 'itens.variacao', 'funcionario'],
      });

      return res.status(201).json({
        success: true,
        message: 'Venda registrada com sucesso',
        data: vendaCompleta,
      });
    } catch (error) {
      console.error('Erro ao registrar venda:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao registrar venda',
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const venda = await this.vendaRepositorio.findOne({
        where: { id_venda: id },
        relations: ['itens', 'itens.variacao', 'funcionario'],
      });

      if (!venda) {
        return res.status(404).json({
          success: false,
          message: 'Venda não encontrada',
        });
      }

      return res.status(200).json({
        success: true,
        data: venda,
      });
    } catch (error) {
      console.error('Erro ao buscar venda:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao buscar venda',
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }

  async findAllByFuncionario(req: Request, res: Response) {
    const { id_funcionario } = req.params;
    const { page = '1', limit = '10' } = req.query;

    try {
      const skip = (Number(page) - 1) * Number(limit);

      const [vendas, total] = await this.vendaRepositorio.findAndCount({
        where: { id_funcionario },
        relations: ['itens', 'itens.variacao'],
        order: { data_hora: 'DESC' },
        skip,
        take: Number(limit),
      });

      return res.status(200).json({
        success: true,
        data: vendas,
        page: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        totalItems: total,
      });
    } catch (error) {
      console.error('Erro ao buscar vendas:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao buscar vendas',
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }

  async findAllByLoja(req: Request, res: Response) {
    const { id_loja } = req.params;
    const { page = '1', limit = '10' } = req.query;

    try {
      const skip = (Number(page) - 1) * Number(limit);

      // Primeiro encontre todos os funcionários da loja
      const funcionarios = await this.funcionarioRepositorio.find({
        where: { id_loja },
        select: ['id_funcionario'],
      });

      const funcionarioIds = funcionarios.map((f) => f.id_funcionario);

      if (funcionarioIds.length === 0) {
        return res.status(200).json({
          success: true,
          data: [],
          page: 1,
          totalPages: 0,
          totalItems: 0,
        });
      }

      const [vendas, total] = await this.vendaRepositorio.findAndCount({
        where: { id_funcionario: In(funcionarioIds) },
        relations: ['itens', 'itens.variacao', 'funcionario'],
        order: { data_hora: 'DESC' },
        skip,
        take: Number(limit),
      });

      return res.status(200).json({
        success: true,
        data: vendas,
        page: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        totalItems: total,
      });
    } catch (error) {
      console.error('Erro ao buscar vendas da loja:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao buscar vendas da loja',
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }

  async getRelatorioVendas(req: Request, res: Response) {
    const { id_loja, data_inicio, data_fim } = req.params;

    try {
      // Primeiro encontre todos os funcionários da loja
      const funcionarios = await this.funcionarioRepositorio.find({
        where: { id_loja },
        select: ['id_funcionario'],
      });

      const funcionarioIds = funcionarios.map((f) => f.id_funcionario);

      if (funcionarioIds.length === 0) {
        return res.status(200).json({
          success: true,
          data: {
            totalVendas: 0,
            totalValor: 0,
            vendasPorFormaPagamento: {},
            vendasPorFuncionario: [],
          },
        });
      }

      // Consulta para obter dados agregados
      const query = this.vendaRepositorio
        .createQueryBuilder('venda')
        .select('COUNT(venda.id_venda)', 'totalVendas')
        .addSelect('SUM(venda.total)', 'totalValor')
        .where('venda.id_funcionario IN (:...funcionarioIds)', { funcionarioIds })
        .andWhere('venda.data_hora BETWEEN :data_inicio AND :data_fim', {
          data_inicio: new Date(data_inicio),
          data_fim: new Date(data_fim),
        });

      const dadosGerais = await query.getRawOne();

      // Vendas por forma de pagamento
      const vendasPorFormaPagamento = await this.vendaRepositorio
        .createQueryBuilder('venda')
        .select('venda.forma_pagamento', 'formaPagamento')
        .addSelect('COUNT(venda.id_venda)', 'quantidade')
        .addSelect('SUM(venda.total)', 'total')
        .where('venda.id_funcionario IN (:...funcionarioIds)', { funcionarioIds })
        .andWhere('venda.data_hora BETWEEN :data_inicio AND :data_fim', {
          data_inicio: new Date(data_inicio),
          data_fim: new Date(data_fim),
        })
        .groupBy('venda.forma_pagamento')
        .getRawMany();

      // Vendas por funcionário
      const vendasPorFuncionario = await this.vendaRepositorio
        .createQueryBuilder('venda')
        .innerJoin('venda.funcionario', 'funcionario')
        .select('funcionario.nome', 'nomeFuncionario')
        .addSelect('COUNT(venda.id_venda)', 'quantidadeVendas')
        .addSelect('SUM(venda.total)', 'totalVendas')
        .where('venda.id_funcionario IN (:...funcionarioIds)', { funcionarioIds })
        .andWhere('venda.data_hora BETWEEN :data_inicio AND :data_fim', {
          data_inicio: new Date(data_inicio),
          data_fim: new Date(data_fim),
        })
        .groupBy('funcionario.nome')
        .getRawMany();

      return res.status(200).json({
        success: true,
        data: {
          totalVendas: parseInt(dadosGerais.totalVendas) || 0,
          totalValor: parseFloat(dadosGerais.totalValor) || 0,
          vendasPorFormaPagamento,
          vendasPorFuncionario,
        },
      });
    } catch (error) {
      console.error('Erro ao gerar relatório de vendas:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao gerar relatório de vendas',
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }
}
