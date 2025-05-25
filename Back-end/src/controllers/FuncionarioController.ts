// import { Repository } from 'typeorm';
// import Funcionario from '../models/Funcionario';
// import { AppDataSource } from '../database/AppDataSource';
// import { Request, Response } from 'express';
// import bcrypt from 'bcrypt';
// import validator from 'validator';
// import { AuthService } from '../services';
// import { UserRole } from '../types/user.types';
// import Loja from '../models/Loja';
//
// interface FuncionarioCriacaoDTO {
// 	nome: string;
// 	email: string;
// 	senha: string;
// 	cpf: string;
// 	data_nascimento: Date;
// 	telefone: string;
// 	lojaId: string;
// 	role?: UserRole;
// }
//
// export default class FuncionarioController {
// 	private readonly funcionarioRepositorio: Repository<Funcionario>;
// 	private readonly lojaRepositorio: Repository<Loja>;
// 	private authService: AuthService;
//
// 	constructor() {
// 		this.funcionarioRepositorio = AppDataSource.getRepository(Funcionario);
// 		this.lojaRepositorio = AppDataSource.getRepository(Loja);
// 		this.authService = new AuthService();
// 	}
//
// 	// Validação similar à da Loja, mas com regras específicas para funcionários
// 	private validarDadosFuncionario(dados: Partial<FuncionarioCriacaoDTO>) {
//
// 	}
//
// 	async createFuncionario(req: Request, res: Response) {
// 		try {
// 			const validacao = this.validarDadosFuncionario(req.body);
// 			if (!validacao.isValid) {
// 				return res.status(400).json({ errors: validacao.errors });
// 			}
//
// 			// Verifica se a loja existe
// 			const loja = await this.lojaRepositorio.findOneBy({ id_loja: req.body.lojaId });
// 			if (!loja) {
// 				return res.status(404).json({ error: 'Loja não encontrada' });
// 			}
//
// 			// Verifica se CPF/email já existem (similar ao da Loja)
// 			// ...
//
// 			const senhaHash = await bcrypt.hash(req.body.senha, 10);
//
// 			const funcionario = new Funcionario(
// 				req.body.nome,
// 				senhaHash,
// 				req.body.email,
// 				req.body.cpf,
// 				req.body.data_nascimento,
// 				req.body.telefone,
// 				loja,
// 				req.body.role || UserRole.FUNCIONARIO,
// 			);
//
// 			const savedFuncionario = await this.funcionarioRepositorio.save(funcionario);
// 			const { senha: _, ...funcionarioSemSenha } = savedFuncionario;
//
// 			res.status(201).json(funcionarioSemSenha);
// 		} catch (error) {
// 			res.status(500).json({ error: 'Erro ao criar funcionário' });
// 		}
// 	}
//
// }