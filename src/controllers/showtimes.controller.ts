import { Request, Response, NextFunction } from "express";
import { Showtime } from "../models";
import mongoose from "mongoose";

export const getAllShowtimes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { movieId } = req.query;
    let showtimes;
    if (movieId) {
      showtimes = await Showtime.find({ movieId });
    } else {
      showtimes = await Showtime.find();
    }
    res.status(200).json(showtimes);
  } catch (error) {
    next(error);
  }
};

export const getShowtimeById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const showtime = await Showtime.aggregate([
      {
        $lookup: {
          from: "tickets",
          localField: "_id",
          foreignField: "showtimeId",
          as: "tickets",
        },
      },
      {
        $match: {
          _id: new mongoose.Types.ObjectId(req.params.id),
        },
      },
    ]);

    if (!showtime) {
      return res.status(404).json({ message: "Showtime not found" });
    }
    res.status(200).json(showtime);
  } catch (error) {
    next(error);
  }
};

export const createShowtime = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newShowtime = new Showtime(req.body);
    const savedShowtime = await newShowtime.save();
    res.status(201).json(savedShowtime);
  } catch (error) {
    next(error);
  }
};

export const updateShowtime = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedShowtime = await Showtime.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedShowtime) {
      return res.status(404).json({ message: "Showtime not found" });
    }
    res.status(200).json(updatedShowtime);
  } catch (error) {
    next(error);
  }
};

export const deleteShowtime = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deletedShowtime = await Showtime.findByIdAndDelete(req.params.id);
    if (!deletedShowtime) {
      return res.status(404).json({ message: "Showtime not found" });
    }
    res.status(200).json({ message: "Showtime deleted successfully" });
  } catch (error) {
    next(error);
  }
};
