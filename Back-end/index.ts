import { AppDataSource } from './src/database/AppDataSource';
import {appInstance as app} from './src/app'; // Importa a instância do Express configurada

const PORT = process.env.PORT || 3000;

async function iniciarServidor() {
  try {
    await AppDataSource.initialize();
    console.log('Conexão com o banco de dados estabelecida!');
    
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
      console.log(`Acesse: http://localhost:${PORT}`);
      console.log(`Ambiente: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('Falha ao conectar com o banco de dados:', error);
    process.exit(1);
  }
}

iniciarServidor();