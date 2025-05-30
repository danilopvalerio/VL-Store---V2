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
  '/',
  authenticateJWT,
  autorizar(UserRole.ADMIN),
  asyncHandler(produtoController.createProduto.bind(produtoController)),
);

// Listar todos os produtos
router.get(
  '/loja/:id_loja',
  authenticateJWT,
  autorizar(UserRole.ADMIN, UserRole.FUNCIONARIO),
  asyncHandler(produtoController.findAll.bind(produtoController)),
);

// Buscar produto pela referência
router.get(
  '/loja/:id_loja/referencia/:referencia',
  authenticateJWT,
  autorizar(UserRole.ADMIN, UserRole.FUNCIONARIO),
  asyncHandler(produtoController.findByReferencia.bind(produtoController)),
);

// Deletar Produto
router.delete(
  '/loja/:id_loja/referencia/:referencia',
  authenticateJWT,
  autorizar(UserRole.ADMIN),
  asyncHandler(produtoController.delete.bind(produtoController)),
);

// Atualizar produto
router.patch(
  '/loja/:id_loja/referencia/:referencia',
  authenticateJWT,
  autorizar(UserRole.ADMIN),
  asyncHandler(produtoController.update.bind(produtoController)),
);

// --- VARIAÇÕES DE PRODUTOS

// Adicionar variação (POST /produtos/:referencia/loja/:id_loja/variacoes)
router.post(
  '/referencia/:referencia/loja/:id_loja/variacoes',
  authenticateJWT,
  autorizar(UserRole.ADMIN),
  asyncHandler(produtoController.addVariacao.bind(produtoController)),
);

// Atualizar variação (PATCH /variacoes/:id_variacao)
router.patch(
  '/variacoes/:id_variacao',
  authenticateJWT,
  autorizar(UserRole.ADMIN),
  asyncHandler(produtoController.updateVariacao.bind(produtoController)),
);

// Deletar variação (DELETE /variacoes/:id_variacao)
router.delete(
  '/variacoes/:id_variacao',
  authenticateJWT,
  autorizar(UserRole.ADMIN),
  asyncHandler(produtoController.deleteVariacao.bind(produtoController)),
);

// --- FILTROS DE PRODUTOS ---

router.get(
  '/loja/:id_loja/busca/:termo',
  authenticateJWT,
  autorizar(UserRole.ADMIN, UserRole.FUNCIONARIO),
  asyncHandler(produtoController.searchByDescricaoOuNome.bind(produtoController)),
);

router.get(
  '/loja/:id_loja/paginado',
  authenticateJWT,
  autorizar(UserRole.ADMIN, UserRole.FUNCIONARIO),
  asyncHandler(produtoController.findAllPaginado.bind(produtoController)),
);

export default router;
