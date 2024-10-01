import { Router } from "express";

import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers";

import {
  createUserValidation,
  deleteUserValidation,
  updatedUserValidation,
} from "../validations";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();
router.get("/", authMiddleware, getUsers);
router.get("/:id", getUser);
router.post("/", createUserValidation, createUser);
router.patch("/:id", authMiddleware, updatedUserValidation, updateUser);
router.delete("/:id", authMiddleware, deleteUserValidation, deleteUser);

export default router;
