import { Router } from "express";

import {
  createScreen,
  deleteScreen,
  getScreenById,
  getAllScreens,
  updateScreen,
} from "../controllers";

import { validateCreateScreen, validateUpdateScreen } from "../validations";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();
router.get("/", getAllScreens);
router.get("/:id", getScreenById);
router.post("/", authMiddleware, validateCreateScreen, createScreen);
router.patch("/:id", authMiddleware, validateUpdateScreen, updateScreen);
router.delete("/:id", authMiddleware, deleteScreen);

export default router;
