import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "token";

export const generateToken = (usuario) => {
  const payload = {
    id: usuario.Id,
    email: usuario.Email,
    username: usuario.Username,
    tipo: usuario.Tipo,
  };

  return jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
};

export const generateRefreshToken = (usuario) => {
  const payload = {
    id: usuario.Id,
  };

  return jwt.sign(payload, SECRET_KEY, { expiresIn: "7d" });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
};

export const decodeToken = (token) => {
  try {
    return jwt.decode(token, { complete: true });
  } catch (error) {
    return null;
  }
};
