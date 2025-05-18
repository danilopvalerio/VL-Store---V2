import express from "express";
import { AppDataSource } from "./src/database/AppDataSource";
import lojaRoutes from "./src/routes/lojaRoutes";

// Criando objeto APP express para criar o servidor WEB do back-end
const app = express();

// Porta utilizada para rodar o servidor
const PORT = 9700;

//Aqui iniciamos a conexão com o database e depois o servidor back-end
AppDataSource.initialize().then(() => {
  console.log("Conexão com o banco de dados estabelecida!");
  app.use(express.json());
  app.use("/api", lojaRoutes);

  app.listen(PORT, () => {
    console.log("Servidor online");
  });
});
