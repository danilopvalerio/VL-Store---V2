import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { AppDataSource } from '../database/AppDataSource';
import Caixa from '../models/Caixa';
import Movimentacao from '../models/Movimentacao';
import Funcionario from '../models/Funcionario';
import Venda from '../models/Venda';
import { StatusCaixa } from '../models/Caixa';
import { TipoMovimentacao } from '../models/Movimentacao';

interface CaixaDTO {
  id_funcionario_responsavel: string;
  id_loja: string;
}

interface FecharCaixaDTO {
  hora_fechamento?: string; // Optional since we can generate it automatically
}

interface MovimentacaoDTO {
  tipo: TipoMovimentacao;
  valor: number;
  descricao: string;
  id_venda?: string | null;
}

export default class CaixaController {
  private readonly caixaRepositorio: Repository<Caixa>;
  private readonly movimentacaoRepositorio: Repository<Movimentacao>;
  private readonly funcionarioRepositorio: Repository<Funcionario>;
  private readonly vendaRepositorio: Repository<Venda>;

  constructor() {
    this.caixaRepositorio = AppDataSource.getRepository(Caixa);
    this.movimentacaoRepositorio = AppDataSource.getRepository(Movimentacao);
    this.funcionarioRepositorio = AppDataSource.getRepository(Funcionario);
    this.vendaRepositorio = AppDataSource.getRepository(Venda);
  }

  private validarDadosCaixa(dados: Partial<CaixaDTO>): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!dados.id_funcionario_responsavel) {
      errors.push('ID do funcionário responsável é obrigatório');
    }

    if (!dados.id_loja) {
      errors.push('ID da loja é obrigatório');
    }

    return { isValid: errors.length === 0, errors };
  }

  private validarDadosMovimentacao(dados: Partial<MovimentacaoDTO>): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (!dados.tipo) {
      errors.push('Tipo de movimentação é obrigatório');
    }

    if (!dados.valor || dados.valor <= 0) {
      errors.push('Valor deve ser um número positivo');
    }

    if (!dados.descricao) {
      errors.push('Descrição é obrigatória');
    }

    return { isValid: errors.length === 0, errors };
  }

  async abrirCaixaNovo(req: Request, res: Response) {
    const caixaDTO: CaixaDTO = req.body;
    const validacao = this.validarDadosCaixa(caixaDTO);

    if (!validacao.isValid) {
      return res.status(400).json({
        success: false,
        error: 'Dados inválidos',
        message: 'Verifique os campos informados',
        validationErrors: validacao.errors,
      });
    }

    try {
      // Verifica se o funcionário existe
      const funcionario = await this.funcionarioRepositorio.findOneBy({
        id_funcionario: caixaDTO.id_funcionario_responsavel,
      });

      if (!funcionario) {
        return res.status(404).json({
          success: false,
          error: 'Funcionário não encontrado',
          message: 'Funcionário responsável não encontrado',
        });
      }

      const dataAtual = new Date();
      const horaAtual = dataAtual.toTimeString().split(' ')[0]; // Formato HH:MM:SS

      const novoCaixa = new Caixa(
        dataAtual,
        horaAtual,
        caixaDTO.id_funcionario_responsavel,
        caixaDTO.id_loja,
        StatusCaixa.ABERTO,
      );

      const caixaSalvo = await this.caixaRepositorio.save(novoCaixa);

      return res.status(201).json({
        success: true,
        message: 'Caixa aberto com sucesso',
        data: caixaSalvo,
      });
    } catch (error) {
      console.error('Erro ao abrir caixa:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao abrir caixa',
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }

  async fecharCaixa(req: Request, res: Response) {
    const { id } = req.params;
    const fecharCaixaDTO: FecharCaixaDTO = req.body || {}; // Provide default empty object

    try {
      const caixa = await this.caixaRepositorio.findOneBy({ id_caixa: id });

      if (!caixa) {
        return res.status(404).json({
          success: false,
          error: 'Caixa não encontrado',
          message: 'Caixa não encontrado',
        });
      }

      if (caixa.status === StatusCaixa.FECHADO) {
        return res.status(400).json({
          success: false,
          error: 'Caixa já fechado',
          message: 'Este caixa já está fechado',
        });
      }

      // Generate current time if not provided in request
      const horaFechamento =
        fecharCaixaDTO.hora_fechamento || new Date().toTimeString().split(' ')[0]; // Format: HH:MM:SS

      // Atualiza o caixa
      caixa.status = StatusCaixa.FECHADO;
      caixa.hora_fechamento = horaFechamento;

      const caixaAtualizado = await this.caixaRepositorio.save(caixa);

      return res.status(200).json({
        success: true,
        message: 'Caixa fechado com sucesso',
        data: caixaAtualizado,
      });
    } catch (error) {
      console.error('Erro ao fechar caixa:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao fechar caixa',
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const caixa = await this.caixaRepositorio.findOne({
        where: { id_caixa: id },
        relations: ['funcionario_responsavel', 'movimentacoes', 'movimentacoes.venda'],
      });

      if (!caixa) {
        return res.status(404).json({
          success: false,
          error: 'Caixa não encontrado',
          message: 'Caixa não encontrado',
        });
      }

      return res.status(200).json({
        success: true,
        data: caixa,
      });
    } catch (error) {
      console.error('Erro ao buscar caixa:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao buscar caixa',
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }

  async findCaixaAbertoByLoja(req: Request, res: Response) {
    const { id_loja } = req.params;

    try {
      const caixa = await this.caixaRepositorio.findOne({
        where: { id_loja, status: StatusCaixa.ABERTO },
        relations: ['funcionario_responsavel', 'movimentacoes'],
      });

      if (!caixa) {
        return res.status(404).json({
          success: false,
          error: 'Caixa aberto não encontrado',
          message: 'Nenhum caixa aberto encontrado para esta loja',
        });
      }

      return res.status(200).json({
        success: true,
        data: caixa,
      });
    } catch (error) {
      console.error('Erro ao buscar caixa aberto:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao buscar caixa aberto',
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }

  async findAllByLoja(req: Request, res: Response) {
    const { id_loja } = req.params;
    const { page = '1', limit = '10' } = req.query;

    try {
      const skip = (Number(page) - 1) * Number(limit);

      const [caixas, total] = await this.caixaRepositorio.findAndCount({
        where: { id_loja },
        relations: ['funcionario_responsavel'],
        order: { data_abertura: 'DESC', hora_abertura: 'DESC' },
        skip,
        take: Number(limit),
      });

      return res.status(200).json({
        success: true,
        data: caixas,
        page: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        totalItems: total,
      });
    } catch (error) {
      console.error('Erro ao buscar caixas:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao buscar caixas',
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }

  async findAllPaginado(req: Request, res: Response) {
    const { page = '1', limit = '10' } = req.query;
    const { id_loja } = req.params;

    if (!id_loja) {
      return res.status(400).json({
        success: false,
        error: 'Parâmetro id_loja é obrigatório na URL',
      });
    }

    const skip = (Number(page) - 1) * Number(limit);

    try {
      const [caixas, total] = await this.caixaRepositorio.findAndCount({
        where: { id_loja },
        relations: ['funcionario_responsavel'],
        order: {
          status: 'ASC', // ABERTO vem antes de FECHADO (ordem alfabética)
          data_abertura: 'DESC',
          hora_abertura: 'DESC',
        },
        skip,
        take: Number(limit),
      });

      return res.status(200).json({
        success: true,
        data: caixas,
        page: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        totalItems: total,
      });
    } catch (error) {
      console.error('Erro ao buscar caixas paginados:', error);
      return res.status(500).json({
        success: false,
        error: 'Erro ao buscar caixas',
        message: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }

  async createMovimentacao(req: Request, res: Response) {
    const { id_caixa } = req.params;
    const movimentacaoDTO: MovimentacaoDTO = req.body;
    const validacao = this.validarDadosMovimentacao(movimentacaoDTO);

    if (!validacao.isValid) {
      return res.status(400).json({
        success: false,
        error: 'Dados inválidos',
        message: 'Verifique os campos informados',
        validationErrors: validacao.errors,
      });
    }

    try {
      // Verifica se o caixa existe e está aberto
      const caixa = await this.caixaRepositorio.findOneBy({ id_caixa });

      if (!caixa) {
        return res.status(404).json({
          success: false,
          error: 'Caixa não encontrado',
          message: 'Caixa não encontrado',
        });
      }

      if (caixa.status !== StatusCaixa.ABERTO) {
        return res.status(400).json({
          success: false,
          error: 'Caixa fechado',
          message: 'Não é possível adicionar movimentações a um caixa fechado',
        });
      }

      // Se houver venda associada, verifica se existe
      if (movimentacaoDTO.id_venda) {
        const venda = await this.vendaRepositorio.findOneBy({ id_venda: movimentacaoDTO.id_venda });
        if (!venda) {
          return res.status(404).json({
            success: false,
            error: 'Venda não encontrada',
            message: 'Venda associada não encontrada',
          });
        }
      }

      const novaMovimentacao = new Movimentacao(
        movimentacaoDTO.tipo,
        movimentacaoDTO.valor,
        movimentacaoDTO.descricao,
        id_caixa,
        movimentacaoDTO.id_venda || null,
      );

      const movimentacaoSalva = await this.movimentacaoRepositorio.save(novaMovimentacao);

      return res.status(201).json({
        success: true,
        message: 'Movimentação registrada com sucesso',
        data: movimentacaoSalva,
      });
    } catch (error) {
      console.error('Erro ao registrar movimentação:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao registrar movimentação',
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }

  async findAllMovimentacoesByCaixa(req: Request, res: Response) {
    const { id_caixa } = req.params;
    try {
      const caixa = await this.caixaRepositorio.findOneBy({ id_caixa });
      if (!caixa) {
        return res.status(404).json({
          success: false,
          error: 'Caixa não encontrado',
          message: 'Caixa não encontrado',
        });
      }

      const movimentacoes = await this.movimentacaoRepositorio.find({
        where: { id_caixa },
        relations: ['venda'],
        order: { criado_em: 'DESC' },
      });

      // Garantindo que os valores sejam somados como números
      const totalEntradas = movimentacoes
        .filter((m) => m.tipo === TipoMovimentacao.ENTRADA)
        .reduce((sum, m) => sum + Number(m.valor), 0);

      const totalSaidas = movimentacoes
        .filter((m) => m.tipo === TipoMovimentacao.SAIDA)
        .reduce((sum, m) => sum + Number(m.valor), 0);

      const saldo = totalEntradas - totalSaidas;

      return res.status(200).json({
        success: true,
        data: {
          totalEntradas,
          totalSaidas,
          saldo,
        },
        totalItems: movimentacoes.length,
      });
    } catch (error) {
      console.error('Erro ao buscar todas as movimentações:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao buscar movimentações',
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }

  async findMovimentacoesByCaixa(req: Request, res: Response) {
    const { id_caixa } = req.params;
    const { page = '1', limit = '10' } = req.query;

    try {
      const skip = (Number(page) - 1) * Number(limit);

      // Verifica se o caixa existe
      const caixa = await this.caixaRepositorio.findOneBy({ id_caixa });
      if (!caixa) {
        return res.status(404).json({
          success: false,
          error: 'Caixa não encontrado',
          message: 'Caixa não encontrado',
        });
      }

      const [movimentacoes, total] = await this.movimentacaoRepositorio.findAndCount({
        where: { id_caixa },
        order: { criado_em: 'DESC' },
        skip,
        take: Number(limit),
      });

      return res.status(200).json({
        success: true,
        data: movimentacoes,
        page: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        totalItems: total,
      });
    } catch (error) {
      console.error('Erro ao buscar movimentações:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao buscar movimentações',
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }

  async getResumoCaixa(req: Request, res: Response) {
    const { id_caixa } = req.params;

    try {
      // Verifica se o caixa existe
      const caixa = await this.caixaRepositorio.findOneBy({ id_caixa });
      if (!caixa) {
        return res.status(404).json({
          success: false,
          error: 'Caixa não encontrado',
          message: 'Caixa não encontrado',
        });
      }

      // Busca todas as movimentações do caixa
      const movimentacoes = await this.movimentacaoRepositorio.find({
        where: { id_caixa },
      });

      // Calcula totais
      const totalEntradas = movimentacoes
        .filter((m) => m.tipo === TipoMovimentacao.ENTRADA)
        .reduce((sum, m) => sum + m.valor, 0);

      const totalSaidas = movimentacoes
        .filter((m) => m.tipo === TipoMovimentacao.SAIDA)
        .reduce((sum, m) => sum + m.valor, 0);

      const saldo = totalEntradas - totalSaidas;

      // Contagem por tipo de movimentação
      const entradasPorTipo = movimentacoes
        .filter((m) => m.tipo === TipoMovimentacao.ENTRADA)
        .reduce(
          (acc, m) => {
            const key = m.descricao;
            acc[key] = (acc[key] || 0) + m.valor;
            return acc;
          },
          {} as Record<string, number>,
        );

      const saidasPorTipo = movimentacoes
        .filter((m) => m.tipo === TipoMovimentacao.SAIDA)
        .reduce(
          (acc, m) => {
            const key = m.descricao;
            acc[key] = (acc[key] || 0) + m.valor;
            return acc;
          },
          {} as Record<string, number>,
        );

      return res.status(200).json({
        success: true,
        data: {
          caixa,
          totalEntradas,
          totalSaidas,
          saldo,
          entradasPorTipo,
          saidasPorTipo,
          totalMovimentacoes: movimentacoes.length,
        },
      });
    } catch (error) {
      console.error('Erro ao gerar resumo do caixa:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao gerar resumo do caixa',
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }

  async deleteMovimentacao(req: Request, res: Response) {
    const { id_movimentacao } = req.params;

    try {
      const movimentacao = await this.movimentacaoRepositorio.findOne({
        where: { id_movimentacao },
        relations: ['caixa'],
      });

      if (!movimentacao) {
        return res.status(404).json({
          success: false,
          error: 'Movimentação não encontrada',
          message: 'Movimentação não encontrada',
        });
      }

      // Verifica se o caixa está aberto
      if (movimentacao.caixa.status !== StatusCaixa.ABERTO) {
        return res.status(400).json({
          success: false,
          error: 'Caixa fechado',
          message: 'Não é possível remover movimentações de um caixa fechado',
        });
      }

      await this.movimentacaoRepositorio.remove(movimentacao);

      return res.status(200).json({
        success: true,
        message: 'Movimentação removida com sucesso',
      });
    } catch (error) {
      console.error('Erro ao remover movimentação:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao remover movimentação',
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }
}
