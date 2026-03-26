import db from "../db/db.js";
import app from "../index.js";

// ============================================
// PROJETOS
// ============================================

// Criar Projeto
app.post("/projetos", (req, res) => {
    const { nome, chave, descricao, idEmpresa, idLider } = req.body;

    if (!nome || !chave || !idEmpresa) {
        return res.status(400).json({ error: "Nome, chave e empresa são obrigatórios" });
    }

    const q = "INSERT INTO Projeto (Nome, Chave, Descricao, IdEmpresa, IdLider, Ativo) VALUES (?, ?, ?, ?, ?, true)";
    
    db.getConnection((err, conexao) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [nome, chave, descricao, idEmpresa, idLider], (err, resultado) => {
            conexao.release();
            if (err) {
                console.error("Erro ao criar projeto:", err);
                if (err.code === "ER_DUP_ENTRY") {
                    return res.status(409).json({ error: "Chave do projeto já existe" });
                }
                return res.status(500).json({ error: "Erro ao criar projeto" });
            }
            res.status(201).json({ message: "Projeto criado com sucesso", id: resultado.insertId });
        });
    });
});

// Obter todos os projetos de uma empresa
app.get("/empresas/:idEmpresa/projetos", (req, res) => {
    const { idEmpresa } = req.params;
    const q = "SELECT p.*, u.Username as LiderNome FROM Projeto p LEFT JOIN Usuario u ON p.IdLider = u.Id WHERE p.IdEmpresa = ? AND p.Ativo = true";
    
    db.getConnection((err, conexao) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [idEmpresa], (err, resultado) => {
            conexao.release();
            if (err) {
                console.error("Erro ao buscar projetos:", err);
                return res.status(500).json({ error: "Erro ao buscar projetos" });
            }
            res.json(resultado);
        });
    });
});

// Obter projeto por ID
app.get("/projetos/:id", (req, res) => {
    const { id } = req.params;
    const q = "SELECT p.*, u.Username as LiderNome, e.NomeEmpresa FROM Projeto p LEFT JOIN Usuario u ON p.IdLider = u.Id LEFT JOIN Empresa e ON p.IdEmpresa = e.Id WHERE p.Id = ?";
    
    db.getConnection((err, conexao) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [id], (err, resultado) => {
            conexao.release();
            if (err) {
                console.error("Erro ao buscar projeto:", err);
                return res.status(500).json({ error: "Erro ao buscar projeto" });
            }
            if (resultado.length === 0) {
                return res.status(404).json({ error: "Projeto não encontrado" });
            }
            res.json(resultado[0]);
        });
    });
});

// Atualizar Projeto
app.put("/projetos/:id", (req, res) => {
    const { id } = req.params;
    const { nome, descricao, idLider } = req.body;

    const q = "UPDATE Projeto SET Nome = ?, Descricao = ?, IdLider = ? WHERE Id = ?";
    
    db.getConnection((err, conexao) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [nome, descricao, idLider, id], (err, resultado) => {
            conexao.release();
            if (err) {
                console.error("Erro ao atualizar projeto:", err);
                return res.status(500).json({ error: "Erro ao atualizar projeto" });
            }
            res.json({ message: "Projeto atualizado com sucesso" });
        });
    });
});

// Desativar Projeto
app.delete("/projetos/:id", (req, res) => {
    const { id } = req.params;
    const q = "UPDATE Projeto SET Ativo = false WHERE Id = ?";
    
    db.getConnection((err, conexao) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [id], (err, resultado) => {
            conexao.release();
            if (err) {
                console.error("Erro ao desativar projeto:", err);
                return res.status(500).json({ error: "Erro ao desativar projeto" });
            }
            res.json({ message: "Projeto desativado com sucesso" });
        });
    });
});

// ============================================
// MEMBROS DO PROJETO
// ============================================

// Adicionar membro ao projeto
app.post("/projetos/:idProjeto/membros", (req, res) => {
    const { idProjeto } = req.params;
    const { idUsuario, papel } = req.body;

    if (!idUsuario || !papel) {
        return res.status(400).json({ error: "Usuário e papel são obrigatórios" });
    }

    const q = "INSERT INTO Membro (IdProjeto, IdUsuario, Papel) VALUES (?, ?, ?)";
    
    db.getConnection((err, conexao) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [idProjeto, idUsuario, papel], (err, resultado) => {
            conexao.release();
            if (err) {
                console.error("Erro ao adicionar membro:", err);
                if (err.code === "ER_DUP_ENTRY") {
                    return res.status(409).json({ error: "Usuário já é membro do projeto" });
                }
                return res.status(500).json({ error: "Erro ao adicionar membro" });
            }
            res.status(201).json({ message: "Membro adicionado com sucesso" });
        });
    });
});

// Obter membros do projeto
app.get("/projetos/:idProjeto/membros", (req, res) => {
    const { idProjeto } = req.params;
    const q = "SELECT m.*, u.Username, u.Email FROM Membro m JOIN Usuario u ON m.IdUsuario = u.Id WHERE m.IdProjeto = ? ORDER BY m.Papel";
    
    db.getConnection((err, conexao) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [idProjeto], (err, resultado) => {
            conexao.release();
            if (err) {
                console.error("Erro ao buscar membros:", err);
                return res.status(500).json({ error: "Erro ao buscar membros" });
            }
            res.json(resultado);
        });
    });
});

// Atualizar papel do membro
app.put("/membros/:id", (req, res) => {
    const { id } = req.params;
    const { papel } = req.body;

    if (!papel) {
        return res.status(400).json({ error: "Papel é obrigatório" });
    }

    const q = "UPDATE Membro SET Papel = ? WHERE Id = ?";
    
    db.getConnection((err, conexao) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [papel, id], (err, resultado) => {
            conexao.release();
            if (err) {
                console.error("Erro ao atualizar membro:", err);
                return res.status(500).json({ error: "Erro ao atualizar membro" });
            }
            res.json({ message: "Membro atualizado com sucesso" });
        });
    });
});

// Remover membro do projeto
app.delete("/membros/:id", (req, res) => {
    const { id } = req.params;
    const q = "DELETE FROM Membro WHERE Id = ?";
    
    db.getConnection((err, conexao) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [id], (err, resultado) => {
            conexao.release();
            if (err) {
                console.error("Erro ao remover membro:", err);
                return res.status(500).json({ error: "Erro ao remover membro" });
            }
            res.json({ message: "Membro removido com sucesso" });
        });
    });
});
