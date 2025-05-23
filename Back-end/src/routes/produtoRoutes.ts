import express from 'express';
import ProdutoController from '../controllers/ProdutoController';
import { authenticateJWT, autorizar } from '../middlewares/authMiddleware';
import { UserRole } from '../types/user.types';

const router = express.Router();
const produtoController = new ProdutoController();

type AsyncRequestHandler = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => Promise<any>;

const asyncHandler =
  (fn: AsyncRequestHandler) =>
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

// --- PRODUTOS ---

// router.post(
//   '/produtos',
//   authenticateJWT,
//   autorizar('user'),
//   asyncHandler(produtoController.createProduto.bind(produtoController)),
// );

// --- PRODUTOS --- Colocar autenticação depois com JWT

// Criar produto
router.post(
  '/produtos',
  authenticateJWT,
  autorizar(UserRole.ADMIN),
  asyncHandler(produtoController.createProduto.bind(produtoController)),
);

// Listar todos os produtos
router.get(
  '/produtos/loja/:id_loja',
  authenticateJWT,
  autorizar(UserRole.ADMIN, UserRole.FUNCIONARIO),
  asyncHandler(produtoController.findAll.bind(produtoController)),
);

// Buscar produto pela referência
router.get(
  '/produtos/loja/:id_loja/referencia/:referencia',
  authenticateJWT,
  autorizar(UserRole.ADMIN, UserRole.FUNCIONARIO),
  asyncHandler(produtoController.findByReferencia.bind(produtoController)),
);

// Deletar Produto
router.delete(
  '/produtos/loja/:id_loja/referencia/:referencia',
  authenticateJWT,
  autorizar(UserRole.ADMIN),
  asyncHandler(produtoController.delete.bind(produtoController)),
);

// Atualizar produto
router.patch(
  '/produtos/loja/:id_loja/referencia/:referencia',
  authenticateJWT,
  autorizar(UserRole.ADMIN),
  asyncHandler(produtoController.update.bind(produtoController)),
);

// --- VARIAÇÕES DE PRODUTOS

//Adicionar variação
router.post(
  '/produtos/variacao/loja/:id_loja/referencia/:referencia',
  authenticateJWT,
  autorizar(UserRole.ADMIN),
  asyncHandler(produtoController.addVariacao.bind(produtoController)),
);

//Atualizar variação
router.patch(
  '/produtos/variacao/loja/:id_loja/referencia/:referencia/:variacao',
  authenticateJWT,
  autorizar(UserRole.ADMIN),
  asyncHandler(produtoController.updateVariacao.bind(produtoController)),
);

//Deletar variação
router.patch(
  '/produtos/variacao/loja/:id_loja/referencia/:referencia/:variacao',
  authenticateJWT,
  autorizar(UserRole.ADMIN),
  asyncHandler(produtoController.updateVariacao.bind(produtoController)),
);

// --- FILTROS DE PRODUTOS ---

router.get(
  '/produtos/loja/:id_loja/busca',
  authenticateJWT,
  autorizar(UserRole.ADMIN, UserRole.FUNCIONARIO),
  asyncHandler(produtoController.searchByDescricaoOuNome.bind(produtoController)),
);

router.get(
  '/produtos/loja/:id_loja/paginado',
  authenticateJWT,
  autorizar(UserRole.ADMIN, UserRole.FUNCIONARIO),
  asyncHandler(produtoController.findAllPaginado.bind(produtoController)),
);

export default router;
