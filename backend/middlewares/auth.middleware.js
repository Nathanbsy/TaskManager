import { verifyToken } from "../modules/auth/auth.token.js";

export const verifyAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }

  req.usuario = decoded;
  next();
};

export const verifyAuthOptional = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    const decoded = verifyToken(token);
    if (decoded) {
      req.usuario = decoded;
    }
  }

  next();
};
