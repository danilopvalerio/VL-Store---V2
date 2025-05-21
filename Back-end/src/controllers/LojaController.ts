import { Repository } from 'typeorm';
import Loja from '../models/Loja';
import { AppDataSource } from '../database/AppDataSource';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import validator from 'validator';
import { AuthService } from '../services';

export default class LojaController {
  // para poder acessar a tabela:
  private lojaRepositorio: Repository<Loja>;
  private authService: AuthService;

  constructor() {
    this.lojaRepositorio = AppDataSource.getRepository(Loja);
    this.authService = new AuthService();
  }

  // validação de dados da loja
  private validarDadosLoja(dados: any): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!dados.nome || dados.nome.trim().length < 3) {
      errors.push('Nome deve ter pelo menos 3 caracteres');
    }

    if (!validator.isEmail(dados.email)) {
      errors.push('Email inválido');
    }

    if (!dados.senha || dados.senha.length < 8) {
      errors.push('Senha deve ter pelo menos 8 caracteres');
    }

    if (
      !dados.cpf_cnpj_proprietario_loja ||
      (dados.cpf_cnpj_proprietario_loja.length !== 11 &&
        dados.cpf_cnpj_proprietario_loja.length !== 14)
    ) {
      errors.push('CPF/CNPJ inválido');
    }

    return { isValid: errors.length === 0, errors };
  }

  async createLoja(req: Request, res: Response) {
    // Validação dos dados
    const validacao = this.validarDadosLoja(req.body);
    if (!validacao.isValid) {
      return res.status(400).json({ errors: validacao.errors });
    }

    try {
      // Verifica se email já existe
      const emailExiste = await this.lojaRepositorio.findOne({
        where: { email: req.body.email },
      });
      if (emailExiste) {
        return res.status(400).json({ error: 'Email já está em uso' });
      }

      // Verifica se CPF/CNPJ já existe
      const cpfCnpjExiste = await this.lojaRepositorio.findOne({
        where: { cpf_cnpj_proprietario_loja: req.body.cpf_cnpj_proprietario_loja },
      });
      if (cpfCnpjExiste) {
        return res.status(400).json({ error: 'CPF/CNPJ já cadastrado' });
      }

      // Criptografa a senha
      const senhaHash = await bcrypt.hash(req.body.senha, 10);

      // Cria a loja
      const loja = new Loja(
        req.body.nome,
        senhaHash,
        req.body.email,
        req.body.cpf_cnpj_proprietario_loja,
        req.body.data_nasc_proprietario,
        req.body.telefone,
        req.body.role || 'user'
      );

      const savedLoja = await this.lojaRepositorio.save(loja);

      // Remove a senha do retorno
      const { senha: _, ...lojaSemSenha } = savedLoja;

      res.status(201).json(lojaSemSenha);
    } catch (error) {
      console.error('Erro ao criar loja:', error);
      res.status(500).json({ error: 'Erro interno ao criar loja' });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const lojas = await this.lojaRepositorio.find();
      res.status(200).json(lojas);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const loja = await this.lojaRepositorio.findOneBy({ id_loja: id });

      if (!loja) {
        return res.status(404).json({ message: 'Loja não encontrada.' });
      }

      res.status(200).json(loja);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const dadosAtualizados = req.body;

    try {
      const loja = await this.lojaRepositorio.findOneBy({ id_loja: id });

      if (!loja) {
        return res.status(404).json({ message: 'Loja não encontrada.' });
      }

      this.lojaRepositorio.merge(loja, dadosAtualizados);
      const lojaAtualizada = await this.lojaRepositorio.save(loja);

      res.status(200).json(lojaAtualizada);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const loja = await this.lojaRepositorio.findOneBy({ id_loja: id });

      if (!loja) {
        return res.status(404).json({ message: 'Loja não encontrada.' });
      }

      await this.lojaRepositorio.remove(loja);

      res.status(200).json({ mensagem: 'Loja removida com sucesso.', lojaRemovida: loja });
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }

  async login(req: Request, res: Response) {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    try {
      // Busca a loja pelo email
      const loja = await this.lojaRepositorio.findOne({
        where: { email },
      });

      if (!loja) {
        return res.status(401).json({ error: 'Email ou senha inválidos' });
      }

      // Verifica a senha
      const senhaCorreta = await bcrypt.compare(senha, loja.senha);
      if (!senhaCorreta) {
        return res.status(401).json({ error: 'Email ou senha inválidos' });
      }

      // Gera o token JWT
      const token = this.authService.gerarToken(loja);

      // Retorna o token e os dados da loja (sem a senha)
      const { senha: _, ...lojaSemSenha } = loja;

      res.status(200).json({
        loja: lojaSemSenha,
        token,
      });
    } catch (error) {
      console.error('Erro no login:', error);
      res.status(500).json({ error: 'Erro interno no servidor' });
    }
  }
}
