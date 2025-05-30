import express from 'express';
import LojaController from '../controllers/LojaController';
import { authenticateJWT, autorizar, AuthRequest } from '../middlewares/authMiddleware';
import { UserRole } from '../types/user.types';

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


//----- CRUD

router.get('/',
    asyncHandler(lojaController.findAll.bind(lojaController)));

router.post('/',
    asyncHandler(lojaController.createLoja.bind(lojaController)));

router.get(
  '/:id',
  asyncHandler(lojaController.findById.bind(lojaController)),
);

router.patch('/:id', asyncHandler(lojaController.update.bind(lojaController)));

router.delete(
  '/:id',
  authenticateJWT,
  autorizar(UserRole.ADMIN),
  asyncHandler(lojaController.delete.bind(lojaController)),
);


router.delete(
  '/:id',
  authenticateJWT,
  autorizar(UserRole.ADMIN),
  asyncHandler(lojaController.delete.bind(lojaController)),
);



export default router;
