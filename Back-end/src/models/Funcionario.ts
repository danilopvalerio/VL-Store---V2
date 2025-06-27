import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';

import { UserRole } from '../types/user.types';
import Loja from './Loja';

@Entity('funcionario')
export default class Funcionario {
  @PrimaryGeneratedColumn('uuid')
  id_funcionario!: string;

  @Column({ nullable: false })
  nome: string;

  @Column({ nullable: false })
  senha: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false, unique: true })
  cpf: string;

  @Column({ nullable: false })
  data_nascimento: Date;

  @Column({ nullable: false, unique: true })
  telefone: string;

  @ManyToOne(() => Loja, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_loja' })
  loja!: Loja;
  id_loja!: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.FUNCIONARIO,
  })
  role: UserRole;

  constructor(
    nome: string,
    senha: string,
    email: string,
    cpf: string,
    data_nascimento: Date,
    telefone: string,
    id_loja: string,
    role: UserRole = UserRole.FUNCIONARIO,
  ) {
    this.nome = nome;
    this.senha = senha;
    this.email = email;
    this.cpf = cpf;
    this.data_nascimento = data_nascimento;
    this.telefone = telefone;
    this.id_loja = id_loja;
    this.role = role;
  }
}
