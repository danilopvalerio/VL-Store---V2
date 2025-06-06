import { Request, Response } from 'express';
import { In, Repository } from 'typeorm';
import { AppDataSource } from '../database/AppDataSource';
import Venda from '../models/Venda';
import ItemVenda from '../models/ItemVenda';
import { ProdutoVariacao } from '../models/Produto';
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
  private readonly variacaoRepositorio: Repository<ProdutoVariacao>;
  private readonly itemVendaRepositorio: Repository<ItemVenda>;
  private readonly funcionarioRepositorio: Repository<Funcionario>;

  constructor() {
    this.vendaRepositorio = AppDataSource.getRepository(Venda);
    this.variacaoRepositorio = AppDataSource.getRepository(ProdutoVariacao);
    this.itemVendaRepositorio = AppDataSource.getRepository(ItemVenda);
    this.funcionarioRepositorio = AppDataSource.getRepository(Funcionario);
  }

  private validarDadosVenda(dados: Partial<VendaDTO>): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!dados.id_funcionario) {
      errors.push('ID do funcionário é obrigatório');
    }

    if (!dados.forma_pagamento) {
      errors.push('Forma de pagamento é obrigatória');
    }

    if (!dados.itens || dados.itens.length === 0) {
      errors.push('Pelo menos um item é necessário');
    }

    return { isValid: errors.length === 0, errors };
  }

  async createVenda(req: Request, res: Response) {
    const vendaDTO: VendaDTO = req.body;
    const validacao = this.validarDadosVenda(vendaDTO);
    if (!validacao.isValid) {
      return res.status(400).json({
        success: false,
        error: 'Dados inválidos',
        message: 'Verifique os campos informados',
        validationErrors: validacao.errors,
      });
    }

    try {
      const funcionario = await this.funcionarioRepositorio.findOneBy({
        id_funcionario: vendaDTO.id_funcionario,
      });

      if (!funcionario) {
        return res.status(404).json({
          success: false,
          error: 'Funcionário não encontrado',
          message: 'Funcionário não encontrado',
        });
      }

      let subtotal = 0;
      const itensComVariacoes: { variacao: ProdutoVariacao; item: ItemVendaDTO }[] = [];

      for (const item of vendaDTO.itens) {
        const variacao = await this.variacaoRepositorio.findOneBy({
          id_variacao: item.id_variacao,
        });

        if (!variacao) {
          return res.status(404).json({
            success: false,
            error: 'Variação não encontrada',
            message: `Variação ${item.id_variacao} não encontrada`,
          });
        }

        if (variacao.quant_variacao < item.quantidade) {
          return res.status(400).json({
            success: false,
            error: 'Estoque insuficiente',
            message: `Estoque insuficiente para a variação ${variacao.descricao_variacao}`,
          });
        }

        subtotal += item.preco_unitario * item.quantidade;
        itensComVariacoes.push({ variacao, item });
      }

      const desconto = vendaDTO.desconto || 0;
      const acrescimo = vendaDTO.acrescimo || 0;
      const total = subtotal - desconto + acrescimo;

      const resultado = await AppDataSource.transaction(async (transactionalEntityManager) => {
        const venda = new Venda(
          vendaDTO.id_funcionario,
          funcionario.id_loja,
          vendaDTO.forma_pagamento,
          total,
          desconto,
          acrescimo,
        );

        const vendaSalva = await this.vendaRepositorio.save(venda);

        for (const { variacao, item } of itensComVariacoes) {
          const itemVenda = new ItemVenda(
            vendaSalva.id_venda,
            item.id_variacao,
            item.quantidade,
            item.preco_unitario,
          );
          await transactionalEntityManager.save(itemVenda);
          variacao.quant_variacao -= item.quantidade;
          await transactionalEntityManager.save(variacao);
        }

        return vendaSalva;
      });

      const vendaCompleta = await this.vendaRepositorio.findOne({
        where: { id_venda: resultado.id_venda },
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

      // MADU: padronizando resposta de erro
      if (!venda) {
        return res.status(404).json({
          success: false,
          error: 'Venda não encontrada',
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
  private mapFormaPagamento(frontendValue: string): string {
    const mapping: Record<string, string> = {
      Dinheiro: 'DINHEIRO',
      Cartao_Credito: 'CARTAO_CREDITO',
      Cartao_Debito: 'CARTAO_DEBITO',
      PIX: 'PIX',
    };
    return mapping[frontendValue] || frontendValue;
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

  async findAllPaginado(req: Request, res: Response) {
    const { id_loja } = req.params;
    const {
      page = '1',
      limit = '10',
      funcionario_id, // Filtro opcional por funcionário
      forma_pagamento, // Filtro opcional
      data_inicio, // Filtro opcional
      data_fim, // Filtro opcional
    } = req.query;

    try {
      const skip = (Number(page) - 1) * Number(limit);

      // Criar query builder base
      const query = this.vendaRepositorio
        .createQueryBuilder('venda')
        .leftJoinAndSelect('venda.itens', 'itens')
        .leftJoinAndSelect('itens.variacao', 'variacao')
        .leftJoinAndSelect('venda.funcionario', 'funcionario')
        .orderBy('venda.data_hora', 'DESC');

      // Filtro por loja (obrigatório)
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

      query.where('venda.id_funcionario IN (:...funcionarioIds)', { funcionarioIds });

      // Filtros adicionais
      if (funcionario_id) {
        query.andWhere('venda.id_funcionario = :funcionario_id', { funcionario_id });
      }

      if (forma_pagamento) {
        query.andWhere('venda.forma_pagamento = :forma_pagamento', { forma_pagamento });
      }

      if (data_inicio && data_fim) {
        query.andWhere('venda.data_hora BETWEEN :data_inicio AND :data_fim', {
          data_inicio: new Date(data_inicio as string),
          data_fim: new Date(data_fim as string),
        });
      }

      // Executar query paginada
      const [vendas, total] = await query.skip(skip).take(Number(limit)).getManyAndCount();

      return res.status(200).json({
        success: true,
        data: vendas,
        page: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        totalItems: total,
      });
    } catch (error) {
      console.error('Erro ao buscar vendas paginadas:', error);
      return res.status(500).json({
        success: false,
        error: 'Erro ao buscar vendas',
        message: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }

  async findItensByVenda(req: Request, res: Response) {
    const { id_venda } = req.params;

    try {
      const itens = await this.itemVendaRepositorio.find({
        where: { venda: { id_venda } },
        relations: ['variacao', 'variacao.produto'],
      });

      return res.status(200).json({
        success: true,
        data: itens,
      });
    } catch (error) {
      console.error('Erro ao buscar itens da venda:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao buscar itens da venda',
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }

  // remove uma venda e reverte o estoque dos produtos
  async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const venda = await this.vendaRepositorio.findOne({
        where: { id_venda: id },
        relations: ['itens', 'itens.variacao'],
      });

      if (!venda) {
        return res.status(404).json({
          success: false,
          message: 'Venda não encontrada',
        });
      }

      await AppDataSource.transaction(async (transactionalEntityManager) => {
        // Reverte o estoque para cada item
        for (const item of venda.itens) {
          await transactionalEntityManager.increment(
            ProdutoVariacao,
            { id_variacao: item.id_variacao },
            'quant_variacao',
            item.quantidade,
          );
        }

        // Remove os itens da venda
        await transactionalEntityManager.remove(ItemVenda, venda.itens);

        // Remove a venda
        await transactionalEntityManager.remove(Venda, venda);
      });

      return res.status(200).json({
        success: true,
        message: 'Venda removida e estoque reestocado com sucesso',
      });
    } catch (error) {
      console.error('Erro ao remover venda:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao remover venda',
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }

  // atuzalizar venda pro caso do cancelamento
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { status } = req.body;

    try {
      const venda = await this.vendaRepositorio.findOneBy({ id_venda: id });

      if (!venda) {
        return res.status(404).json({
          success: false,
          message: 'Venda não encontrada',
        });
      }

      // Atualiza apenas o status (pode ser expandido para outros campos)
      venda.status = status || venda.status;

      const vendaAtualizada = await this.vendaRepositorio.save(venda);

      return res.status(200).json({
        success: true,
        message: 'Venda atualizada com sucesso',
        data: vendaAtualizada,
      });
    } catch (error) {
      console.error('Erro ao atualizar venda:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao atualizar venda',
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }

  async decrementarEstoque(req: Request, res: Response) {
    const { id_variacao } = req.params;
    const { quantidade } = req.body;

    // Validação básica
    if (!quantidade || quantidade <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Quantidade deve ser um número positivo',
      });
    }

    try {
      // 1. Encontra a variação
      const variacao = await this.variacaoRepositorio.findOne({
        where: { id_variacao },
        select: ['id_variacao', 'quant_variacao'],
      });

      if (!variacao) {
        return res.status(404).json({
          success: false,
          message: 'Variação não encontrada',
        });
      }

      // 2. Verifica estoque suficiente
      if (variacao.quant_variacao < quantidade) {
        return res.status(400).json({
          success: false,
          message: `Estoque insuficiente. Disponível: ${variacao.quant_variacao}`,
          estoque_atual: variacao.quant_variacao,
        });
      }

      // 3. Decrementa o estoque
      await this.variacaoRepositorio.decrement({ id_variacao }, 'quant_variacao', quantidade);

      // 4. Retorna a variação atualizada
      const variacaoAtualizada = await this.variacaoRepositorio.findOneBy({ id_variacao });

      return res.status(200).json({
        success: true,
        message: 'Estoque decrementado com sucesso',
        data: {
          ...variacaoAtualizada,
          decremento: quantidade,
        },
      });
    } catch (error) {
      console.error('Erro ao decrementar estoque:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao atualizar estoque',
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }
}
