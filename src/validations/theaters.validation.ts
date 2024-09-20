import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const createTheaterSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  location: Joi.string().min(3).max(100).required(),
  capacity: Joi.number().integer().min(1).required(),
});

const updateTheaterSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  location: Joi.string().min(3).max(100),
  capacity: Joi.number().integer().min(1),
}).or("name", "location", "capacity");

export const validateCreateTheater = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = createTheaterSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export const validateUpdateTheater = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = updateTheaterSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
