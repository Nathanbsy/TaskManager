import db from "../db/db.js";
import app from "../index.js";

//FUNCOES DOS USUARIOS

//Criar Usuario
app.post("/usuario", (req, res) => {
    const { username, email, senha } = req.body;
    const q = "INSERT INTO Usuario (Username, Email, Senha) values (?, ?, ?)";
    db.getConnection((err, conexao) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [username, email, senha], (err, resultado) => {
            conexao.release();
            if (err) {
                console.error("Erro ao inserir usuário:", err);
                return res.status(500).json({ error: "Erro ao inserir usuário" });
            }
            res.json({ message: "Cadastro realizado com sucesso" });
        });
    });
});

//Selecionar Usuario
app.get("/usuario/:id", (req, res) => {
    const { id } = req.params;
    const q = "SELECT * FROM Usuario WHERE IdUsuario = ?";
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

//Alterar Usuario
app.put("/usuario/:id", (req, res) => {
    const { id } = req.params;
    const { username, email, senha } = req.body;
    const q = "UPDATE Usuario SET Username = ?, Email = ?, Senha = ? WHERE IdUsuario = ?";
    db.getConnection((err, conexao) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [username, email, senha, id], (err, resultado) => {
            conexao.release();
            if (err) {
                console.error("Erro ao atualizar usuário:", err);
                return res.status(500).json({ error: "Erro ao atualizar usuário" });
            }
            res.json({ message: "Usuário atualizado com sucesso" });
        });
    });
});

//Deletar Usuario
app.delete("/usuario/:id", (req, res) => {
    const { id } = req.params;
    const q = "call DeletarUsuario(?)";
    db.getConnection((err, conexao) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [id], (err, resultado) => {
            conexao.release();
            if (err) {
                console.error("Erro ao deletar usuário:", err);
                return res.status(500).json({ error: "Erro ao deletar usuário" });
            }
            res.json({ message: "Usuário deletado com sucesso" });
        });
    });
});