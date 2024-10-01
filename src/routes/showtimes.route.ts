import { Router } from "express";

import {
  createShowtime,
  deleteShowtime,
  getShowtimeById,
  getAllShowtimes,
  updateShowtime,
} from "../controllers";

import {
  validateCreateShowtime,
  validateDeleteShowtime,
  validateUpdateShowtime,
} from "../validations";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();
router.get("/", getAllShowtimes);
router.get("/:id", getShowtimeById);
router.post("/", authMiddleware, validateCreateShowtime, createShowtime);
router.patch("/:id", authMiddleware, validateUpdateShowtime, updateShowtime);
router.delete("/:id", authMiddleware, validateDeleteShowtime, deleteShowtime);

export default router;
