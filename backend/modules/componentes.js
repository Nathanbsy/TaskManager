import { Router } from "express";
import db from "../db/db.js";

const router = Router();

// ============================================
// COMPONENTES
// ============================================

// Criar Componente
router.post("/projetos/:idProjeto/componentes", (req, res) => {
    const { idProjeto } = req.params;
    const { nome, descricao, idLider } = req.body;

    if (!nome) {
        return res.status(400).json({ error: "Nome do componente é obrigatório" });
    }

    const q = "INSERT INTO Componente (IdProjeto, Nome, Descricao, IdLider) VALUES (?, ?, ?, ?)";
    db.getConnection((err, conexao) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [idProjeto, nome, descricao, idLider], (err, resultado) => {
            conexao.release();
            if (err) {
                console.error("Erro ao criar componente:", err);
                if (err.code === "ER_DUP_ENTRY") {
                    return res.status(409).json({ error: "Componente com este nome já existe" });
                }
                return res.status(500).json({ error: "Erro ao criar componente" });
            }
            res.status(201).json({ message: "Componente criado com sucesso", id: resultado.insertId });
        });
    });
});

// Obter componentes do projeto
router.get("/projetos/:idProjeto/componentes", (req, res) => {
    const { idProjeto } = req.params;
    const q = `SELECT c.*, u.Username as LiderName, COUNT(ic.IdIssue) as TotalIssues 
               FROM Componente c 
               LEFT JOIN Usuario u ON c.IdLider = u.Id 
               LEFT JOIN IssueComponente ic ON c.Id = ic.IdComponente 
               WHERE c.IdProjeto = ? 
               GROUP BY c.Id 
               ORDER BY c.Nome`;
    db.getConnection((err, conexao) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [idProjeto], (err, resultado) => {
            conexao.release();
            if (err) {
                console.error("Erro ao buscar componentes:", err);
                return res.status(500).json({ error: "Erro ao buscar componentes" });
            }
            res.json(resultado);
        });
    });
});

// Atualizar Componente
router.put("/componentes/:id", (req, res) => {
    const { id } = req.params;
    const { nome, descricao, idLider } = req.body;

    const q = "UPDATE Componente SET Nome = ?, Descricao = ?, IdLider = ? WHERE Id = ?";
    db.getConnection((err, conexao) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [nome, descricao, idLider, id], (err, resultado) => {
            conexao.release();
            if (err) {
                console.error("Erro ao atualizar componente:", err);
                return res.status(500).json({ error: "Erro ao atualizar componente" });
            }
            res.json({ message: "Componente atualizado com sucesso" });
        });
    });
});

// Deletar Componente
router.delete("/componentes/:id", (req, res) => {
    const { id } = req.params;
    const q = "DELETE FROM Componente WHERE Id = ?";
    db.getConnection((err, conexao) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [id], (err, resultado) => {
            conexao.release();
            if (err) {
                console.error("Erro ao deletar componente:", err);
                return res.status(500).json({ error: "Erro ao deletar componente" });
            }
            res.json({ message: "Componente deletado com sucesso" });
        });
    });
});

// ============================================
// ISSUE - COMPONENTE (RELACIONAMENTO)
// ============================================

// Adicionar componente à issue
router.post("/issues/:idIssue/componentes/:idComponente", (req, res) => {
    const { idIssue, idComponente } = req.params;

    const q = "INSERT INTO IssueComponente (IdIssue, IdComponente) VALUES (?, ?)";
    db.getConnection((err, conexao) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [idIssue, idComponente], (err, resultado) => {
            conexao.release();
            if (err) {
                console.error("Erro ao adicionar componente:", err);
                if (err.code === "ER_DUP_ENTRY") {
                    return res.status(409).json({ error: "Este componente já está associado à issue" });
                }
                return res.status(500).json({ error: "Erro ao adicionar componente" });
            }
            res.status(201).json({ message: "Componente adicionado à issue" });
        });
    });
});

// Obter componentes da issue
router.get("/issues/:idIssue/componentes", (req, res) => {
    const { idIssue } = req.params;
    const q = `SELECT c.* FROM Componente c 
               JOIN IssueComponente ic ON c.Id = ic.IdComponente 
               WHERE ic.IdIssue = ? 
               ORDER BY c.Nome`;
    db.getConnection((err, conexao) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [idIssue], (err, resultado) => {
            conexao.release();
            if (err) {
                console.error("Erro ao buscar componentes da issue:", err);
                return res.status(500).json({ error: "Erro ao buscar componentes" });
            }
            res.json(resultado);
        });
    });
});

// Remover componente da issue
router.delete("/issues/:idIssue/componentes/:idComponente", (req, res) => {
    const { idIssue, idComponente } = req.params;

    const q = "DELETE FROM IssueComponente WHERE IdIssue = ? AND IdComponente = ?";
    db.getConnection((err, conexao) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [idIssue, idComponente], (err, resultado) => {
            conexao.release();
            if (err) {
                console.error("Erro ao remover componente:", err);
                return res.status(500).json({ error: "Erro ao remover componente" });
            }
            res.json({ message: "Componente removido da issue" });
        });
    });
});

export default router;
