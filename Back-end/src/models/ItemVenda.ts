import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import Venda from './Venda';
import { ProdutoVariacao } from './Produto';

@Entity('item_venda')
export default class ItemVenda {
  @PrimaryColumn()
  id_venda!: string;

  @PrimaryColumn()
  id_variacao!: string;

  @Column({ type: 'int', nullable: false })
  quantidade!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  preco_unitario!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  subtotal!: number;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  criado_em!: Date;

  @ManyToOne(() => Venda, (venda) => venda.itens, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_venda' })
  venda!: Venda;

  @ManyToOne(() => ProdutoVariacao)
  @JoinColumn({ name: 'id_variacao' })
  variacao!: ProdutoVariacao;

  constructor(id_venda: string, id_variacao: string, quantidade: number, preco_unitario: number) {
    this.id_venda = id_venda;
    this.id_variacao = id_variacao;
    this.quantidade = quantidade;
    this.preco_unitario = preco_unitario;
    this.subtotal = quantidade * preco_unitario;
  }
}
