import express from 'express';
import ProdutoController from '../controllers/ProdutoController';
import { authenticateJWT, autorizar } from '../middlewares/authMiddleware';

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
router.post('/produtos', asyncHandler(produtoController.createProduto.bind(produtoController)));

router.get('/produtos', asyncHandler(produtoController.findAll.bind(produtoController)));

router.get(
  '/produtos/loja/:id_loja/referencia/:referencia',
  asyncHandler(produtoController.findByReferencia.bind(produtoController)),
);

router.delete(
  '/produtos/loja/:id_loja/referencia/:referencia',
  asyncHandler(produtoController.delete.bind(produtoController)),
);

router.patch(
  '/produtos/loja/:id_loja/referencia/:referencia',
  asyncHandler(produtoController.update.bind(produtoController)),
);

// --- FILTROS DE PRODUTOS ---

router.get(
  '/produtos/loja/:id_loja/busca',
  asyncHandler(produtoController.searchByDescricaoOuNome.bind(produtoController)),
);

export default router;
