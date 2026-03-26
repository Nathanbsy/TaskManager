import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes.js";

export * from "./modules/usuario.js";
export * from "./modules/empresas.js";
export * from "./modules/projeto.js";
export * from "./modules/issue.js";
export * from "./modules/comentario.js";
export * from "./modules/status.js";
export * from "./modules/labels.js";
export * from "./modules/componentes.js";
export * from "./modules/auth/auth.controller.js";

const app = express();

app.use(express.json());

app.use(cors());

// Rotas de autenticação
app.use(authRoutes);

app.listen(8080, () => {
    console.log("Servidor rodando na porta 8080");
});

