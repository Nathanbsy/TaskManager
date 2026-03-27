import { Router } from "express";
import db from "../db/db.js";

const router = Router();

// ============================================
// LABELS (ETIQUETAS)
// ============================================

// Criar Label
router.post("/projetos/:idProjeto/labels", (req, res) => {
    const { idProjeto } = req.params;
    const { nome, cor } = req.body;

    if (!nome) {
        return res.status(400).json({ error: "Nome da etiqueta é obrigatório" });
    }

    const q = "INSERT INTO Label (IdProjeto, Nome, Cor) VALUES (?, ?, ?)";
    db.getConnection((err, conexao) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [idProjeto, nome, cor], (err, resultado) => {
            conexao.release();
            if (err) {
                console.error("Erro ao criar etiqueta:", err);
                if (err.code === "ER_DUP_ENTRY") {
                    return res.status(409).json({ error: "Etiqueta com este nome já existe" });
                }
                return res.status(500).json({ error: "Erro ao criar etiqueta" });
            }
            res.status(201).json({ message: "Etiqueta criada com sucesso", id: resultado.insertId });
        });
    });
});

// Obter labels do projeto
router.get("/projetos/:idProjeto/labels", (req, res) => {
    const { idProjeto } = req.params;
    const q = "SELECT * FROM Label WHERE IdProjeto = ? ORDER BY Nome";
    db.getConnection((err, conexao) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [idProjeto], (err, resultado) => {
            conexao.release();
            if (err) {
                console.error("Erro ao buscar etiquetas:", err);
                return res.status(500).json({ error: "Erro ao buscar etiquetas" });
            }
            res.json(resultado);
        });
    });
});

// Atualizar Label
router.put("/labels/:id", (req, res) => {
    const { id } = req.params;
    const { nome, cor } = req.body;

    const q = "UPDATE Label SET Nome = ?, Cor = ? WHERE Id = ?";
    db.getConnection((err, conexao) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [nome, cor, id], (err, resultado) => {
            conexao.release();
            if (err) {
                console.error("Erro ao atualizar etiqueta:", err);
                return res.status(500).json({ error: "Erro ao atualizar etiqueta" });
            }
            res.json({ message: "Etiqueta atualizada com sucesso" });
        });
    });
});

// Deletar Label
router.delete("/labels/:id", (req, res) => {
    const { id } = req.params;
    const q = "DELETE FROM Label WHERE Id = ?";
    db.getConnection((err, conexao) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [id], (err, resultado) => {
            conexao.release();
            if (err) {
                console.error("Erro ao deletar etiqueta:", err);
                return res.status(500).json({ error: "Erro ao deletar etiqueta" });
            }
            res.json({ message: "Etiqueta deletada com sucesso" });
        });
    });
});

// ============================================
// ISSUE - LABEL (RELACIONAMENTO)
// ============================================

// Adicionar label à issue
router.post("/issues/:idIssue/labels/:idLabel", (req, res) => {
    const { idIssue, idLabel } = req.params;

    const q = "INSERT INTO IssueLabel (IdIssue, IdLabel) VALUES (?, ?)";
    db.getConnection((err, conexao) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [idIssue, idLabel], (err, resultado) => {
            conexao.release();
            if (err) {
                console.error("Erro ao adicionar etiqueta:", err);
                if (err.code === "ER_DUP_ENTRY") {
                    return res.status(409).json({ error: "Esta etiqueta já está associada à issue" });
                }
                return res.status(500).json({ error: "Erro ao adicionar etiqueta" });
            }
            res.status(201).json({ message: "Etiqueta adicionada à issue" });
        });
    });
});

// Obter labels da issue
router.get("/issues/:idIssue/labels", (req, res) => {
    const { idIssue } = req.params;
    const q = "SELECT l.* FROM Label l JOIN IssueLabel il ON l.Id = il.IdLabel WHERE il.IdIssue = ? ORDER BY l.Nome";
    db.getConnection((err, conexao) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [idIssue], (err, resultado) => {
            conexao.release();
            if (err) {
                console.error("Erro ao buscar etiquetas da issue:", err);
                return res.status(500).json({ error: "Erro ao buscar etiquetas" });
            }
            res.json(resultado);
        });
    });
});

// Remover label da issue
router.delete("/issues/:idIssue/labels/:idLabel", (req, res) => {
    const { idIssue, idLabel } = req.params;

    const q = "DELETE FROM IssueLabel WHERE IdIssue = ? AND IdLabel = ?";
    db.getConnection((err, conexao) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [idIssue, idLabel], (err, resultado) => {
            conexao.release();
            if (err) {
                console.error("Erro ao remover etiqueta:", err);
                return res.status(500).json({ error: "Erro ao remover etiqueta" });
            }
            res.json({ message: "Etiqueta removida da issue" });
        });
    });
});

export default router;
