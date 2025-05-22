import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Loja from './Loja';

@Entity('produto')
export class Produto {
  @PrimaryColumn()
  referencia!: string;

  @PrimaryColumn()
  id_loja!: string;

  @Column({ nullable: false })
  nome!: string;

  @Column({ nullable: false })
  categoria!: string;

  @Column({ nullable: true })
  material?: string;

  @Column({ nullable: true })
  genero?: string;

  @ManyToOne(() => Loja)
  @JoinColumn({ name: 'id_loja' })
  loja!: Loja;

  @OneToMany(() => ProdutoVariacao, (variacao) => variacao.produto, {
    cascade: true,
  })
  variacoes!: ProdutoVariacao[];
}

@Entity('produto_variacao')
export class ProdutoVariacao {
  @PrimaryGeneratedColumn('uuid')
  id_variacao!: string;

  @Column()
  referencia_produto!: string;

  @Column()
  id_loja!: string;

  @ManyToOne(() => Produto, (produto) => produto.variacoes, { onDelete: 'CASCADE' })
  @JoinColumn([
    { name: 'referencia_produto', referencedColumnName: 'referencia' },
    { name: 'id_loja', referencedColumnName: 'id_loja' },
  ])
  produto!: Produto;

  @Column({ nullable: false })
  descricao_variacao!: string;

  @Column({ nullable: false })
  quant_variacao!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  valor!: number;
}
