import { Repository } from 'typeorm';
import { Produto, ProdutoVariacao } from '../models/Produto';
import { AppDataSource } from '../database/AppDataSource';
import { Request, Response } from 'express';

export default class ProdutoController {
  private readonly produtoRepositorio: Repository<Produto>;
  private readonly variacaoRepositorio: Repository<ProdutoVariacao>;

  constructor() {
    this.produtoRepositorio = AppDataSource.getRepository(Produto);
    this.variacaoRepositorio = AppDataSource.getRepository(ProdutoVariacao);
  }

  async createProduto(req: Request, res: Response) {
    try {
      const produto = this.produtoRepositorio.create(req.body);
      const produtoSalvo = await this.produtoRepositorio.save(produto);

      res.status(201).json({
        success: true,
        message: 'Produto criado com sucesso',
        data: produtoSalvo,
      });
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      res.status(500).json({
        success: false,
        error: 'Erro ao criar produto',
        message: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const id_loja = req.params.id_loja;
      if (!id_loja) {
        return res.status(400).json({
          success: false,
          error: 'Parâmetro id_loja é obrigatório na URL',
        });
      }

      const produtos = await this.produtoRepositorio.find({
        where: { loja: { id_loja: id_loja } },
        relations: ['variacoes'],
      });

      res.status(200).json({
        success: true,
        data: produtos,
        count: produtos.length,
      });
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      res.status(500).json({
        success: false,
        error: 'Erro ao buscar produtos',
        message: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }

  async findByReferencia(req: Request, res: Response) {
    const { referencia, id_loja } = req.params;

    try {
      if (!referencia || !id_loja) {
        return res.status(400).json({
          success: false,
          error: 'Parâmetros ausentes',
          message: 'Referência e ID da loja são obrigatórios',
        });
      }

      const produto = await this.produtoRepositorio.findOne({
        where: { referencia, id_loja },
        relations: ['variacoes'],
      });

      if (!produto) {
        return res.status(404).json({
          success: false,
          error: 'Produto não encontrado',
          message: 'Produto com referência e loja informadas não foi encontrado',
        });
      }

      res.status(200).json({
        success: true,
        data: produto,
      });
    } catch (error) {
      console.error(`Erro ao buscar produto ${referencia}/${id_loja}:`, error);
      res.status(500).json({
        success: false,
        error: 'Erro ao buscar produto',
        message: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }

  async delete(req: Request, res: Response) {
    const { referencia, id_loja } = req.params;

    try {
      if (!referencia || !id_loja) {
        return res.status(400).json({
          success: false,
          error: 'Parâmetros ausentes',
          message: 'Referência e ID da loja são obrigatórios',
        });
      }

      const produto = await this.produtoRepositorio.findOneBy({ referencia, id_loja });

      if (!produto) {
        return res.status(404).json({
          success: false,
          error: 'Produto não encontrado',
          message: 'Produto com referência e loja informadas não foi encontrado',
        });
      }

      await this.produtoRepositorio.remove(produto);

      res.status(200).json({
        success: true,
        message: 'Produto removido com sucesso',
        data: produto,
      });
    } catch (error) {
      console.error(`Erro ao remover produto ${referencia}/${id_loja}:`, error);
      res.status(500).json({
        success: false,
        error: 'Erro ao remover produto',
        message: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }

  async update(req: Request, res: Response) {
    const { referencia, id_loja } = req.params;
    const dadosAtualizados = req.body;

    try {
      if (!referencia || !id_loja) {
        return res.status(400).json({
          success: false,
          error: 'Parâmetros ausentes',
          message: 'Referência e ID da loja são obrigatórios',
        });
      }

      const produto = await this.produtoRepositorio.findOneBy({ referencia, id_loja });

      if (!produto) {
        return res.status(404).json({
          success: false,
          error: 'Produto não encontrado',
          message: 'Produto com referência e loja informadas não foi encontrado',
        });
      }

      this.produtoRepositorio.merge(produto, dadosAtualizados);
      const produtoAtualizado = await this.produtoRepositorio.save(produto);

      res.status(200).json({
        success: true,
        message: 'Produto atualizado com sucesso',
        data: produtoAtualizado,
      });
    } catch (error) {
      console.error(`Erro ao atualizar produto ${referencia}/${id_loja}:`, error);
      res.status(500).json({
        success: false,
        error: 'Erro ao atualizar produto',
        message: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }

  async addVariacao(req: Request, res: Response) {
    const { referencia, id_loja } = req.params;

    try {
      const produto = await this.produtoRepositorio.findOneBy({ referencia, id_loja });

      if (!produto) {
        return res.status(404).json({
          success: false,
          error: 'Produto não encontrado',
          message: 'Produto com referência e loja informadas não foi encontrado',
        });
      }

      const variacao = this.variacaoRepositorio.create({
        ...req.body,
        produto,
      });

      const variacaoSalva = await this.variacaoRepositorio.save(variacao);

      res.status(201).json({
        success: true,
        message: 'Variação criada com sucesso',
        data: variacaoSalva,
      });
    } catch (error) {
      console.error('Erro ao adicionar variação:', error);
      res.status(500).json({
        success: false,
        error: 'Erro ao adicionar variação',
        message: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }

  async updateVariacao(req: Request, res: Response) {
    const { id_variacao } = req.params;

    try {
      const variacao = await this.variacaoRepositorio.findOneBy({ id_variacao });

      if (!variacao) {
        return res.status(404).json({
          success: false,
          error: 'Variação não encontrada',
          message: 'Variação com o ID informado não foi encontrada',
        });
      }

      this.variacaoRepositorio.merge(variacao, req.body);
      const variacaoAtualizada = await this.variacaoRepositorio.save(variacao);

      res.status(200).json({
        success: true,
        message: 'Variação atualizada com sucesso',
        data: variacaoAtualizada,
      });
    } catch (error) {
      console.error('Erro ao atualizar variação:', error);
      res.status(500).json({
        success: false,
        error: 'Erro ao atualizar variação',
        message: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }

  async deleteVariacao(req: Request, res: Response) {
    const { id_variacao } = req.params;

    try {
      const variacao = await this.variacaoRepositorio.findOneBy({ id_variacao });

      if (!variacao) {
        return res.status(404).json({
          success: false,
          error: 'Variação não encontrada',
          message: 'Variação com o ID informado não foi encontrada',
        });
      }

      await this.variacaoRepositorio.remove(variacao);

      res.status(200).json({
        success: true,
        message: 'Variação removida com sucesso',
        data: variacao,
      });
    } catch (error) {
      console.error('Erro ao remover variação:', error);
      res.status(500).json({
        success: false,
        error: 'Erro ao remover variação',
        message: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }

  // ------- busca -------

  // Realiza busca pelo nome, categoria e material de um produto
  // Também busca pelas variações do produto
  async searchByDescricaoOuNome(req: Request, res: Response) {
    const { id_loja } = req.params;
    const { termo } = req.query;

    if (!id_loja || !termo) {
      return res.status(400).json({
        success: false,
        error: 'Parâmetros ausentes',
        message: 'ID da loja e termo de busca são obrigatórios',
      });
    }

    try {
      const termoFormatado = `%${(termo as string).toLowerCase()}%`;

      const produtos = await this.produtoRepositorio
        .createQueryBuilder('produto')
        .leftJoinAndSelect('produto.variacoes', 'variacao')
        .where('produto.id_loja = :id_loja', { id_loja })
        .andWhere(
          `(LOWER(produto.nome) LIKE :termo OR
          LOWER(produto.categoria) LIKE :termo OR
          LOWER(produto.material) LIKE :termo OR
          LOWER(variacao.descricao_variacao) LIKE :termo)`,
          { termo: termoFormatado },
        )
        .getMany();

      return res.status(200).json({
        success: true,
        data: produtos,
        count: produtos.length,
      });
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      return res.status(500).json({
        success: false,
        error: 'Erro interno',
        message: 'Erro ao buscar produtos por termo',
      });
    }
  }

  // Busca os produtos paginados - Default: pagina 1 - limite 9
  async findAllPaginado(req: Request, res: Response) {
    const { page = '1', limit = '9' } = req.query;
    const id_loja = req.params.id_loja;

    if (!id_loja) {
      return res.status(400).json({
        success: false,
        error: 'Parâmetro id_loja é obrigatório na URL',
      });
    }

    const skip = (Number(page) - 1) * Number(limit);

    try {
      const [produtos, total] = await this.produtoRepositorio.findAndCount({
        where: { loja: { id_loja } },
        relations: ['variacoes'],
        skip,
        take: Number(limit),
      });

      return res.status(200).json({
        success: true,
        data: produtos,
        page: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        totalItems: total,
      });
    } catch (error) {
      console.error('Erro ao buscar produtos paginados:', error);
      return res.status(500).json({
        success: false,
        error: 'Erro ao buscar produtos',
        message: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }
}
