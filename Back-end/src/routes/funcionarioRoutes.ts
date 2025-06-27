import express from 'express';
import FuncionarioController from '../controllers/FuncionarioController';
import LojaController from '../controllers/LojaController';
import { authenticateJWT, autorizar, AuthRequest } from '../middlewares/authMiddleware';
import { UserRole } from '../types/user.types';

const router = express.Router();
const funcionarioController = new FuncionarioController();

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

//----- Rotas Protegidas -----

// Listar todos funcionários (apenas admin)
router.get(
  '/loja/:id',
  authenticateJWT,
  autorizar(UserRole.ADMIN, UserRole.FUNCIONARIO),
  asyncHandler(funcionarioController.findAll.bind(funcionarioController)),
);
router.get(
  '/loja-dev/:id',
  asyncHandler(funcionarioController.findAll.bind(funcionarioController)),
);

// Criar novo funcionário (apenas admin)
router.post(
  '/',
  authenticateJWT,
  autorizar(UserRole.ADMIN),
  asyncHandler(funcionarioController.createFuncionario.bind(funcionarioController)),
);

// Obter funcionário por ID (admin ou o próprio funcionário)
router.get(
  '/:id',
  authenticateJWT,
  asyncHandler(async (req: AuthRequest, res: express.Response) => {
    // Admin pode ver qualquer funcionário
    if (req.user?.role === UserRole.ADMIN) {
      return funcionarioController.findById(req, res);
    }

    // Funcionário só pode ver a si mesmo
    if (req.user?.id === req.params.id) {
      return funcionarioController.findById(req, res);
    }

    return res.status(403).json({
      success: false,
      error: 'Acesso negado',
      message: 'Você só pode visualizar seus próprios dados',
    });
  }),
);

// Atualizar funcionário (admin ou o próprio funcionário)
router.patch(
  '/loja/:id_loja/funcionario/:id',
  authenticateJWT,
  asyncHandler(async (req: AuthRequest, res: express.Response) => {
    // Admin pode atualizar qualquer funcionário
    if (req.user?.role === UserRole.ADMIN) {
      return funcionarioController.update(req, res);
    }

    // Funcionário só pode atualizar a si mesmo
    if (req.user?.id === req.params.id) {
      return funcionarioController.update(req, res);
    }

    return res.status(403).json({
      success: false,
      error: 'Acesso negado',
      message: 'Você só pode atualizar seus próprios dados',
    });
  }),
);

// Deletar funcionário (apenas admin)
router.delete(
  '/loja/:id_loja/funcionario/:id',
  authenticateJWT,
  autorizar(UserRole.ADMIN),
  asyncHandler(funcionarioController.delete.bind(funcionarioController)),
);

// Busca funcionários por termo (nome, email, cpf ou telefone)
router.get(
  '/loja/:id_loja/busca/:termo',
  // authenticateJWT,
  // autorizar(UserRole.ADMIN),
  asyncHandler(funcionarioController.searchByDescricaoOuNome.bind(funcionarioController)),
);

// Lista funcionários paginados
router.get(
  '/loja/:id_loja/paginado',
  // authenticateJWT,
  // autorizar(UserRole.ADMIN),
  asyncHandler(funcionarioController.findAllPaginado.bind(funcionarioController)),
);

export default router;
