import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import lojaRoutes from './routes/lojaRoutes';
import produtoRoutes from './routes/produtoRoutes';
import funcionarioRoutes from "./routes/funcionarioRoutes";
import vendaRoutes from "./routes/vendaRoutes";
import generalRoutes from "./routes/generalRoutes";


dotenv.config();

class App {
  public app: express.Application;
  
  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.errorHandling();
  }
  
  private config(): void {
    this.app.use(cors({
      origin: 'http://localhost:3000',
      credentials: true
    }));
    
    this.app.use(
        express.json({
          verify: (req, res, buf) => {
            try {
              JSON.parse(buf.toString());
            } catch (erro) {
              console.error('Erro com JSON:', erro);
              throw new Error('JSON inválido');
            }
          },
        }),
    );
    
    this.app.use(express.urlencoded({ extended: true }));
  }
  
  private routes(): void {
    this.app.get('/', (req, res) => {
      res.json({
        success: true,
        message: 'Backend do VL Store está funcionando!',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
      });
    });
    
    this.app.use('/api', generalRoutes);
    this.app.use('/api/funcionarios', funcionarioRoutes);
    this.app.use('/api/lojas', lojaRoutes);
    this.app.use('/api/produtos', produtoRoutes);
    this.app.use('/api/vendas', vendaRoutes);
  }
  
  private errorHandling(): void {
    this.app.use((err: Error, req: Request, res: Response, next: Function) => {
      console.error('Erro na aplicação:', err);
      res.status(500).json({
        success: false,
        error: 'Erro interno no servidor',
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
      });
    });
  }
}

// Exportação única e correta
export const appInstance: Application = new App().app;
