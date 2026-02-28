import express from "express";
import { deleteUser, getAllUsers, getUserById, updateUserRole } from "../controllers/user.controller.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
const router = express.Router();

router.get("/users",authMiddleware,authorizeRoles("admin"), getAllUsers);

router.get("/users/:id",authMiddleware,authorizeRoles("admin"), getUserById);

router.put("/users/:id/role",authMiddleware, authorizeRoles("admin"),updateUserRole);

router.delete("/users/:id",authMiddleware, authorizeRoles("admin"), deleteUser);

export default router;