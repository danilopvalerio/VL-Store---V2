// src/routes/generalRoutes.ts
import express from 'express';
import { authenticateJWT, autorizar, AuthRequest } from '../middlewares/authMiddleware';
import { UserRole } from '../types/user.types';
import FuncionarioController from '../controllers/FuncionarioController';
import LojaController from '../controllers/LojaController';

const router = express.Router();
const funcionarioController = new FuncionarioController();
const lojaController = new LojaController();

type AsyncRequestHandler = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction,
) => Promise<any>;

const asyncHandler = (fn: AsyncRequestHandler) =>
	(req: express.Request, res: express.Response, next: express.NextFunction) => {
		Promise.resolve(fn(req, res, next)).catch(next);
	};

//----- Rotas de Autenticação Comum -----
router.post('/login/funcionario', asyncHandler(funcionarioController.login.bind(funcionarioController)));
router.post('/login/loja', asyncHandler(lojaController.login.bind(lojaController)));

//----- Rotas de Informações do Usuário Logado -----
router.get('/me/funcionario',
	authenticateJWT,
	asyncHandler(async (req: AuthRequest, res) => {
		if (!req.user) {
			return res.status(401).json({
				success: false,
				error: 'Não autenticado',
				message: 'Usuário não autenticado',
			});
		}
		
		try {
			const lojaController = new LojaController();
			const funcionario = await lojaController
				.getLojaRepository()
				.findOneBy({ id_loja: req.user.id_loja });
			
			if (!funcionario) {
				return res.status(404).json({
					success: false,
					error: 'Funcionário não encontrado',
					message: 'Não foi possível encontrar o funcionário no banco de dados',
				});
			}
			
			const { senha, ...funcionarioSemSenha } = funcionario;
			return res.status(200).json({
				success: true,
				data: funcionarioSemSenha,
			});
		} catch (error) {
			console.error('Erro ao buscar informações do funcionário:', error);
			return res.status(500).json({
				success: false,
				error: 'Erro ao buscar informações',
				message: error instanceof Error ? error.message : 'Erro desconhecido',
			});
		}
	})
);

router.get('/me/loja',
	authenticateJWT,
	asyncHandler(async (req: AuthRequest, res) => {
		if (!req.user) {
			return res.status(401).json({
				success: false,
				error: 'Não autenticado',
				message: 'Usuário não autenticado',
			});
		}
		
		try {
			const loja = await lojaController
				.getLojaRepository()
				.findOneBy({ id_loja: req.user.id_loja });
			
			if (!loja) {
				return res.status(404).json({
					success: false,
					error: 'Loja não encontrada',
					message: 'Não foi possível encontrar a loja no banco de dados',
				});
			}
			
			const { senha, ...lojaSemSenha } = loja;
			return res.status(200).json({
				success: true,
				data: lojaSemSenha,
			});
		} catch (error) {
			console.error('Erro ao buscar informações da loja:', error);
			return res.status(500).json({
				success: false,
				error: 'Erro ao buscar informações',
				message: error instanceof Error ? error.message : 'Erro desconhecido',
			});
		}
	})
);

export default router;