import { Router } from "express";
import LojaController from "../controllers/LojaController";
import { Request, Response } from "express";

const router = Router();

const lojaController = new LojaController();

router.get("/lojas", (req: Request, res: Response) =>
  lojaController.findAll(req, res)
);

router.post("/lojas", (req: Request, res: Response) =>
  lojaController.createLoja(req, res)
);

export default router;
