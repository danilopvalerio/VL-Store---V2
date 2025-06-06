import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import Funcionario from './Funcionario';
import ItemVenda from './ItemVenda';
import Loja from './Loja';

export enum FormaPagamento {
  DINHEIRO = 'DINHEIRO',
  CARTAO_CREDITO = 'CARTAO_CREDITO',
  CARTAO_DEBITO = 'CARTAO_DEBITO',
  PIX = 'PIX',
  OUTRO = 'OUTRO',
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
  
  @Column({ nullable: false })
  id_loja!: string;
  
  @ManyToOne(() => Loja)
  @JoinColumn({ name: 'id_loja' })
  loja!: Loja;

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
