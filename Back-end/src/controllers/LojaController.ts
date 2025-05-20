import { Repository } from "typeorm";
import Loja from "../models/Loja";
import { AppDataSource } from "../database/AppDataSource";
import { Request, Response } from "express";
import { AuthRequest } from '../middlewares/authMiddleware';
import bcrypt from 'bcrypt';
import validator from 'validator';

export default class LojaController {
  // para poder acessar a tabela:
  private lojaRepositorio: Repository<Loja>;

  constructor() {
    this.lojaRepositorio = AppDataSource.getRepository(Loja);
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

    if (!dados.cpf_cnpj_proprietario_loja ||
        (dados.cpf_cnpj_proprietario_loja.length !== 11 &&
            dados.cpf_cnpj_proprietario_loja.length !== 14)) {
      errors.push('CPF/CNPJ inválido');
    }

    if (!dados.telefone || !validator.isMobilePhone(dados.telefone, 'pt-BR')) {
      errors.push('Telefone inválido');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  async createLoja(req: AuthRequest, res: Response) {
    const dadosLoja = req.body;

    // Verifica se o corpo da requisição está vazio
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Corpo da requisição vazio" });
    }

    // Validação dos dados
    const validacao = this.validarDadosLoja(dadosLoja);
    if (!validacao.isValid) {
      return res.status(400).json({ errors: validacao.errors });
    }

    try {
      // Verifica se email já existe
      const emailExiste = await this.lojaRepositorio.findOne({
        where: { email: dadosLoja.email }
      });
      if (emailExiste) {
        return res.status(400).json({ error: 'Email já está em uso' });
      }

      // Criptografa a senha
      const senhaHash = await bcrypt.hash(dadosLoja.senha, 10);

      // Verifica se CPF/CNPJ já existe
      const cpfCnpjExiste = await this.lojaRepositorio.findOne({
        where: { cpf_cnpj_proprietario_loja: dadosLoja.cpf_cnpj_proprietario_loja }
      });
      if (cpfCnpjExiste) {
        return res.status(400).json({ error: 'CPF/CNPJ já cadastrado' });
      }

      // Cria a loja
      const loja = new Loja(
          dadosLoja.nome,
          senhaHash,
          dadosLoja.email,
          dadosLoja.cpf_cnpj_proprietario_loja,
          dadosLoja.data_nasc_proprietario,
          dadosLoja.telefone
      );

      // Registra quem criou (se autenticado)
      // if (req.usuario) {
      //   loja.criadoPor = req.usuario.id;
      // }

      const savedLoja = await this.lojaRepositorio.save(loja);
      res.status(201).json(savedLoja);

      // Remove a senha do retorno
      const { senha: _, ...lojaSemSenha } = savedLoja;

      res.status(201).json(lojaSemSenha);
    } catch (error) {
      console.error('Erro ao criar loja:', error);
      res.status(500).json({ error: 'Erro interno ao criar loja' });
    }

    // const {
    //   nome,
    //   senha,
    //   email,
    //   cpf_cnpj_proprietario_loja,
    //   data_nasc_proprietario,
    //   telefone,
    // } = req.body;
    //
    // const loja = new Loja(
    //   nome,
    //   senha,
    //   email,
    //   cpf_cnpj_proprietario_loja,
    //   data_nasc_proprietario,
    //   telefone
    // );
    // // A partir daqui, fazer as validações, validar
    // // se todos os campos obrigatórios foram preenchidos
    // // e se o e-mail tem formato válido. Verificar se o
    // // CPF/CNPJ é válido (quantidade de dígitos, somente dígitos)
    // //  e único no sistema. Garantir que a senha atenda critérios
    // // mínimos de segurança (como tamanho e complexidade), etc.
    //
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
        return res.status(404).json({ message: "Loja não encontrada." });
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
        return res.status(404).json({ message: "Loja não encontrada." });
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
        return res.status(404).json({ message: "Loja não encontrada." });
      }

      await this.lojaRepositorio.remove(loja);

      res
        .status(200)
        .json({ mensagem: "Loja removida com sucesso.", lojaRemovida: loja });
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }
}
