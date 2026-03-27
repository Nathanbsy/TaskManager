import { Router } from "express";
import db from "../db/db.js";

const router = Router();

//FUNCOES DOS STATUS

//Criar Status
router.post("/projetos/:idProjeto/status", (req, res) => {
    const { idProjeto } = req.params;
    const { nome, categoria, ordem, cor } = req.body;

    if (!nome) {
        return res.status(400).json({ error: "Nome do status é obrigatório" });
    }

    const q = "INSERT INTO Status (IdProjeto, Nome, Categoria, Ordem, Cor) VALUES (?, ?, ?, ?, ?)";
    db.getConnection((err, conexao) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [idProjeto, nome, categoria, ordem, cor], (err, resultado) => {
            conexao.release();
            if (err) {
                console.error("Erro ao inserir status:", err);
                if (err.code === "ER_DUP_ENTRY") {
                    return res.status(409).json({ error: "Status com este nome já existe neste projeto" });
                }
                return res.status(500).json({ error: "Erro ao inserir status" });
            }
            res.status(201).json({ message: "Status criado com sucesso", id: resultado.insertId });
        });
    });
});

//Obter Status do Projeto
router.get("/projetos/:idProjeto/status", (req, res) => {
    const { idProjeto } = req.params;
    const q = "SELECT * FROM Status WHERE IdProjeto = ? OR IdProjeto IS NULL ORDER BY Ordem";
    db.getConnection((err, conexao) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [idProjeto], (err, resultado) => {
            conexao.release();
            if (err) {
                console.error("Erro ao buscar status:", err);
                return res.status(500).json({ error: "Erro ao buscar status" });
            }
            res.json(resultado);
        });
    });
});

//Atualizar Status
router.put("/status/:id", (req, res) => {
    const { id } = req.params;
    const { nome, categoria, ordem, cor } = req.body;
    const q = "UPDATE Status SET Nome = ?, Categoria = ?, Ordem = ?, Cor = ? WHERE Id = ?";
    db.getConnection((err, conexao) => {
        if (err) {
            console.error("Erro ao conectar ao banco de dados:", err);
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [nome, categoria, ordem, cor, id], (err, resultado) => {
            conexao.release();
            if (err) {
                console.error("Erro ao atualizar status:", err);
                return res.status(500).json({ error: "Erro ao atualizar status" });
            }
            res.json({ message: "Status atualizado com sucesso" });
        });
    });
});

//Deletar Status
router.delete("/status/:id", (req, res) => {
    const { id } = req.params;
    const q = "DELETE FROM Status WHERE Id = ?";
    db.getConnection((err, conexao) => {
        if (err) {
            console.error("Erro ao conectar ao banco de dados:", err);
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });   
        }
        conexao.query(q, [id], (err, resultado) => {
            conexao.release();
            if (err) {
                console.error("Erro ao deletar status:", err);
                return res.status(500).json({ error: "Erro ao deletar status" });
            }
            res.json({ message: "Status deletado com sucesso" });
        });
    });
});

export default router;