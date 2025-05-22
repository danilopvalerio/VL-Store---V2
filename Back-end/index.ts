import express from 'express';
import { AppDataSource } from './src/database/AppDataSource';
import lojaRoutes from './src/routes/lojaRoutes';
import produtoRoutes from './src/routes/produtoRoutes';
import cors from 'cors';

// Criando objeto APP express para criar o servidor WEB do back-end
const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);

// Porta utilizada para rodar o servidor
const PORT = process.env.PORT;

//Aqui iniciamos a conexão com o database e depois o servidor back-end
AppDataSource.initialize().then(() => {
  console.log('Conexão com o banco de dados estabelecida!');
  app.use(express.json());
  app.use('/api', lojaRoutes);
  app.use('/api', produtoRoutes);

  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}`);
    console.log(`Ambiente: ${process.env.NODE_ENV || 'development'}`);
  });
});
