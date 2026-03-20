import express from "express";
import cors from "cors";

export * from "./modules/usuario.js";
export * from "./modules/empresas.js";
export * from "./modules/comentario.js";
export * from "./modules/status.js";
export * from "./modules/tasks.js";
export * from "./modules/workspace.js";
export * from "./modules/auth/auth.controller.js";

const app = express();

app.use(express.json());

app.use(cors());

app.listen(8080, () => {
    console.log("Servidor rodando na porta 8080");
});

