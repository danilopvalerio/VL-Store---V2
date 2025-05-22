// @ts-ignore
import express from 'express';
import { AppDataSource } from './src/database/AppDataSource';
import lojaRoutes from './src/routes/lojaRoutes';
import produtoRoutes from './src/routes/produtoRoutes';
// @ts-ignore
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

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Backend do VL Store está funcionando!',
    timestamp: new Date().toISOString(),
  });
})

//Aqui iniciamos a conexão com o database e depois o servidor back-end
// AppDataSource.initialize().then(() => {
//   console.log('Conexão com o banco de dados estabelecida!');
//
//   app.use('/api', lojaRoutes);
//   app.use('/api', produtoRoutes);
//
//   app.listen(PORT, () => {
//     console.log(`Servidor rodando na porta ${PORT}`);
//     console.log(`Acesse: http://localhost:${PORT}`);
//     console.log(`Ambiente: ${process.env.NODE_ENV || 'development'}`);
//   });
// });

async function initializeServer() {
  try {
    // Tentativa de conexão com o banco de dados
    await AppDataSource.initialize();
    console.log('Conexão com o banco de dados estabelecida!');
    
    // Configuração das rotas
    app.use('/api', lojaRoutes);
    app.use('/api', produtoRoutes);
    
    // Inicialização do servidor
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
      console.log(`Acesse: http://localhost:${PORT}`);
      console.log(`Ambiente: ${process.env.NODE_ENV || 'development'}`);
    });
    
  } catch (error) {
    console.error('Falha ao conectar com o banco de dados:', error);
    
    // Encerra o processo com falha (código 1 indica erro)
    process.exit(1);
  }
}

// Inicializa o servidor
initializeServer();
