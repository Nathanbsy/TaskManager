import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes.js";
import usuarioRouter from "./modules/usuario.js";
import empresasRouter from "./modules/empresas.js";
import projetoRouter from "./modules/projeto.js";
import issueRouter from "./modules/issue.js";
import comentarioRouter from "./modules/comentario.js";
import statusRouter from "./modules/status.js";
import labelsRouter from "./modules/labels.js";
import componentesRouter from "./modules/componentes.js";

const app = express();

app.use(express.json());

app.use(cors());

// Rotas de autenticação
app.use(authRoutes);

// Rotas dos módulos
app.use(usuarioRouter);
app.use(empresasRouter);
app.use(projetoRouter);
app.use(issueRouter);
app.use(comentarioRouter);
app.use(statusRouter);
app.use(labelsRouter);
app.use(componentesRouter);

app.listen(8080, () => {
    console.log("Servidor rodando na porta 8080");
});