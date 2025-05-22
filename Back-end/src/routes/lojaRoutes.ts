import express from 'express';
import LojaController from '../controllers/LojaController';
import { authenticateJWT, autorizar, AuthRequest } from '../middlewares/authMiddleware';

const router = express.Router();
const lojaController = new LojaController();

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

router.post('/login', asyncHandler(lojaController.login.bind(lojaController)));

//----- CRUD

router.get('/lojas', asyncHandler(lojaController.findAll.bind(lojaController)));

router.post('/lojas', asyncHandler(lojaController.createLoja.bind(lojaController)));

router.get(
  '/lojas/:id',
  // authenticateJWT,
  asyncHandler(lojaController.findById.bind(lojaController)),
);

router.patch('/lojas/:id', asyncHandler(lojaController.update.bind(lojaController)));

router.delete(
  '/lojas/:id',
  authenticateJWT,
  autorizar('user'),
  asyncHandler(lojaController.delete.bind(lojaController)),
);

// Método temporário para deletar lojas - dev - sem token
router.delete(
  '/lojas-dev/:id',
  authenticateJWT,
  autorizar('user'),
  asyncHandler(lojaController.delete.bind(lojaController)),
);

router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'API funcionando normalmente',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

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
