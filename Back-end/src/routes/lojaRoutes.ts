import express from "express";
import LojaController from "../controllers/LojaController";

const router = express.Router();
const lojaController = new LojaController();

// Wrapper para tratamento assíncrono
const asyncHandler =
  (fn: Function) =>
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

// Rotas CRUD
router.get("/lojas", asyncHandler(lojaController.findAll.bind(lojaController)));
router.post(
  "/lojas",
  asyncHandler(lojaController.createLoja.bind(lojaController))
);
router.get(
  "/lojas/:id",
  asyncHandler(lojaController.findById.bind(lojaController))
);
router.patch(
  "/lojas/:id",
  asyncHandler(lojaController.update.bind(lojaController))
);
router.delete(
  "/lojas/:id",
  asyncHandler(lojaController.delete.bind(lojaController))
);

export default router;
