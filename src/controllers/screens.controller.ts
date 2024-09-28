import { Request, Response, NextFunction } from "express";
import { Screen } from "../models";

export const getAllScreens = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const screens = await Screen.find();
    res.status(200).json(screens);
  } catch (error) {
    next(error);
  }
};

export const getScreenById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const screen = await Screen.findById(req.params.id);
    if (!screen) {
      return res.status(404).json({ message: "Screen not found" });
    }
    res.status(200).json(screen);
  } catch (error) {
    next(error);
  }
};

export const createScreen = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newScreen = new Screen(req.body);
    const savedScreen = await newScreen.save();
    res.status(201).json(savedScreen);
  } catch (error) {
    next(error);
  }
};

export const updateScreen = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedScreen = await Screen.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedScreen) {
      return res.status(404).json({ message: "Screen not found" });
    }
    res.status(200).json(updatedScreen);
  } catch (error) {
    next(error);
  }
};

export const deleteScreen = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deletedScreen = await Screen.findByIdAndDelete(req.params.id);
    if (!deletedScreen) {
      return res.status(404).json({ message: "Screen not found" });
    }
    res.status(200).json({ message: "Screen deleted successfully" });
  } catch (error) {
    next(error);
  }
};
