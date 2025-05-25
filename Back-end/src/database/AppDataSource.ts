import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE, // URL completa do banco
  synchronize: true,
  logging: false,
  entities: ['src/models/*.ts'],
  migrations: ['src/migrations/*.ts'],
  subscribers: ['src/subscribers/*.ts'],
});

export const connectDB = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Conexão com o banco de dados PostgreSQL via URL bem-sucedida.');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados PostgreSQL via URL:', error);
    process.exit(1);
  }
};
