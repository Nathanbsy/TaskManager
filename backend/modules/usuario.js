import db from "../db/db.js";
import app from "../index.js";

//FUNCOES DOS USUARIOS

//Selecionar Usuario por ID
app.get("/usuario/:id", (req, res) => {
    const { id } = req.params;
    const q = "SELECT Id, Username, Email, NomeCompleto, Avatar, Tipo, Ativo, DataCriacao FROM Usuario WHERE Id = ?";
    db.getConnection((err, conexao) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [id], (err, resultado) => {
            conexao.release();
            if (err) {
                console.error("Erro ao buscar usuário:", err);
                return res.status(500).json({ error: "Erro ao buscar usuário" });
            }
            res.json(resultado);
        });
    });
});

//Buscar todos os usuários
app.get("/usuarios", (req, res) => {
    const q = "SELECT Id, Username, Email, NomeCompleto, Avatar, Tipo, Ativo, DataCriacao FROM Usuario WHERE Ativo = true";
    db.getConnection((err, conexao) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [], (err, resultado) => {
            conexao.release();
            if (err) {
                console.error("Erro ao buscar usuários:", err);
                return res.status(500).json({ error: "Erro ao buscar usuários" });
            }
            res.json(resultado);
        });
    });
});

//Atualizar perfil do Usuario
app.put("/usuario/:id", (req, res) => {
    const { id } = req.params;
    const { nomeCompleto, avatar } = req.body;
    const q = "UPDATE Usuario SET NomeCompleto = ?, Avatar = ? WHERE Id = ?";
    db.getConnection((err, conexao) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [nomeCompleto, avatar, id], (err, resultado) => {
            conexao.release();
            if (err) {
                console.error("Erro ao atualizar usuário:", err);
                return res.status(500).json({ error: "Erro ao atualizar usuário" });
            }
            res.json({ message: "Usuário atualizado com sucesso" });
        });
    });
});

//Atualizar email do Usuario
app.put("/usuario/:id/email", (req, res) => {
    const { id } = req.params;
    const { email } = req.body;
    
    if (!email) {
        return res.status(400).json({ error: "Email é obrigatório" });
    }

    const q = "UPDATE Usuario SET Email = ? WHERE Id = ?";
    db.getConnection((err, conexao) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [email, id], (err, resultado) => {
            conexao.release();
            if (err) {
                if (err.code === "ER_DUP_ENTRY") {
                    return res.status(409).json({ error: "Este email já está cadastrado" });
                }
                console.error("Erro ao atualizar email:", err);
                return res.status(500).json({ error: "Erro ao atualizar email" });
            }
            res.json({ message: "Email atualizado com sucesso" });
        });
    });
});

//Desativar Usuario
app.delete("/usuario/:id", (req, res) => {
    const { id } = req.params;
    const q = "UPDATE Usuario SET Ativo = false WHERE Id = ?";
    db.getConnection((err, conexao) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [id], (err, resultado) => {
            conexao.release();
            if (err) {
                console.error("Erro ao desativar usuário:", err);
                return res.status(500).json({ error: "Erro ao desativar usuário" });
            }
            res.json({ message: "Usuário desativado com sucesso" });
        });
    });
});