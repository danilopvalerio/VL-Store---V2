import express from "express";
import lojaRoutes from './routes/lojaRoutes';

// Importe suas outras dependências aqui
// import { App } from "./app";
// import loginRoutes from "./routes/loginRoutes";

// Cria a aplicação Express
const app = express();

// Porta utilizada pelo servidor
const PORT = process.env.PORT || 3000;

// Middleware básico
app.use(express.json());

// Rotas básicas
app.get("/", (req, res) => {
  res.send("Backend do VL Store está funcionando!");
});

// Rotas da aplicação
app.use("/api/lojas", lojaRoutes);
// app.use("/api/auth", authRoutes);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

app.use(express.json({
  verify: (req, res, buf) => {
    try {
      JSON.parse(buf.toString());
    } catch (e) {
      throw new Error("JSON inválido");
    }
  }
}));
