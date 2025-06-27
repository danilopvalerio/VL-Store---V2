import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import Funcionario from './Funcionario';
import Loja from './Loja';
import Movimentacao from './Movimentacao';

export enum StatusCaixa {
  ABERTO = 'ABERTO',
  FECHADO = 'FECHADO',
}

@Entity('caixa')
export default class Caixa {
  @PrimaryGeneratedColumn('uuid')
  id_caixa!: string;

  @Column({ type: 'date', nullable: false })
  data_abertura!: Date;

  @Column({ type: 'time', nullable: false })
  hora_abertura!: string;

  @Column({ type: 'time', nullable: true })
  hora_fechamento!: string | null;

  @Column({
    type: 'enum',
    enum: StatusCaixa,
    default: StatusCaixa.ABERTO,
  })
  status!: StatusCaixa;

  @Column({ nullable: false })
  id_funcionario_responsavel!: string;

  @ManyToOne(() => Funcionario)
  @JoinColumn({ name: 'id_funcionario_responsavel' })
  funcionario_responsavel!: Funcionario;

  @Column({ nullable: false })
  id_loja!: string;

  @ManyToOne(() => Loja, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_loja' })
  loja!: Loja;

  @OneToMany(() => Movimentacao, (movimentacao) => movimentacao.caixa)
  movimentacoes!: Movimentacao[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  criado_em!: Date;

  constructor(
    data_abertura: Date,
    hora_abertura: string,
    id_funcionario_responsavel: string,
    id_loja: string,
    status: StatusCaixa = StatusCaixa.ABERTO,
  ) {
    this.data_abertura = data_abertura;
    this.hora_abertura = hora_abertura;
    this.id_funcionario_responsavel = id_funcionario_responsavel;
    this.id_loja = id_loja;
    this.status = status;
  }
}
