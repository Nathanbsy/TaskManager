import express from "express";
import mysql from "mysql";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 50
});

app.use(express.json());
app.use(cors());

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


//FUNCOES DAS TASKS

//Criar Task
app.post("/tasks", (req, res) => {
    const { tituloTask, descricaoTask, dataEntrega, idStatus, idEmpresa, idResponsavel, idCriador } = req.body;
    const q = "INSERT INTO Task (TituloTask, DescricaoTask, DataEntrega, IdStatus, IdEmpresa, IdResponsavel, IdCriador) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.getConnection((err, conexao) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [tituloTask, descricaoTask, dataEntrega, idStatus, idEmpresa, idResponsavel, idCriador], (err, resultado) => {
            conexao.release();
            if (err) {
                console.error("Erro ao inserir task:", err);
                return res.status(500).json({ error: "Erro ao inserir task" });
            }
        });
    });
});


//Selecionar todas as Tasks do usuario logado
app.get("/tasks", (req, res) => {
    const q = `SELECT * FROM Task WHERE IdResponsavel = ?`;
    db.getConnection((err, conexao) => {
        if (err) {
            console.error("Erro ao conectar ao banco de dados:", err);
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
            
        }
        conexao.query(q, [req.query.idResponsavel], (err, resultado) => {
            conexao.release();
            if (err) {
                console.error("Erro ao executar a consulta:", err);
                return res.status(500).json({ error: "Erro ao buscar tasks" });
            }
            res.json(resultado);
        });
    });
});

//Selecionar todas as Tasks da empresa do usuario logado
app.get("/tasks/empresa", (req, res) => {
    //Colocar paginacao depois
    const q = "SELECT * FROM Task WHERE IdEmpresa = ?";
    db.getConnection((err, conexao) => {
        if (err) {
            console.error("Erro ao conectar ao banco de dados:", err);
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [req.query.idEmpresa], (err, resultado) => {
            conexao.release();
            if (err) {
                console.error("Erro ao executar a consulta:", err);
                return res.status(500).json({ error: "Erro ao buscar tasks da empresa" });
            }
            res.json(resultado);
        });
    });
});

//Selecionar Task por ID
app.get("/tasks/:id", (req, res) => {
    const { id } = req.params;
    const q = "SELECT * FROM Task WHERE IdTask = ?";
    db.getConnection((err, conexao) => {
        if (err) {
            console.error("Erro ao conectar ao banco de dados:", err);
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [id], (err, resultado) => {
            conexao.release();
            if (err) {
                console.error("Erro ao executar a consulta:", err);
                return res.status(500).json({ error: "Erro ao buscar task por ID" });
            }
            res.json(resultado);
        });
    });
});

//depois adicionar filtros para Tasks

//Atualizar Task
app.put("/tasks/:id", (req, res) => {
    const { id } = req.params;
    const { tituloTask, descricaoTask, dataEntrega, idStatus, idResponsavel } = req.body;
    const q = "UPDATE Task SET TituloTask = ?, DescricaoTask = ?, DataEntrega = ?, IdStatus = ?, IdResponsavel = ? WHERE IdTask = ?";
    db.getConnection((err, conexao) => {
        if(err){
            console.error("Erro ao conectar ao banco de dados:", err);
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [tituloTask, descricaoTask, dataEntrega, idStatus, idResponsavel, id], (err, resultado) => {
            conexao.release();
            if(err){
                console.error("Erro ao atualizar task:", err);
                return res.status(500).json({ error: "Erro ao atualizar task" });
            }
            res.json({ message: "Task atualizada com sucesso" });
        });
    });
});

//Deletar Task
app.delete("/tasks/:id", (req, res) => {
    const { id } = req.params;
    const q = "call DeletarTask(?)";
    db.getConnection((err, conexao) => {
        if(err){
            console.error("Erro ao conectar ao banco de dados:", err);
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [id], (err, resultado) => {
            conexao.release();
            if(err){
                console.error("Erro ao deletar task:", err);
                return res.status(500).json({ error: "Erro ao deletar task" });
            }
            res.json({ message: "Task deletada com sucesso" });
        });
    });
});

//FUNCOES DOS STATUS

//Criar Status
app.post("/status", (req, res) => {
    const { nomeStatus, idEmpresa } = req.body;
    const q = "INSERT INTO Status (NomeStatus) VALUES (?, ?)";
    db.getConnection((err, conexao) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [nomeStatus, idEmpresa], (err, resultado) => {
            conexao.release();
            if (err) {
                console.error("Erro ao inserir status:", err);
                return res.status(500).json({ error: "Erro ao inserir status" });
            }
            res.json({ message: "Status criado com sucesso" });
        });
    });
});

//Atualizar Status
app.put("/status/:id", (req, res) => {
    const { id } = req.params;
    const { nomeStatus } = req.body;
    const q = "UPDATE Status SET NomeStatus = ? WHERE IdStatus = ?";
    db.getConnection((err, conexao) => {
        if(err){
            console.error("Erro ao conectar ao banco de dados:", err);
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [nomeStatus, id], (err, resultado) => {
            conexao.release();
            if(err){
                console.error("Erro ao atualizar status:", err);
                return res.status(500).json({ error: "Erro ao atualizar status" });
            }
            res.json({ message: "Status atualizado com sucesso" });
        });
    });
});

//Deletar Status
app.delete("/status/:id", (req, res) => {
    const { id } = req.params;
    const q = "DELETE FROM Status WHERE IdStatus = ?";
    db.getConnection((err, conexao) => {
        if(err){
            console.error("Erro ao conectar ao banco de dados:", err);
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });   
        }
        conexao.query(q, [id], (err, resultado) => {
            conexao.release();
            if(err){
                console.error("Erro ao deletar status:", err);
                return res.status(500).json({ error: "Erro ao deletar status" });
            }
            res.json({ message: "Status deletado com sucesso" });
        });
    });
});

app.listen(8080, () => {
    console.log("Servidor rodando na porta 8080");
});