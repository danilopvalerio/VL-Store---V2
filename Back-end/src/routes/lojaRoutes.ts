import express from 'express';
import LojaController from '../controllers/LojaController';
import { authenticateJWT, autorizar } from '../middlewares/authMiddleware';

const router = express.Router();
const lojaController = new LojaController();

const asyncHandler =
  (fn: any) => (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

// Rota de login
router.post('/login', asyncHandler(lojaController.login.bind(lojaController)));

// Rotas CRUD
router.get('/lojas', authenticateJWT, asyncHandler(lojaController.findAll.bind(lojaController)));

// Rota de criação pública
router.post('/lojas', asyncHandler(lojaController.createLoja.bind(lojaController)));

// Rotas protegidas
router.get(
  '/lojas/:id',
  authenticateJWT,
  asyncHandler(lojaController.findById.bind(lojaController)), // Corrigido de findAll para findById
);

// Rotas admin
router.patch(
  '/lojas/:id',
  authenticateJWT,
  autorizar('admin'),
  asyncHandler(lojaController.update.bind(lojaController)),
);

router.delete(
  '/lojas/:id',
  authenticateJWT,
  autorizar('admin'),
  asyncHandler(lojaController.delete.bind(lojaController)),
);

export default router;
