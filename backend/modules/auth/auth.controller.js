import { registerUser, loginUser, refreshTokenUser, getCurrentUser } from "./auth.service.js";

export const register = (req, res) => {
  registerUser(req, res);
};

export const login = (req, res) => {
  loginUser(req, res);
};

export const refreshToken = (req, res) => {
  refreshTokenUser(req, res);
};

export const getCurrentUserData = (req, res) => {
  getCurrentUser(req, res);
};