import { Router } from "express";
import { deleteUser, getAllUsers } from "../controllers/users.controller.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
export const userRoutes = Router();

// TODO: proteger las rutas con middlewares de autenticación y autorización faltantes

// * traer todos los usuarios (usuario autenticado que sea admin)
userRoutes.get("/users", adminMiddleware, getAllUsers);

// * eliminar un usuario por id (usuario autenticado que sea admin)
userRoutes.delete("/users/:id", adminMiddleware, deleteUser);
