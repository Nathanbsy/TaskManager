import express from "express";
import {
  register,
  login,
  refreshToken,
  getCurrentUserData,
} from "./auth.controller.js";
import { verifyAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Rotas públicas
router.post("/auth/register", register);
router.post("/auth/login", login);
router.post("/auth/refresh-token", refreshToken);

// Rotas protegidas
router.get("/auth/me", verifyAuth, getCurrentUserData);

export default router;
