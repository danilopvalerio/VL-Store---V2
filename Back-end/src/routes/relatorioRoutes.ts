import express from 'express';
import RelatorioController from '../controllers/RelatorioController';
import { authenticateJWT, autorizar } from '../middlewares/authMiddleware';
import { UserRole } from '../types/user.types';

const router = express.Router();
const relatorioController = new RelatorioController();

// Função para simplificar o tratamento de rotas assíncronas
const asyncHandler =
  (fn: (req: express.Request, res: express.Response, next: express.NextFunction) => Promise<any>) =>
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

// --- ROTAS DE RELATÓRIOS ---

// Exemplo de chamada: GET /relatorios/loja/ID_DA_LOJA/ranking-funcionarios?dataInicio=2025-01-01&dataFim=2025-01-31
router.get(
  '/loja/:id_loja/ranking-funcionarios',
  //   authenticateJWT,
  //   autorizar(UserRole.ADMIN),
  asyncHandler(relatorioController.getRankingFuncionariosPorVenda.bind(relatorioController)),
);

// Exemplo de chamada: GET /relatorios/loja/ID_DA_LOJA/produtos-mais-vendidos?dataInicio=2025-01-01&dataFim=2025-01-31
router.get(
  '/loja/:id_loja/produtos-mais-vendidos',
  //   authenticateJWT,
  //   autorizar(UserRole.ADMIN, UserRole.FUNCIONARIO),
  asyncHandler(relatorioController.getProdutosMaisVendidos.bind(relatorioController)),
);

// Exemplo de chamada: GET /relatorios/loja/ID_DA_LOJA/total-entradas?dataInicio=2025-01-01&dataFim=2025-01-31
router.get(
  '/loja/:id_loja/total-entradas-saidas',
  //   authenticateJWT,
  //   autorizar(UserRole.ADMIN),
  asyncHandler(relatorioController.getRelatorioFinanceiro.bind(relatorioController)),
);

// Exemplo de chamada: GET /relatorios/loja/ID_DA_LOJA/vendas-forma-pagamento?dataInicio=2025-01-01&dataFim=2025-01-31
router.get(
  '/loja/:id_loja/vendas-forma-pagamento',
  //   authenticateJWT,
  //   autorizar(UserRole.ADMIN),
  asyncHandler(relatorioController.getVendasPorFormaPagamento.bind(relatorioController)),
);

// Exemplo de chamada: GET /relatorios/loja/ID_DA_LOJA/estoque-baixo?limite=10
router.get(
  '/loja/:id_loja/estoque-baixo',
  //   authenticateJWT,
  //   autorizar(UserRole.ADMIN, UserRole.FUNCIONARIO),
  asyncHandler(relatorioController.getProdutosComEstoqueBaixo.bind(relatorioController)),
);

router.get(
    '/loja/:id_loja/pdf',
    authenticateJWT,
    autorizar(UserRole.ADMIN, UserRole.FUNCIONARIO),
    asyncHandler(relatorioController.gerarRelatorioPDF.bind(relatorioController))
);

export default router;
