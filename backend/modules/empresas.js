import { Router } from "express";
import db from "../db/db.js";

const router = Router();

//FUNCOES DAS EMPRESAS

//Selecionar Empresa
router.get("/empresas/:id", (req, res) => {
    const { id } = req.params;
    const q = "SELECT e.*, u.Username as AdministradorName, u.Email as AdministradorEmail FROM Empresa e LEFT JOIN Usuario u ON e.IdAdministrador = u.Id WHERE e.Id = ?";
    db.getConnection((err, conexao) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [id], (err, resultado) => {
            conexao.release();
            if (err) {
                console.error("Erro ao buscar empresa:", err);
                return res.status(500).json({ error: "Erro ao buscar empresa" });
            }
            if (resultado.length === 0) {
                return res.status(404).json({ error: "Empresa não encontrada" });
            }
            res.json(resultado[0]);
        });
    });
});

//Buscar todas as empresas
router.get("/empresas", (req, res) => {
    const q = "SELECT e.*, u.Username as AdministradorName FROM Empresa e LEFT JOIN Usuario u ON e.IdAdministrador = u.Id WHERE e.Ativo = true";
    db.getConnection((err, conexao) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [], (err, resultado) => {
            conexao.release();
            if (err) {
                console.error("Erro ao buscar empresas:", err);
                return res.status(500).json({ error: "Erro ao buscar empresas" });
            }
            res.json(resultado);
        });
    });
});

//Alterar Empresa
router.put("/empresas/:id", (req, res) => {
    const { id } = req.params;
    const { nomeEmpresa, idAdministrador } = req.body;
    const q = "UPDATE Empresa SET NomeEmpresa = ?, IdAdministrador = ? WHERE Id = ?";
    db.getConnection((err, conexao) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [nomeEmpresa, idAdministrador, id], (err, resultado) => {
            conexao.release();
            if (err) {
                console.error("Erro ao alterar empresa:", err);
                return res.status(500).json({ error: "Erro ao alterar empresa" });
            }
            res.json({ message: "Empresa alterada com sucesso" });
        });
    });
});

//Desativar Empresa
router.delete("/empresas/:id", (req, res) => {
    const { id } = req.params;
    const q = "UPDATE Empresa SET Ativo = false WHERE Id = ?";
    db.getConnection((err, conexao) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [id], (err, resultado) => {
            conexao.release();
            if (err) {
                console.error("Erro ao desativar empresa:", err);
                return res.status(500).json({ error: "Erro ao desativar empresa" });
            }
            res.json({ message: "Empresa desativada com sucesso" });
        });
    });
});

export default router;