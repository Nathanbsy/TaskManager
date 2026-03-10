import db from "../db/db.js";

//FUNCOES DOS STATUS

//Criar Status
app.post("/status", (req, res) => {
    const { nomeStatus, idEmpresa } = req.body;
    const q = "INSERT INTO StatusTask (NomeStatus) VALUES (?, ?)";
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
    const q = "UPDATE StatusTask SET NomeStatus = ? WHERE IdStatus = ? AND IdEmpresa = ?";
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
    const q = "call DeletarStatus(?)";
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