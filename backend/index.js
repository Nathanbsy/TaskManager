import express from "express";
import mysql from "mysql";
import cors from "cors";

export * from "./repositorios/usuario.js";
export * from "./repositorios/empresas.js";
export * from "./repositorios/comentario.js";
export * from "./repositorios/status.js";
export * from "./repositorios/tasks.js";

const app = express();

app.use(express.json());

app.use(cors());

app.listen(8080, () => {
    console.log("Servidor rodando na porta 8080");
});