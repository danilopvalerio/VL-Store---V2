import express from "express";
import { AppDataSource } from "./src/database/AppDataSource";

// Criando objeto APP express para criar o servidor WEB do back-end
const app = express();
const PORT = 9700;

AppDataSource.initialize().then(() => {
  console.log("Conexão com o banco de dados estabelecida!");

  app.listen(PORT, () => {
    console.log("Servidor online");
  });
});
