import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const createScreenSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  location: Joi.string().min(3).max(100).required(),
  capacity: Joi.number().integer().min(1).required(),
});

const updateScreenSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  location: Joi.string().min(3).max(100),
  capacity: Joi.number().integer().min(1),
}).or("name", "location", "capacity");

export const validateCreateScreen = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = createScreenSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export const validateUpdateScreen = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = updateScreenSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
