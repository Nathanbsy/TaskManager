import express from "express";
import cors from "cors";

export * from "./repositorios/usuario.js";
export * from "./repositorios/empresas.js";
export * from "./repositorios/comentario.js";
export * from "./repositorios/status.js";
export * from "./repositorios/tasks.js";
export * from "./repositorios/workspace.js";
export * from "./repositorios/autenticacao.js";

const app = express();

app.use(express.json());

app.use(cors());

app.listen(8080, () => {
    console.log("Servidor rodando na porta 8080");
});

