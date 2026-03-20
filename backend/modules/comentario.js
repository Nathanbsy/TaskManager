import db from "../db/db.js";
import app from "../index.js";

//FUNCOES DOS COMENTARIOS

//Criar Comentário
app.post("/comentarios", (req, res) => {
    const { textoComentario, idTarefa, idUsuario } = req.body;
    const q = "INSERT INTO Comentario (Texto, IdTask, IdUsuario) VALUES (?, ?, ?)";
    db.getConnection((err, conexao) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [textoComentario, idTarefa, idUsuario], (err, resultado) => {
            conexao.release();
            if (err) {
                console.error("Erro ao inserir comentário:", err);
                return res.status(500).json({ error: "Erro ao inserir comentário" });
            }
            res.json({ message: "Comentário criado com sucesso" });
        });
    });
});

//Deletar Comentário
app.delete("/comentarios/:id", (req, res) => {
    const { id } = req.params;
    const q = "DELETE FROM Comentario WHERE IdComentario = ?";
    db.getConnection((err, conexao) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [id], (err, resultado) => {
            conexao.release();
            if (err) {
                console.error("Erro ao deletar comentário:", err);
                return res.status(500).json({ error: "Erro ao deletar comentário" });
            }
            res.json({ message: "Comentário deletado com sucesso" });
        });
    });
});

//Selecionar Comentários por Tarefa
app.get("/comentarios/tarefa/:idTarefa", (req, res) => {
    const { idTarefa } = req.params;
    const q = "SELECT c.IdComentario, c.TextoComentario, c.IdTarefa, c.IdUsuario, u.Username FROM Comentario c JOIN Usuario u ON c.IdUsuario = u.IdUsuario WHERE c.IdTarefa = ?";
    db.getConnection((err, conexao) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [idTarefa], (err, resultado) => {
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
app.put("/comentarios/:id", (req, res) => {
    const { id } = req.params;
    const { textoComentario } = req.body;
    const q = "UPDATE Comentario SET TextoComentario = ? WHERE IdComentario = ?";
    db.getConnection((err, conexao) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [textoComentario, id], (err, resultado) => {
            conexao.release();
            if (err) {
                console.error("Erro ao atualizar comentário:", err);
                return res.status(500).json({ error: "Erro ao atualizar comentário" });
            }
            res.json({ message: "Comentário atualizado com sucesso" });
        });
    });
});

