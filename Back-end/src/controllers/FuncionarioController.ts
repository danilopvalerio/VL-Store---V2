import { Repository } from 'typeorm';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import validator from 'validator';

import Funcionario from '../models/Funcionario';
import { AppDataSource } from '../database/AppDataSource';
import { AuthService } from '../utils/jwt';
import { UserRole } from '../types/user.types';

interface FuncionarioDTO {
  nome: string;
  senha: string;
  email: string;
  cpf: string;
  data_nascimento: Date;
  telefone: string;
  id_loja: string;
}

export default class FuncionarioController {
  private readonly funcionarioRepositorio: Repository<Funcionario>;

  constructor() {
    this.funcionarioRepositorio = AppDataSource.getRepository(Funcionario);
  }

  private validarDadosFuncionario(dados: Partial<FuncionarioDTO>): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (!dados.nome || dados.nome.trim().length < 3) {
      errors.push('Nome deve ter pelo menos 3 caracteres');
    }

    if (!dados.email || !validator.isEmail(dados.email)) {
      errors.push('Email inválido');
    }

    if (!dados.senha || dados.senha.length < 8) {
      errors.push('Senha deve ter pelo menos 8 caracteres');
    }

    if (!dados.cpf || dados.cpf.length !== 11) {
      errors.push('CPF inválido');
    }

    if (!dados.telefone || dados.telefone.length < 10) {
      errors.push('Telefone inválido');
    }

    if (!dados.data_nascimento) {
      errors.push('Data de nascimento é obrigatória');
    }

    if (!dados.id_loja) {
      errors.push('ID da loja é obrigatório');
    }

    return { isValid: errors.length === 0, errors };
  }

  async createFuncionario(req: Request, res: Response) {
    const validacao = this.validarDadosFuncionario(req.body);
    if (!validacao.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Dados inválidos',
        validationErrors: validacao.errors,
      });
    }

    try {
      const { email, cpf, telefone } = req.body;

      const existente = await this.funcionarioRepositorio.findOne({
        where: [{ email }, { cpf }, { telefone }],
      });

      if (existente) {
        return res.status(400).json({
          success: false,
          message: 'Email, CPF ou telefone já cadastrados',
        });
      }

      const senhaHash = await bcrypt.hash(req.body.senha, 10);

      const funcionario = new Funcionario(
        req.body.nome,
        senhaHash,
        email,
        cpf,
        req.body.data_nascimento,
        telefone,
        req.body.id_loja,
        req.body.role || UserRole.FUNCIONARIO,
      );

      const saved = await this.funcionarioRepositorio.save(funcionario);
      const { senha, ...semSenha } = saved;

      const token = AuthService.gerarToken({
        id: saved.id_funcionario,
        email: saved.email,
        nome: saved.nome,
        role: saved.role,
        id_loja: saved.id_loja,
      });

      return res.status(201).json({
        success: true,
        message: 'Funcionário criado com sucesso',
        data: {
          funcionario: semSenha,
          token,
        },
      });
    } catch (error) {
      console.error('Erro ao criar funcionário:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao criar funcionário',
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }

  async login(req: Request, res: Response) {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({
        success: false,
        message: 'Email e senha são obrigatórios',
      });
    }

    try {
      const funcionario = await this.funcionarioRepositorio.findOne({
        where: { email },
        select: ['id_funcionario', 'nome', 'email', 'senha', 'role', 'id_loja'],
      });

      if (!funcionario || !(await bcrypt.compare(senha, funcionario.senha))) {
        return res.status(401).json({
          success: false,
          message: 'Email ou senha inválidos',
        });
      }

      const token = AuthService.gerarToken({
        id: funcionario.id_funcionario,
        email: funcionario.email,
        nome: funcionario.nome,
        role: funcionario.role,
        id_loja: funcionario.id_loja,
      });

      const { senha: _, ...funcionarioSemSenha } = funcionario;
      return res.status(200).json({
        success: true,
        message: 'Login realizado com sucesso',
        data: {
          usuario: funcionarioSemSenha,
          token,
          role: funcionario.role,
        },
      });
    } catch (error) {
      console.error('Erro no login:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro no login',
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const id_loja = req.params.id_loja;
      const funcionarios = await this.funcionarioRepositorio.find({ where: { id_loja: id_loja } });
      const listaSemSenha = funcionarios.map(({ senha, ...f }) => f);
      res.status(200).json({
        success: true,
        data: listaSemSenha,
        count: listaSemSenha.length,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Erro ao buscar funcionários' });
    }
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const funcionario = await this.funcionarioRepositorio.findOneBy({ id_funcionario: id });

      if (!funcionario) {
        return res.status(404).json({
          success: false,
          message: 'Funcionário não encontrado',
        });
      }

      const { senha, ...semSenha } = funcionario;
      res.status(200).json({ success: true, data: semSenha });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Erro ao buscar funcionário' });
    }
  }

  async delete(req: Request, res: Response) {
    const { id_loja, id } = req.params;
    try {
      const funcionario = await this.funcionarioRepositorio.findOneBy({ id_funcionario: id });
      if (!funcionario) {
        return res.status(404).json({ success: false, message: 'Funcionário não encontrado' });
      }

      if (funcionario.id_loja !== id_loja) {
        return res
          .status(403)
          .json({ success: false, message: 'Funcionário não pertence à loja especificada' });
      }

      const { senha, ...semSenha } = funcionario;
      await this.funcionarioRepositorio.remove(funcionario);

      res.status(200).json({ success: true, message: 'Funcionário removido', data: semSenha });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Erro ao remover funcionário' });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const dadosAtualizados = req.body;

    try {
      const funcionario = await this.funcionarioRepositorio.findOneBy({ id_funcionario: id });
      if (!funcionario) {
        return res.status(404).json({ success: false, message: 'Funcionário não encontrado' });
      }

      if (dadosAtualizados.senha) {
        return res.status(400).json({
          success: false,
          message: 'Atualização de senha deve ser feita em endpoint específico',
        });
      }

      this.funcionarioRepositorio.merge(funcionario, dadosAtualizados);
      const atualizado = await this.funcionarioRepositorio.save(funcionario);
      const { senha, ...semSenha } = atualizado;

      res.status(200).json({ success: true, message: 'Funcionário atualizado', data: semSenha });
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  }

  // Adicione estes métodos na classe FuncionarioController

  async searchByDescricaoOuNome(req: Request, res: Response) {
    const { id_loja, termo } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = 6; // ou personalize como quiser
    const skip = (page - 1) * limit;

    if (!id_loja || !termo) {
      return res.status(400).json({
        success: false,
        error: 'Parâmetros ausentes',
        message: 'ID da loja e termo de busca são obrigatórios',
      });
    }

    const termoFormatado = `%${termo.toLowerCase()}%`;

    try {
      const [funcionarios, total] = await this.funcionarioRepositorio
        .createQueryBuilder('funcionario')
        .where('funcionario.id_loja = :id_loja', { id_loja })
        .andWhere(
          `(LOWER(funcionario.nome) LIKE :termo OR
                LOWER(funcionario.email) LIKE :termo OR
                LOWER(funcionario.cpf) LIKE :termo OR
                LOWER(funcionario.telefone) LIKE :termo)`,
          { termo: termoFormatado },
        )
        .skip(skip)
        .take(limit)
        .getManyAndCount();

      // Remover senhas dos resultados
      const funcionariosSemSenha = funcionarios.map(({ senha, ...rest }) => rest);

      return res.status(200).json({
        success: true,
        data: funcionariosSemSenha,
        count: total,
        page,
        totalPages: Math.ceil(total / limit),
      });
    } catch (error) {
      console.error('Erro ao buscar funcionários:', error);
      return res.status(500).json({
        success: false,
        error: 'Erro interno',
        message: 'Erro ao buscar funcionários por termo',
      });
    }
  }

  async findAllPaginado(req: Request, res: Response) {
    const { page = '1', limit = '9' } = req.query;
    const id_loja = req.params.id_loja;

    if (!id_loja) {
      return res.status(400).json({
        success: false,
        error: 'Parâmetro id_loja é obrigatório na URL',
      });
    }

    const skip = (Number(page) - 1) * Number(limit);

    try {
      const [funcionarios, total] = await this.funcionarioRepositorio.findAndCount({
        where: { id_loja },
        skip,
        take: Number(limit),
      });

      // Remover senhas dos resultados
      const funcionariosSemSenha = funcionarios.map(({ senha, ...rest }) => rest);

      return res.status(200).json({
        success: true,
        data: funcionariosSemSenha,
        page: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        totalItems: total,
      });
    } catch (error) {
      console.error('Erro ao buscar funcionários paginados:', error);
      return res.status(500).json({
        success: false,
        error: 'Erro ao buscar funcionários',
        message: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }
}
