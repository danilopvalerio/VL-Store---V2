import express from "express";
import LojaController from "../controllers/LojaController";
import { autenticar, autorizar } from "../middlewares/authMiddleware";

const router = express.Router();
const lojaController = new LojaController();

// Middleware para tratamento assíncrono
const asyncHandler =
  (fn: Function) =>
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

// Rotas CRUD protegidas
router.get(
    "/lojas",
    autenticar,
    asyncHandler(lojaController.findAll.bind(lojaController))
);

router.post(
    "/lojas",
    autenticar,
    autorizar('admin'), // somente admin pode criar lojas
    asyncHandler(lojaController.createLoja.bind(lojaController))
);

router.get(
  "/lojas/:id",
    autenticar,
    asyncHandler(lojaController.findById.bind(lojaController))
);

router.patch(
  "/lojas/:id",
    autenticar,
    autorizar('admin'), // Somente admin pode atualizar
  asyncHandler(lojaController.update.bind(lojaController))
);

router.delete(
  "/lojas/:id",
    autenticar,
    autorizar('admin'), // Somente admin pode deletar
    // asyncHandler(lojaController.delete.bind(lojaController))
);

export default router;
