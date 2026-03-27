import { Router } from "express";
import db from "../db/db.js";

const router = Router();

// Criar Issue
router.post("/projetos/:idProjeto/issues", (req, res) => {
    const { idProjeto } = req.params;
    const { titulo, descricao, idTipoIssue, idPrioridade, idStatus, idResponsavel, idEpic, idSprint, estimativaHoras, dataVencimento } = req.body;

    if (!titulo || !idTipoIssue || !idPrioridade || !idStatus) {
        return res.status(400).json({ error: "Título, tipo, prioridade e status são obrigatórios" });
    }

    // Gerar chave da issue (PROJ-001)
    const getChaveQ = "SELECT COUNT(*) as total FROM Issue WHERE IdProjeto = ?";
    
    db.getConnection((err, conexao) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }

        conexao.query(getChaveQ, [idProjeto], (err, result) => {
            if (err) {
                conexao.release();
                return res.status(500).json({ error: "Erro ao gerar chave" });
            }

            const chaveNumero = result[0].total + 1;
            
            // Buscar chave do projeto
            const getProjQ = "SELECT Chave FROM Projeto WHERE Id = ?";
            conexao.query(getProjQ, [idProjeto], (err, projetos) => {
                if (err || projetos.length === 0) {
                    conexao.release();
                    return res.status(500).json({ error: "Erro ao buscar projeto" });
                }

                const chave = `${projetos[0].Chave}-${chaveNumero}`;
                
                const q = `INSERT INTO Issue (IdProjeto, Chave, Titulo, Descricao, IdTipoIssue, IdPrioridade, IdStatus, IdCriador, IdResponsavel, IdEpic, IdSprint, EstimativaHoras, DataVencimento) 
                          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
                
                conexao.query(q, [idProjeto, chave, titulo, descricao, idTipoIssue, idPrioridade, idStatus, req.usuario.id, idResponsavel, idEpic, idSprint, estimativaHoras, dataVencimento], (err, resultado) => {
                    conexao.release();
                    if (err) {
                        console.error("Erro ao criar issue:", err);
                        return res.status(500).json({ error: "Erro ao criar issue" });
                    }
                    res.status(201).json({ message: "Issue criada com sucesso", chave, id: resultado.insertId });
                });
            });
        });
    });
});

// Obter todas as issues do projeto
router.get("/projetos/:idProjeto/issues", (req, res) => {
    const { idProjeto } = req.params;
    const { idStatus, idResponsavel, idSprint, idEpic } = req.query;

    let q = `SELECT i.*, t.Nome as TipoName, p.Nome as PrioridadeName, s.Nome as StatusName, 
             u1.Username as CriadorName, u2.Username as ResponsavelName
             FROM Issue i 
             JOIN TipoIssue t ON i.IdTipoIssue = t.Id 
             JOIN Prioridade p ON i.IdPrioridade = p.Id 
             JOIN Status s ON i.IdStatus = s.Id 
             JOIN Usuario u1 ON i.IdCriador = u1.Id 
             LEFT JOIN Usuario u2 ON i.IdResponsavel = u2.Id 
             WHERE i.IdProjeto = ?`;

    let params = [idProjeto];

    if (idStatus) {
        q += " AND i.IdStatus = ?";
        params.push(idStatus);
    }
    if (idResponsavel) {
        q += " AND i.IdResponsavel = ?";
        params.push(idResponsavel);
    }
    if (idSprint) {
        q += " AND i.IdSprint = ?";
        params.push(idSprint);
    }
    if (idEpic) {
        q += " AND i.IdEpic = ?";
        params.push(idEpic);
    }

    q += " ORDER BY i.DataCriacao DESC";

    db.getConnection((err, conexao) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, params, (err, resultado) => {
            conexao.release();
            if (err) {
                console.error("Erro ao buscar issues:", err);
                return res.status(500).json({ error: "Erro ao buscar issues" });
            }
            res.json(resultado);
        });
    });
});

// Obter issue por ID
router.get("/issues/:id", (req, res) => {
    const { id } = req.params;
    const q = `SELECT i.*, t.Nome as TipoName, p.Nome as PrioridadeName, s.Nome as StatusName,
               u1.Username as CriadorName, u1.Email as CriadorEmail,
               u2.Username as ResponsavelName, u2.Email as ResponsavelEmail
               FROM Issue i 
               JOIN TipoIssue t ON i.IdTipoIssue = t.Id 
               JOIN Prioridade p ON i.IdPrioridade = p.Id 
               JOIN Status s ON i.IdStatus = s.Id 
               JOIN Usuario u1 ON i.IdCriador = u1.Id 
               LEFT JOIN Usuario u2 ON i.IdResponsavel = u2.Id 
               WHERE i.Id = ?`;

    db.getConnection((err, conexao) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [id], (err, resultado) => {
            conexao.release();
            if (err) {
                console.error("Erro ao buscar issue:", err);
                return res.status(500).json({ error: "Erro ao buscar issue" });
            }
            if (resultado.length === 0) {
                return res.status(404).json({ error: "Issue não encontrada" });
            }
            
            // Incrementar visualizações
            const updateQ = "UPDATE Issue SET Visualizacoes = Visualizacoes + 1 WHERE Id = ?";
            db.getConnection((err, conexao2) => {
                if (!err) {
                    conexao2.query(updateQ, [id], () => conexao2.release());
                }
            });

            res.json(resultado[0]);
        });
    });
});

// Atualizar Issue
router.put("/issues/:id", (req, res) => {
    const { id } = req.params;
    const { titulo, descricao, idTipoIssue, idPrioridade, idStatus, idResponsavel, idEpic, idSprint, estimativaHoras, tempoGastoHoras, dataVencimento } = req.body;

    const q = `UPDATE Issue SET 
               Titulo = ?, Descricao = ?, IdTipoIssue = ?, IdPrioridade = ?, IdStatus = ?, 
               IdResponsavel = ?, IdEpic = ?, IdSprint = ?, EstimativaHoras = ?, 
               TempoGastoHoras = ?, DataVencimento = ?, DataAtualizacao = NOW() 
               WHERE Id = ?`;

    db.getConnection((err, conexao) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [titulo, descricao, idTipoIssue, idPrioridade, idStatus, idResponsavel, idEpic, idSprint, estimativaHoras, tempoGastoHoras, dataVencimento, id], (err, resultado) => {
            conexao.release();
            if (err) {
                console.error("Erro ao atualizar issue:", err);
                return res.status(500).json({ error: "Erro ao atualizar issue" });
            }
            res.json({ message: "Issue atualizada com sucesso" });
        });
    });
});

// Deletar Issue
router.delete("/issues/:id", (req, res) => {
    const { id } = req.params;
    const q = "DELETE FROM Issue WHERE Id = ?";

    db.getConnection((err, conexao) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [id], (err, resultado) => {
            conexao.release();
            if (err) {
                console.error("Erro ao deletar issue:", err);
                return res.status(500).json({ error: "Erro ao deletar issue" });
            }
            res.json({ message: "Issue deletada com sucesso" });
        });
    });
});

// ============================================
// EPICS
// ============================================

// Criar Epic
router.post("/projetos/:idProjeto/epics", (req, res) => {
    const { idProjeto } = req.params;
    const { nome, descricao, idResponsavel, dataInicio, dataFim } = req.body;

    if (!nome) {
        return res.status(400).json({ error: "Nome do epic é obrigatório" });
    }

    const q = "INSERT INTO Epic (IdProjeto, Nome, Descricao, IdResponsavel, DataInicio, DataFim) VALUES (?, ?, ?, ?, ?, ?)";

    db.getConnection((err, conexao) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [idProjeto, nome, descricao, idResponsavel, dataInicio, dataFim], (err, resultado) => {
            conexao.release();
            if (err) {
                console.error("Erro ao criar epic:", err);
                return res.status(500).json({ error: "Erro ao criar epic" });
            }
            res.status(201).json({ message: "Epic criado com sucesso", id: resultado.insertId });
        });
    });
});

// Obter epics do projeto
router.get("/projetos/:idProjeto/epics", (req, res) => {
    const { idProjeto } = req.params;
    const q = `SELECT e.*, u.Username as ResponsavelName, COUNT(i.Id) as TotalIssues 
               FROM Epic e 
               LEFT JOIN Usuario u ON e.IdResponsavel = u.Id 
               LEFT JOIN Issue i ON e.Id = i.IdEpic 
               WHERE e.IdProjeto = ? 
               GROUP BY e.Id 
               ORDER BY e.DataCriacao DESC`;

    db.getConnection((err, conexao) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [idProjeto], (err, resultado) => {
            conexao.release();
            if (err) {
                console.error("Erro ao buscar epics:", err);
                return res.status(500).json({ error: "Erro ao buscar epics" });
            }
            res.json(resultado);
        });
    });
});

// ============================================
// SPRINTS
// ============================================

// Criar Sprint
router.post("/projetos/:idProjeto/sprints", (req, res) => {
    const { idProjeto } = req.params;
    const { nome, descricao, dataInicio, dataFim, objetivo } = req.body;

    if (!nome) {
        return res.status(400).json({ error: "Nome da sprint é obrigatório" });
    }

    const q = "INSERT INTO Sprint (IdProjeto, Nome, Descricao, DataInicio, DataFim, Objetivo) VALUES (?, ?, ?, ?, ?, ?)";

    db.getConnection((err, conexao) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [idProjeto, nome, descricao, dataInicio, dataFim, objetivo], (err, resultado) => {
            conexao.release();
            if (err) {
                console.error("Erro ao criar sprint:", err);
                return res.status(500).json({ error: "Erro ao criar sprint" });
            }
            res.status(201).json({ message: "Sprint criada com sucesso", id: resultado.insertId });
        });
    });
});

// Obter sprints do projeto
router.get("/projetos/:idProjeto/sprints", (req, res) => {
    const { idProjeto } = req.params;
    const q = `SELECT s.*, COUNT(i.Id) as TotalIssues, SUM(i.EstimativaHoras) as TotalHoras 
               FROM Sprint s 
               LEFT JOIN Issue i ON s.Id = i.IdSprint 
               WHERE s.IdProjeto = ? 
               GROUP BY s.Id 
               ORDER BY s.DataInicio DESC`;

    db.getConnection((err, conexao) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }
        conexao.query(q, [idProjeto], (err, resultado) => {
            conexao.release();
            if (err) {
                console.error("Erro ao buscar sprints:", err);
                return res.status(500).json({ error: "Erro ao buscar sprints" });
            }
            res.json(resultado);
        });
    });
});

export default router;
