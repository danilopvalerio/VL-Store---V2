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

export enum StatusVenda {
  COMPLETADA = 'COMPLETADA',
  CANCELADA = 'CANCELADA',
  PROCESSANDO = 'PROCESSANDO',
  ESTORNADA = 'ESTORNADA',
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
  forma_pagamento!: number;

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
  
  @Column({
    type: 'enum',
    enum: StatusVenda,
    default: StatusVenda.COMPLETADA,
  })
  status!: StatusVenda;
  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  criado_em!: Date;
  
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP'
  })
  atualizado_em!: Date;
  
  constructor(
      id_funcionario: string,
      id_loja: string,
      forma_pagamento: number,
      total: number,
      desconto: number = 0,
      acrescimo: number = 0,
      status: StatusVenda = StatusVenda.COMPLETADA
  ) {
    this.id_funcionario = id_funcionario;
    this.id_loja = id_loja;
    this.forma_pagamento = forma_pagamento;
    this.total = total;
    this.desconto = desconto;
    this.acrescimo = acrescimo;
    this.status = status;
  }
}
