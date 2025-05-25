// import express from 'express';
// import FuncionarioController from '../controllers/FuncionarioController';
// import { authenticateJWT, autorizar } from '../middlewares/authMiddleware';
// import { UserRole } from '../types/user.types';
//
// const router = express.Router();
// const funcionarioController = new FuncionarioController();
//
// type AsyncRequestHandler = (
// 	req: express.Request,
// 	res: express.Response,
// 	next: express.NextFunction,
// ) => Promise<any>;
//
// const asyncHandler =
// 	(fn: AsyncRequestHandler) =>
// 		(req: express.Request, res: express.Response, next: express.NextFunction) => {
// 			Promise.resolve(fn(req, res, next)).catch(next);
// 		};
//
// //----- Rotas Públicas -----
// router.post('/login', asyncHandler(funcionarioController.login.bind(funcionarioController)));
//
// //----- Rotas Protegidas -----
// router.get(
// 	'/funcionarios',
// 	authenticateJWT,
// 	autorizar([UserRole.ADMIN, UserRole.FUNCIONARIO]),
// 	asyncHandler(funcionarioController.findAll.bind(funcionarioController)),
// );
//
// router.post(
// 	'/funcionarios',
// 	authenticateJWT,
// 	autorizar(UserRole.ADMIN), // Apenas ADMIN pode criar funcionários
// 	asyncHandler(funcionarioController.createFuncionario.bind(funcionarioController)),
// );
//
// router.get(
// 	'/funcionarios/:id',
// 	authenticateJWT,
// 	autorizar([UserRole.ADMIN, UserRole.FUNCIONARIO]),
// 	asyncHandler(funcionarioController.findById.bind(funcionarioController)),
// );
//
// // Funcionário só pode atualizar seus próprios dados
// router.patch(
// 	'/funcionarios/:id',
// 	authenticateJWT,
// 	autorizar([UserRole.ADMIN, UserRole.FUNCIONARIO], true), // true = verifica se é o próprio usuário
// 	asyncHandler(funcionarioController.update.bind(funcionarioController)),
// );
//
// router.delete(
// 	'/funcionarios/:id',
// 	authenticateJWT,
// 	autorizar(UserRole.ADMIN), // Apenas ADMIN pode deletar
// 	asyncHandler(funcionarioController.delete.bind(funcionarioController)),
// );
//
// export default router;