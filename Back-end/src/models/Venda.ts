import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import Funcionario from './Funcionario';
import ItemVenda from './ItemVenda';

export enum FormaPagamento {
  DINHEIRO = 'dinheiro',
  CARTAO_CREDITO = 'cartao_credito',
  CARTAO_DEBITO = 'cartao_debito',
  PIX = 'pix',
  OUTRO = 'outro',
}

@Entity('venda')
export default class Venda {
  @PrimaryGeneratedColumn('uuid')
  id_venda!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  data_hora!: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  desconto!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  acrescimo!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total!: number;

  @Column({
    type: 'enum',
    enum: FormaPagamento,
    nullable: false,
  })
  forma_pagamento!: FormaPagamento;

  @Column({ nullable: false })
  id_funcionario!: string;

  @ManyToOne(() => Funcionario)
  @JoinColumn({ name: 'id_funcionario' })
  funcionario!: Funcionario;

  @OneToMany(() => ItemVenda, (item) => item.venda, { cascade: true })
  itens!: ItemVenda[];

  constructor(
    id_funcionario: string,
    forma_pagamento: FormaPagamento,
    total: number,
    desconto: number = 0,
    acrescimo: number = 0,
  ) {
    this.id_funcionario = id_funcionario;
    this.forma_pagamento = forma_pagamento;
    this.total = total;
    this.desconto = desconto;
    this.acrescimo = acrescimo;
  }
}
