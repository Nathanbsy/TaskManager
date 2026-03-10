import db from "../db/db.js";

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