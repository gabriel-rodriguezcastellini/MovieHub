import { Request, Response, NextFunction } from "express";
import { Theater } from "../models";

export const getAllTheaters = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const theaters = await Theater.find();
    res.status(200).json(theaters);
  } catch (error) {
    next(error);
  }
};

export const getTheaterById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const theater = await Theater.findById(req.params.id);
    if (!theater) {
      return res.status(404).json({ message: "Theater not found" });
    }
    res.status(200).json(theater);
  } catch (error) {
    next(error);
  }
};

export const createTheater = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newTheater = new Theater(req.body);
    const savedTheater = await newTheater.save();
    res.status(201).json(savedTheater);
  } catch (error) {
    next(error);
  }
};

export const updateTheater = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedTheater = await Theater.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedTheater) {
      return res.status(404).json({ message: "Theater not found" });
    }
    res.status(200).json(updatedTheater);
  } catch (error) {
    next(error);
  }
};

export const deleteTheater = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deletedTheater = await Theater.findByIdAndDelete(req.params.id);
    if (!deletedTheater) {
      return res.status(404).json({ message: "Theater not found" });
    }
    res.status(200).json({ message: "Theater deleted successfully" });
  } catch (error) {
    next(error);
  }
};
