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

//----- Login

//router.post('/login', asyncHandler(FuncionarioController.login.bind(FuncionarioController)));

//----- CRUD

router.get('/funcionario', asyncHandler(funcionarioController.findAll.bind(funcionarioController)));

router.post(
  '/funcionario',
  asyncHandler(funcionarioController.createFuncionario.bind(funcionarioController)),
);

router.get(
  '/funcionario/:id',
  // authenticateJWT,
  asyncHandler(funcionarioController.findById.bind(funcionarioController)),
);

router.patch(
  '/funcionario/:id',
  asyncHandler(funcionarioController.update.bind(funcionarioController)),
);

router.delete(
  '/funcionario/:id',
  authenticateJWT,
  autorizar(UserRole.ADMIN),
  asyncHandler(funcionarioController.delete.bind(funcionarioController)),
);

// Método temporário para deletar lojas - dev - sem token
router.delete(
  '/funcionario-dev/:id',
  authenticateJWT,
  autorizar(UserRole.ADMIN),
  asyncHandler(funcionarioController.delete.bind(funcionarioController)),
);

router.get(
  '/me',
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
      // Buscar informações atualizadas do usuário no banco de dados
      const lojaController = new LojaController();
      const loja = await lojaController
        .getLojaRepository()
        .findOneBy({ id_loja: req.user.id_loja });

      if (!loja) {
        return res.status(404).json({
          success: false,
          error: 'Usuário não encontrado',
          message: 'Não foi possível encontrar o usuário no banco de dados',
        });
      }

      // Remove a senha do retorno
      const { senha, ...lojaSemSenha } = loja;

      return res.status(200).json({
        success: true,
        data: lojaSemSenha,
      });
    } catch (error) {
      console.error('Erro ao buscar informações do usuário:', error);
      return res.status(500).json({
        success: false,
        error: 'Erro ao buscar informações',
        message: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }),
);

export default router;
