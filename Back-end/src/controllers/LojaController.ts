import { Repository } from "typeorm";
import Loja from "../models/Loja";
import { AppDataSource } from "../database/AppDataSource";
import { Request, Response } from "express";

export default class LojaController {
  //Para poder acessar a tabela:
  private lojaRepositorio: Repository<Loja>;
  constructor() {
    this.lojaRepositorio = AppDataSource.getRepository(Loja);
  }

  async createLoja(req: Request, res: Response) {
    const {
      nome,
      senha,
      email,
      cpf_cnpj_proprietario_loja,
      data_nasc_proprietario,
      telefone,
    } = req.body;

    const loja = new Loja(
      nome,
      senha,
      email,
      cpf_cnpj_proprietario_loja,
      data_nasc_proprietario,
      telefone
    );
    // A partir daqui, fazer as validações, validar
    // se todos os campos obrigatórios foram preenchidos
    // e se o e-mail tem formato válido. Verificar se o
    // CPF/CNPJ é válido (quantidade de dígitos, somente dígitos)
    //  e único no sistema. Garantir que a senha atenda critérios
    // mínimos de segurança (como tamanho e complexidade), etc.

    try {
      const savedLoja = await this.lojaRepositorio.save(loja);
      res.status(201).json(savedLoja);
    } catch (error) {
      res.status(400).json({ error: error });
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
}
