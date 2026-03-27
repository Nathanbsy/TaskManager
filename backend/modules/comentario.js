import { Router } from "express";
import db from "../db/db.js";

const router = Router();

//FUNCOES DOS COMENTARIOS

//Criar Comentário
router.post("/issues/:idIssue/comentarios", (req, res) => {
    //Pegando o Id da Issue com os parametros da URL
    const { idIssue } = req.params;
    const { texto } = req.body;

    if (!texto) {
        return res.status(400).json({ error: "Texto do comentário é obrigatório" });
    }

    const q = "INSERT INTO Comentario (IdIssue, IdUsuario, Texto) VALUES (?, ?, ?)";
    db.getConnection((err, conexao) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [idIssue, req.usuario.id, texto], (err, resultado) => {
            conexao.release();
            if (err) {
                console.error("Erro ao inserir comentário:", err);
                return res.status(500).json({ error: "Erro ao inserir comentário" });
            }
            res.status(201).json({ message: "Comentário criado com sucesso", id: resultado.insertId });
        });
    });
});

//Selecionar Comentários por Issue
router.get("/issues/:idIssue/comentarios", (req, res) => {
    const { idIssue } = req.params;
    const q = `SELECT c.*, u.Username, u.Avatar 
               FROM Comentario c 
               JOIN Usuario u ON c.IdUsuario = u.Id 
               WHERE c.IdIssue = ? AND c.Deletado = false 
               ORDER BY c.DataCriacao ASC`;
    db.getConnection((err, conexao) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [idIssue], (err, resultado) => {
            conexao.release();
            if (err) {
                console.error("Erro ao buscar comentários:", err);
                return res.status(500).json({ error: "Erro ao buscar comentários" });
            }
            res.json(resultado);
        });
    });
});

//Editar Comentário
router.put("/comentarios/:id", (req, res) => {
    const { id } = req.params;
    const { texto } = req.body;

    if (!texto) {
        return res.status(400).json({ error: "Texto do comentário é obrigatório" });
    }

    const q = "UPDATE Comentario SET Texto = ?, DataAtualizacao = NOW() WHERE Id = ? AND IdUsuario = ?";
    db.getConnection((err, conexao) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [texto, id, req.usuario.id], (err, resultado) => {
            conexao.release();
            if (err) {
                console.error("Erro ao atualizar comentário:", err);
                return res.status(500).json({ error: "Erro ao atualizar comentário" });
            }
            if (resultado.affectedRows === 0) {
                return res.status(403).json({ error: "Você não tem permissão para editar este comentário" });
            }
            res.json({ message: "Comentário atualizado com sucesso" });
        });
    });
});

//Deletar Comentário (soft delete)
router.delete("/comentarios/:id", (req, res) => {
    const { id } = req.params;
    const q = "UPDATE Comentario SET Deletado = true WHERE Id = ? AND IdUsuario = ?";
    db.getConnection((err, conexao) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [id, req.usuario.id], (err, resultado) => {
            conexao.release();
            if (err) {
                console.error("Erro ao deletar comentário:", err);
                return res.status(500).json({ error: "Erro ao deletar comentário" });
            }
            if (resultado.affectedRows === 0) {
                return res.status(403).json({ error: "Você não tem permissão para deletar este comentário" });
            }
            res.json({ message: "Comentário deletado com sucesso" });
        });
    });
});

export default router;