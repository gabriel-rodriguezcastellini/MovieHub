import { Router } from "express";

import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
  login,
} from "../controllers";

import {
  createUserValidation,
  deleteUserValidation,
  updatedUserValidation,
  validateLogin,
} from "../validations";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();
router.get("/", authMiddleware, getUsers);
router.get("/:id", getUser);
router.post("/", createUserValidation, createUser);
router.patch("/:id", authMiddleware, updatedUserValidation, updateUser);
router.delete("/:id", authMiddleware, deleteUserValidation, deleteUser);
router.post("/login", validateLogin, login);

export default router;
