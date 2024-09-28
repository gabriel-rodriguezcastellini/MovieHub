import { Request, Response } from "express";
import { Movie } from "../models";
import mongoose from "mongoose";

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

export const getMovieById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const movie = await Movie.aggregate([
      {
        $lookup: {
          from: "showtimes",
          localField: "_id",
          foreignField: "movieId",
          as: "showtimes",
        },
      },
      {
        $match: {
          _id: new mongoose.Types.ObjectId(req.params.id),
        },
      },
    ]);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    return res.status(200).json(movie);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error fetching movie", error });
  }
};

export const createMovie = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newMovie = new Movie(req.body);
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
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
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

export const deleteMovie = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
    if (!deletedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    return res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting movie", error });
  }
};
