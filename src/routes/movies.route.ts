import { Router } from "express";

import {
  createMovie,
  deleteMovie,
  getMovieById,
  getMovies,
  getVisibleMovies,
  updateMovie,
} from "../controllers";

import {
  createMovieValidation,
  deleteMovieValidation,
  updateMovieValidation,
  getMovieValidation,
} from "../validations";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();
router.get("/", authMiddleware, getMovies);
router.get("/visible", getVisibleMovies);
router.get("/:id", getMovieById, getMovieValidation);
router.post("/", authMiddleware, createMovieValidation, createMovie);
router.patch("/:id", authMiddleware, updateMovieValidation, updateMovie);
router.delete("/:id", authMiddleware, deleteMovieValidation, deleteMovie);

export default router;
