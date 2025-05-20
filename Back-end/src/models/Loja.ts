import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("loja")
export default class Loja {
  @PrimaryGeneratedColumn("uuid")
  id_loja!: string;

  @Column({ nullable: false })
  nome: string;

  @Column({ nullable: false })
  senha: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false, unique: true })
  cpf_cnpj_proprietario_loja: string;

  @Column({ nullable: false })
  data_nasc_proprietario: Date;

  @Column({ nullable: false, unique: true })
  telefone: string;

  // @Column({ name: "criado_por", nullable: true })
  // criadoPor?: string;
  //
  // @Column({ name: "atualizado_por", nullable: true })
  // atualizadoPor?: string;

  constructor(
    nome: string,
    senha: string,
    email: string,
    cpf_cnpj_proprietario_loja: string,
    data_nasc_proprietario: Date,
    telefone: string
  ) {
    this.nome = nome;
    this.senha = senha;
    this.email = email;
    this.cpf_cnpj_proprietario_loja = cpf_cnpj_proprietario_loja;
    this.data_nasc_proprietario = data_nasc_proprietario;
    this.telefone = telefone;
  }
}
