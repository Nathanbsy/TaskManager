import db from '../db.js';
import app from "../index.js";

//FUNCOES WORKSPACE

//Criar Workspace
app.post("/workspaces", (req, res) => {
    const { nomeWorkspace, descricaoWorkspace, idEmpresa } = req.body;
    const q = "INSERT INTO Workspace (NomeWorkspace, DescricaoWorkspace, IdEmpresa) VALUES (?, ?, ?)";
    db.getConnection((err, conexao) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [nomeWorkspace, descricaoWorkspace, idEmpresa], (err, resultado) => {
            conexao.release();
            if (err) {
                console.error("Erro ao inserir workspace:", err);
                return res.status(500).json({ error: "Erro ao inserir workspace" });
            }
            res.json({ message: "Workspace criado com sucesso" });
        });
    });
});

//Selecionar Workspaces por Empresa
app.get("/workspaces/empresa/:idEmpresa", (req, res) => {
    const { idEmpresa } = req.params;
    const q = "SELECT * FROM Workspace WHERE IdEmpresa = ?";
    db.getConnection((err, conexao) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [idEmpresa], (err, resultado) => {
            conexao.release();
            if (err) {
                console.error("Erro ao buscar workspaces:", err);
                return res.status(500).json({ error: "Erro ao buscar workspaces" });
            }
            res.json(resultado);
        });
    });
});


//Selecionar Workspace por ID
app.get("/workspaces/:id", (req, res) => {
    const { id } = req.params;
    const q = "SELECT * FROM Workspace WHERE IdWorkspace = ?";
    db.getConnection((err, conexao) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [id], (err, resultado) => {
            conexao.release();
            if (err) {
                console.error("Erro ao buscar workspace:", err);
                return res.status(500).json({ error: "Erro ao buscar workspace" });
            }
            res.json(resultado);
        });
    });
});

//Alterar Workspace
app.put("/workspaces/:id", (req, res) => {
    const { id } = req.params;
    const { nomeWorkspace, descricaoWorkspace } = req.body;
    const q = "UPDATE Workspace SET NomeWorkspace = ?, DescricaoWorkspace = ? WHERE IdWorkspace = ?";
    db.getConnection((err, conexao) => {
        if (err) {
            console.error("Erro ao conectar ao banco de dados:", err);
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [nomeWorkspace, descricaoWorkspace, id], (err, resultado) => {
            conexao.release();
            if (err) {
                console.error("Erro ao atualizar workspace:", err);
                return res.status(500).json({ error: "Erro ao atualizar workspace" });
            }
            res.json({ message: "Workspace atualizado com sucesso" });
        });
    });
});

//Deletar Workspace
app.delete("/workspaces/:id", (req, res) => {
    const { id } = req.params;
    const q = "call DeletarWorkspace(?)";
    db.getConnection((err, conexao) => {
        if (err) {
            console.error("Erro ao conectar ao banco de dados:", err);
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }        conexao.query(q, [id], (err, resultado) => {
            conexao.release();
            if (err) {
                console.error("Erro ao deletar workspace:", err);
                return res.status(500).json({ error: "Erro ao deletar workspace" });
            }
            res.json({ message: "Workspace deletado com sucesso" });
        });
    });
});

