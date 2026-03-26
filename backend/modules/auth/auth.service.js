import db from "../../db/db.js";
import bcrypt from "bcryptjs";
import { generateToken, generateRefreshToken, verifyToken } from "./auth.token.js";

export const registerUser = (req, res) => {
  const { username, email, senha } = req.body;

  // Validações
  if (!username || !email || !senha) {
    return res.status(400).json({ error: "Username, email e senha são obrigatórios" });
  }

  if (senha.length < 6) {
    return res.status(400).json({ error: "A senha deve ter pelo menos 6 caracteres" });
  }

  // Criptografar senha
  const salt = bcrypt.genSaltSync(10);
  const senhaHash = bcrypt.hashSync(senha, salt);

  const q = "INSERT INTO Usuario (Username, Email, Senha, Tipo) VALUES (?, ?, ?, 'Colaborador')";

  db.getConnection((err, conexao) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
    }

    conexao.query(q, [username, email, senhaHash], (err, resultado) => {
      conexao.release();

      if (err) {
        console.error("Erro ao inserir usuário:", err);
        
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(409).json({ error: "Email ou username já cadastrado" });
        }
        
        return res.status(500).json({ error: "Erro ao registrar usuário" });
      }

      // Buscar o usuário criado para retornar com token
      //talvez consertar essa query colocando um limite de 1
      const selectQ = "SELECT Id, Username, Email, Tipo FROM Usuario WHERE Email = ? LIMIT 1";
      db.getConnection((err, conexao) => {
        if (err) {
          return res.status(500).json({ error: "Erro ao buscar usuário" });
        }

        conexao.query(selectQ, [email], (err, usuario) => {
          conexao.release();

          if (err || !usuario || usuario.length === 0) {
            return res.status(500).json({ error: "Erro ao buscar usuário criado" });
          }

          const token = generateToken(usuario);
          const refreshToken = generateRefreshToken(usuario);

          res.status(201).json({
            message: "Usuário registrado com sucesso",
            usuario: {
              id: usuario.Id,
              username: usuario.Username,
              email: usuario.Email,
              tipo: usuario.Tipo,
            },
            token,
            refreshToken,
          });
        });
      });
    });
  });
};

export const loginUser = (req, res) => {
  const { email, senha } = req.body;

  // Validações
  if (!email || !senha) {
    return res.status(400).json({ error: "Email e senha são obrigatórios" });
  }

  const q = "SELECT * FROM Usuario WHERE Email = ?";

  db.getConnection((err, conexao) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
    }

    conexao.query(q, [email], (err, usuarios) => {
      conexao.release();

      if (err) {
        console.error("Erro ao buscar usuário:", err);
        return res.status(500).json({ error: "Erro ao fazer login" });
      }

      if (usuarios.length === 0) {
        return res.status(401).json({ error: "Email ou senha incorretos" });
      }

      const usuario = usuarios[0];

      // Comparar senhas
      const senhaValida = bcrypt.compareSync(senha, usuario.Senha);

      if (!senhaValida) {
        return res.status(401).json({ error: "Email ou senha incorretos" });
      }

      // Gerar tokens
      const token = generateToken(usuario);
      const refreshToken = generateRefreshToken(usuario);

      res.json({
        message: "Login realizado com sucesso",
        usuario: {
          id: usuario.Id,
          username: usuario.Username,
          email: usuario.Email,
          tipo: usuario.Tipo,
        },
        token,
        refreshToken,
      });
    });
  });
};

export const refreshTokenUser = (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ error: "Refresh token é obrigatório" });
  }

  const decoded = verifyToken(refreshToken);

  if (!decoded) {
    return res.status(401).json({ error: "Refresh token inválido ou expirado" });
  }

  const q = "SELECT Id, Username, Email, Tipo FROM Usuario WHERE Id = ? LIMIT 1";

  db.getConnection((err, conexao) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
    }

    conexao.query(q, [decoded.id], (err, usuario) => {
      conexao.release();

      if (err || !usuario || usuario.length === 0) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      const novoToken = generateToken(usuario);

      res.json({
        token: novoToken,
      });
    });
  });
};

export const getCurrentUser = (req, res) => {
  const q = "SELECT Id, Username, Email, Tipo, IdEmpresa FROM Usuario WHERE Id = ?";

  db.getConnection((err, conexao) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
    }

    conexao.query(q, [req.usuario.id], (err, usuario) => {
      conexao.release();

      if (err || !usuario || usuario.length === 0) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      res.json({
        usuario: {
          id: usuario.Id,
          username: usuario.Username,
          email: usuario.Email,
          tipo: usuario.Tipo,
          empresaId: usuario.IdEmpresa,
        },
      });
    });
  });
};
