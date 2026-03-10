import db from "../db/db.js";

//FUNCOES DAS EMPRESAS

//Criar Empresa
app.post("/empresas", (req, res) => {
    const { username, email, senha, nomeEmpresa, cnpj, idUsuario } = req.body;
    const q = "call CadastrarEmpresa(?, ?, ?, ?, ?, ?)";
    db.getConnection((err, conexao) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [username, email, senha, nomeEmpresa, cnpj, idUsuario], (err, resultado) => {
            conexao.release();
            if (err) {
                console.error("Erro ao inserir empresa:", err);
                return res.status(500).json({ error: "Erro ao inserir empresa" });
            }
            res.json({ message: "Cadastro realizado com sucesso, por favor faça login" });
        });
    });
});

//Selecionar Empresa
app.get("/empresas/:id", (req, res) => {
    const { id } = req.params;
    const q = "SELECT * FROM Empresa WHERE IdEmpresa = ?";
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
            res.json(resultado);
        });
    });
});

//Alterar Empresa
app.put("/empresas/:id", (req, res) => {
    //Depois adicionar validação de Id do usuário logado para evitar que um usuário de uma empresa possa alterar os dados de outra empresa
    const { id, idLogado } = req.params;
    const { username, nomeEmpresa, cnpj } = req.body;
    const q = "call AlterarEmpresa(?, ?, ?, ?)";
    db.getConnection((err, conexao) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [id, username, nomeEmpresa, cnpj], (err, resultado) => {
            conexao.release();
            if (err) {
                console.error("Erro ao alterar empresa:", err);
                return res.status(500).json({ error: "Erro ao alterar empresa" });
            }
            res.json({ message: "Empresa alterada com sucesso" });
        });
    });
});