import { Request, Response } from "express";
import { Movie } from "../models";

export const getMovies = async (
  _req: Request,
  res: Response
): Promise<Response> => {
  try {
    const movies = await Movie.find();
    return res.status(200).json(movies);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching movies", error });
  }
};

export const getVisibleMovies = async (
  _req: Request,
  res: Response
): Promise<Response> => {
  try {
    const movies = await Movie.find({ isVisible: true });
    return res.status(200).json(movies);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching movies", error });
  }
};

export const getMovieById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const movie = await Movie.findById(req.params.id)
      .select("_id title description imageUrl isVisible")
      .lean();

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    if (!movie.isVisible && !req.headers.authorization) {
      return res.status(403).json({ message: "Access denied" });
    }

    return res.status(200).json(movie);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching movie", error });
  }
};

export const createMovie = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { title, description, imageUrl, isVisible } = req.body;

    const existingMovie = await Movie.findOne({ title });
    if (existingMovie) {
      return res
        .status(400)
        .json({ message: "Movie with this title already exists" });
    }

    const newMovie = new Movie({ title, description, imageUrl, isVisible });
    const savedMovie = await newMovie.save();
    return res.status(201).json(savedMovie);
  } catch (error) {
    return res.status(500).json({ message: "Error creating movie", error });
  }
};

export const updateMovie = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { title, description, imageUrl, isVisible } = req.body;

    const existingMovie = await Movie.findOne({ title });
    if (
      existingMovie &&
      (existingMovie as { _id: string })._id.toString() !== req.params.id
    ) {
      return res
        .status(400)
        .json({ message: "Movie with this title already exists" });
    }

    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      { title, description, imageUrl, isVisible },
      { new: true }
    );
    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    return res.status(200).json(updatedMovie);
  } catch (error) {
    return res.status(500).json({ message: "Error updating movie", error });
  }
};

export const updateMovieVisibility = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      { isVisible: req.body.isVisible },
      { new: true }
    );
    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: "Error updating movie", error });
  }
};

export const deleteMovie = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
    if (!deletedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: "Error deleting movie", error });
  }
};
