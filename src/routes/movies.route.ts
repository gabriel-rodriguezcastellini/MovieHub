import { Router } from "express";

import {
  createMovie,
  deleteMovie,
  getMovieById,
  getMovies,
  updateMovie,
} from "../controllers";

import {
  createMovieValidation,
  deleteMovieValidation,
  updateMovieValidation,
  getMovieValidation,
} from "../validations";

const router = Router();
router.get("/", getMovies);
router.get("/:id", getMovieById, getMovieValidation);
router.post("/", createMovieValidation, createMovie);
router.patch("/:id", updateMovieValidation, updateMovie);
router.delete("/:id", deleteMovieValidation, deleteMovie);

export default router;
