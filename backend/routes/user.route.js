import express from "express";
import { deleteUser, getAllUsers, getUserById, updateUserRole } from "../controllers/user.controller.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/users",protect,authorizeRoles("admin"), getAllUsers);

router.get("/users/:id",protect,authorizeRoles("admin"), getUserById);

router.put("/users/:id/role",protect, authorizeRoles("admin"),updateUserRole);

router.delete("/users/:id",protect, authorizeRoles("admin"), deleteUser);

export default router;