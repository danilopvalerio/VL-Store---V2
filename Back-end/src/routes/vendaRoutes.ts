import express from 'express';
import VendaController from '../controllers/VendaController';
import { authenticateJWT, autorizar, AuthRequest } from '../middlewares/authMiddleware';
import { UserRole } from '../types/user.types';

const router = express.Router();
const vendaController = new VendaController();

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

//----- CRUD Completo -----

// CREATE - Criar nova venda
router.post(
	'/',
	authenticateJWT,
	autorizar(UserRole.ADMIN, UserRole.FUNCIONARIO),
	asyncHandler(vendaController.createVenda.bind(vendaController))
);

// READ - Obter venda por ID
router.get(
	'/:id',
	authenticateJWT,
	autorizar(UserRole.ADMIN, UserRole.FUNCIONARIO),
	asyncHandler(vendaController.findById.bind(vendaController))
);

// READ - Listar itens de uma venda específica
router.get(
	'/:id_venda/itens',
	authenticateJWT,
	autorizar(UserRole.ADMIN, UserRole.FUNCIONARIO),
	asyncHandler(vendaController.findItensByVenda.bind(vendaController))
);

// READ - Listar todas as vendas de uma loja (paginado)
router.get(
	'/loja/:id_loja',
	authenticateJWT,
	autorizar(UserRole.ADMIN, UserRole.FUNCIONARIO),
	asyncHandler(vendaController.findAllByLoja.bind(vendaController))
);

// READ - Listar vendas paginadas (com filtros)
router.get(
	'/loja/:id_loja/paginado',
	authenticateJWT,
	autorizar(UserRole.ADMIN, UserRole.FUNCIONARIO),
	asyncHandler(vendaController.findAllPaginado.bind(vendaController))
);

// UPDATE - Atualizar venda (ex: cancelamento)
router.patch(
	'/:id',
	authenticateJWT,
	autorizar(UserRole.ADMIN),
	asyncHandler(vendaController.update.bind(vendaController))
);

// DELETE - Remover venda (com reversão de estoque)
router.delete(
	'/:id',
	authenticateJWT,
	autorizar(UserRole.ADMIN),
	asyncHandler(vendaController.delete.bind(vendaController))
);

router.patch(
	'/variacoes/:id_variacao/decrementar',
	authenticateJWT,
	autorizar(UserRole.ADMIN),
	asyncHandler(vendaController.decrementarEstoque.bind(vendaController))
);

//----- Relatórios -----

// Relatório de vendas por período
router.get(
	'/loja/:id_loja/relatorio/:data_inicio/:data_fim',
	authenticateJWT,
	autorizar(UserRole.ADMIN),
	asyncHandler(vendaController.getRelatorioVendas.bind(vendaController))
);


export default router;