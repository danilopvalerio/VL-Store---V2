// import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
// import { UserRole } from '../types/user.types';
// import Loja from './Loja';
//
// @Entity('funcionario')
// export default class Funcionario {
// 	@PrimaryGeneratedColumn('uuid')
// 	id_funcionario!: string;
//
// 	@Column({ nullable: false })
// 	nome: string;
//
// 	@Column({ nullable: false })
// 	senha: string;
//
// 	@Column({ nullable: false, unique: true })
// 	email: string;
//
// 	@Column({ nullable: false, unique: true })
// 	cpf: string;
//
// 	@Column({ nullable: false })
// 	data_nascimento: Date;
//
// 	@Column({ nullable: false, unique: true })
// 	telefone: string;
//
// 	@Column({
// 		type: 'enum',
// 		enum: UserRole,
// 		default: UserRole.FUNCIONARIO,
// 	})
// 	role: UserRole;
//
// 	@ManyToOne(() => Loja, (loja) => loja.funcionarios)
// 	loja: Loja;
//
// 	constructor(
// 		nome: string,
// 		senha: string,
// 		email: string,
// 		cpf: string,
// 		data_nascimento: Date,
// 		telefone: string,
// 		loja: Loja,
// 		role: UserRole = UserRole.FUNCIONARIO,
// 	) {
// 		this.nome = nome;
// 		this.senha = senha;
// 		this.email = email;
// 		this.cpf = cpf;
// 		this.data_nascimento = data_nascimento;
// 		this.telefone = telefone;
// 		this.loja = loja;
// 		this.role = role;
// 	}
// }