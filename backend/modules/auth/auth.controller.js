import db from "../../db/db.js";
import app from "../../index.js";

//login
//código não finalizado, apenas para testes
app.post("/login", (req, res => {
    const { email, senha } = req.body;
    const q = "call Login(?, ?)";

    db.getConnection((err, conexao) => {
        if(err) return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });

        conexao.query(q, [email, senha], (err, resultado) => {
            conexao.release();
            if(err) {
                console.error("Ocorreu um erro ao realizar o login:", err)
                return res.status(500).json({ error: "Erro ao realizar o login" });
            }
            res.json({ message: "Login realizado com sucesso" });
        });
    });
}));