// src/app.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { AppDataSource } from './database/AppDataSource';
import { Request, Response } from 'express';
import lojaRoutes from './routes/lojaRoutes';

dotenv.config();

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.errorHandling();
    this.database();
  }

  private config(): void {
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
    this.app.use(cors());
  }

  private routes(): void {
    // Rota básica
    this.app.get('/', (req, res) => {
      res.json({
        success: true,
        message: 'Backend do VL Store está funcionando!',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
      });
    });

    // Rotas da aplicação
    this.app.use('/api', lojaRoutes);
  }

  private errorHandling(): void {
    // Middleware de tratamento de erros (deve ser definido após as rotas)
    this.app.use((err: Error, req: Request, res: Response) => {
      console.error('Erro na aplicação:', err);
      res.status(500).json({
        success: false,
        error: 'Erro interno no servidor',
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
      });
    });
  }

  private async database(): Promise<void> {
    try {
      await AppDataSource.initialize();
      console.log('Database connected');
    } catch (error) {
      console.error('Database connection error:', error);
    }
  }
}

export default new App().app;
