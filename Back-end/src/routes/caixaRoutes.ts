import express from 'express';
import CaixaController from '../controllers/CaixaController';
import { authenticateJWT, autorizar, AuthRequest } from '../middlewares/authMiddleware';
import { UserRole } from '../types/user.types';

const router = express.Router();
const caixaController = new CaixaController();

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

//----- Operações de Caixa -----

// Abrir um novo caixa
router.post(
  '/',
  //   authenticateJWT,
  //   autorizar(UserRole.ADMIN, UserRole.FUNCIONARIO),
  asyncHandler(caixaController.abrirCaixaNovo.bind(caixaController)),
);

// Fechar um caixa
router.patch(
  '/:id/fechar',
  //   authenticateJWT,
  //   autorizar(UserRole.ADMIN, UserRole.FUNCIONARIO),
  asyncHandler(caixaController.fecharCaixa.bind(caixaController)),
);

// Obter caixa por ID
router.get(
  '/:id',
  //   authenticateJWT,
  //   autorizar(UserRole.ADMIN, UserRole.FUNCIONARIO),
  asyncHandler(caixaController.findById.bind(caixaController)),
);

// Obter caixa aberto de uma loja
router.get(
  '/loja/:id_loja/aberto',
  //   authenticateJWT,
  //   autorizar(UserRole.ADMIN, UserRole.FUNCIONARIO),
  asyncHandler(caixaController.findCaixaAbertoByLoja.bind(caixaController)),
);

// Listar todos os caixas de uma loja (paginado)
router.get(
  '/loja/:id_loja',
  //   authenticateJWT,
  //   autorizar(UserRole.ADMIN, UserRole.FUNCIONARIO),
  asyncHandler(caixaController.findAllByLoja.bind(caixaController)),
);

//----- Operações de Movimentação -----

// Criar nova movimentação
router.post(
  '/:id_caixa/movimentacoes',
  //   authenticateJWT,
  //   autorizar(UserRole.ADMIN, UserRole.FUNCIONARIO),
  asyncHandler(caixaController.createMovimentacao.bind(caixaController)),
);

// Listar movimentações de um caixa (paginado)
router.get(
  '/:id_caixa/movimentacoes/all',
  //   authenticateJWT,
  //   autorizar(UserRole.ADMIN, UserRole.FUNCIONARIO),
  asyncHandler(caixaController.findAllMovimentacoesByCaixa.bind(caixaController)),
);

// Listar movimentações de um caixa (paginado)
router.get(
  '/:id_caixa/movimentacoes/',
  //   authenticateJWT,
  //   autorizar(UserRole.ADMIN, UserRole.FUNCIONARIO),
  asyncHandler(caixaController.findMovimentacoesByCaixa.bind(caixaController)),
);

// Remover movimentação
router.delete(
  '/movimentacoes/:id_movimentacao',
  //   authenticateJWT,
  //   autorizar(UserRole.ADMIN),
  asyncHandler(caixaController.deleteMovimentacao.bind(caixaController)),
);

//----- Relatórios -----

// Obter resumo do caixa (totais, saldo, etc.)
router.get(
  '/:id_caixa/resumo',
  authenticateJWT,
  autorizar(UserRole.ADMIN, UserRole.FUNCIONARIO),
  asyncHandler(caixaController.getResumoCaixa.bind(caixaController)),
);

export default router;
