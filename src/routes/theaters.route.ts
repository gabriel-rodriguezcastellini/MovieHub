import { Router } from "express";

import {
  createTheater,
  deleteTheater,
  getTheaterById,
  getAllTheaters,
  updateTheater,
} from "../controllers";

import { validateCreateTheater, validateUpdateTheater } from "../validations";

const router = Router();
router.get("/", getAllTheaters);
router.get("/:id", getTheaterById);
router.post("/", validateCreateTheater, createTheater);
router.patch("/:id", validateUpdateTheater, updateTheater);
router.delete("/:id", deleteTheater);

export default router;
