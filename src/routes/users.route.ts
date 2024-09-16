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

const router = Router();
router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", createUserValidation, createUser);
router.patch("/:id", updatedUserValidation, updateUser);
router.delete("/:id", deleteUserValidation, deleteUser);

export default router;
