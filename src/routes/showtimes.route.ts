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

const router = Router();
router.get("/", getAllShowtimes);
router.get("/:id", getShowtimeById);
router.post("/", validateCreateShowtime, createShowtime);
router.patch("/:id", validateUpdateShowtime, updateShowtime);
router.delete("/:id", validateDeleteShowtime, deleteShowtime);

export default router;
