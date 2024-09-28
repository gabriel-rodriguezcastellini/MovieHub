import { Router } from "express";

import {
  createScreen,
  deleteScreen,
  getScreenById,
  getAllScreens,
  updateScreen,
} from "../controllers";

import { validateCreateScreen, validateUpdateScreen } from "../validations";

const router = Router();
router.get("/", getAllScreens);
router.get("/:id", getScreenById);
router.post("/", validateCreateScreen, createScreen);
router.patch("/:id", validateUpdateScreen, updateScreen);
router.delete("/:id", deleteScreen);

export default router;
