import { NextFunction, Request, Response } from "express";
import { User } from "../models";
import firebaseApp from "../config/firebase";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const formattedDate = new Date(req.body.birthDate);
  const { password, ...restBody } = req.body;
  try {
    const { uid } = await firebaseApp
      .auth()
      .createUser({ email: req.body.email, password });

    const newUser = await User.create({
      ...restBody,
      firebaseUid: uid,
      birthDate: formattedDate,
    });

    return res.status(201).json({
      message: "User created successfully",
      data: newUser,
      error: false,
    });
  } catch (error) {
    next(error);
  }
};

export const getUsers = (_req: Request, res: Response) => {
  User.find()
    .then((users) => {
      res.status(200).json({
        message: "Users retrieved successfully",
        data: users,
        error: false,
      });
    })
    .catch(() => {
      res.status(500).json({
        message: "Error retrieving users",
        error: true,
      });
    });
};

export const getUser = (_req: Request, res: Response) => {
  User.findById(_req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found", error: true });
      }
      return res.status(200).json({
        message: "User retrieved successfully",
        data: user,
        error: false,
      });
    })
    .catch(() => {
      res.status(500).json({
        message: "Error retrieving user",
        error: true,
      });
    });
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const birthDate = new Date(req.body.birthDate);
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      ...req.body,
      birthDate,
    });
    return res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
      error: false,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found", error: true });
    }
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};