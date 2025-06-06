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

// --- ROTAS DE VENDA ---

// Criar nova venda (funcionários e admin)
router.post(
	'/',
	authenticateJWT,
	autorizar(UserRole.ADMIN, UserRole.FUNCIONARIO),
	asyncHandler(vendaController.createVenda.bind(vendaController))
);

// Obter venda por ID (funcionários e admin)
router.get(
	'/:id',
	authenticateJWT,
	autorizar(UserRole.ADMIN, UserRole.FUNCIONARIO),
	asyncHandler(vendaController.findById.bind(vendaController))
);

// Listar todas as vendas de um funcionário (admin ou o próprio funcionário)
router.get(
	'/funcionario/:id_funcionario',
	authenticateJWT,
	asyncHandler(async (req: AuthRequest, res: express.Response) => {
		// Admin pode ver todas as vendas
		if (req.user?.role === UserRole.ADMIN) {
			return vendaController.findAllByFuncionario(req, res);
		}
		
		// Funcionário só pode ver suas próprias vendas
		if (req.user?.id === req.params.id_funcionario) {
			return vendaController.findAllByFuncionario(req, res);
		}
		
		return res.status(403).json({
			success: false,
			error: 'Acesso negado',
			message: 'Você só pode visualizar suas próprias vendas',
		});
	})
);

// Listar todas as vendas de uma loja (apenas admin da loja)
router.get(
	'/loja/:id_loja',
	authenticateJWT,
	asyncHandler(async (req: AuthRequest, res: express.Response) => {
		// Verifica se o usuário é admin da loja solicitada
		if (req.user?.role === UserRole.ADMIN && req.user?.id_loja === req.params.id_loja) {
			return vendaController.findAllByLoja(req, res);
		}
		
		return res.status(403).json({
			success: false,
			error: 'Acesso negado',
			message: 'Você só pode visualizar vendas da sua própria loja',
		});
	})
);

// Relatório de vendas (apenas admin da loja)
router.get(
	'/loja/:id_loja/relatorio/:data_inicio/:data_fim',
	authenticateJWT,
	asyncHandler(async (req: AuthRequest, res: express.Response) => {
		// Verifica se o usuário é admin da loja solicitada
		if (req.user?.role === UserRole.ADMIN && req.user?.id_loja === req.params.id_loja) {
			return vendaController.getRelatorioVendas(req, res);
		}
		
		return res.status(403).json({
			success: false,
			error: 'Acesso negado',
			message: 'Você só pode gerar relatórios da sua própria loja',
		});
	})
);

// Listar vendas paginadas (para dashboard)
router.get(
	'/loja/:id_loja/paginado',
	authenticateJWT,
	autorizar(UserRole.ADMIN, UserRole.FUNCIONARIO),
	asyncHandler(vendaController.findAllPaginado.bind(vendaController))
);

export default router;