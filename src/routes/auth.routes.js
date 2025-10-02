import { Router } from "express";
import {
  login,
  logout,
  getProfile,
  register,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const authRoutes = Router();

// TODO: proteger las rutas con middlewares de autenticación y autorización faltantes (si fuera necesario)

// * registrar un usuario (publico)
authRoutes.post("/auth/register", register);

// * loguearse (publico)
authRoutes.post("/auth/login", login);

// * obtener perfil (usuario autenticado)
authRoutes.get("/auth/profile", authMiddleware, getProfile);

// * cerrar sesión (usuario autenticado)
authRoutes.post("/auth/logout", authMiddleware, logout);
