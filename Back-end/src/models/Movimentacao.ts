import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import Caixa from './Caixa';
import Venda from './Venda';

export enum TipoMovimentacao {
  ENTRADA = 'ENTRADA',
  SAIDA = 'SAIDA',
}

@Entity('movimentacao')
export default class Movimentacao {
  @PrimaryGeneratedColumn('uuid')
  id_movimentacao!: string;

  @Column({ type: 'enum', enum: TipoMovimentacao, nullable: false })
  tipo!: TipoMovimentacao;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  valor!: number;

  @Column({ type: 'text', nullable: false })
  descricao!: string;

  @Column({ nullable: false })
  id_caixa!: string;

  @ManyToOne(() => Caixa)
  @JoinColumn({ name: 'id_caixa' })
  caixa!: Caixa;

  @Column({ nullable: true })
  id_venda!: string | null;

  @ManyToOne(() => Venda)
  @JoinColumn({ name: 'id_venda' })
  venda!: Venda | null;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  criado_em!: Date;

  constructor(
    tipo: TipoMovimentacao,
    valor: number,
    descricao: string,
    id_caixa: string,
    id_venda: string | null = null,
  ) {
    this.tipo = tipo;
    this.valor = valor;
    this.descricao = descricao;
    this.id_caixa = id_caixa;
    this.id_venda = id_venda;
  }
}
