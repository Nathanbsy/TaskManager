import db from "../db/db.js";

//FUNCOES DOS USUARIOS

//Criar Usuario
app.post("/usuarios", (req, res) => {
    const { username, email, senha } = req.body;
    const q = "call CadastrarUsuario(?, ?, ?)";
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
            res.json({ message: "Cadastro realizado com sucesso, por favor faça login" });
        });
    });
});

//Selecionar Usuario
app.get("/usuarios/:id", (req, res) => {
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
app.put("/usuarios/:id", (req, res) => {
    const { id } = req.params;
    const { username, email, senha } = req.body;
    const q = "call AlterarUsuario(?, ?, ?, ?)";
    db.getConnection((err, conexao) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [id, username, email, senha], (err, resultado) => {
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
app.delete("/usuarios/:id", (req, res) => {
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