import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const createShowtimeSchema = Joi.object({
  movieId: Joi.string().required(),
  theaterId: Joi.string().required(),
  startTime: Joi.date().iso().required(),
  endTime: Joi.date().iso().required(),
  price: Joi.number().positive().required(),
});

const updateShowtimeSchema = Joi.object({
  movieId: Joi.string().optional(),
  theaterId: Joi.string().optional(),
  startTime: Joi.date().iso().optional(),
  endTime: Joi.date().iso().optional(),
  price: Joi.number().positive().optional(),
}).min(1);

const deleteShowtimeSchema = Joi.object({
  showtimeId: Joi.string().required(),
});

export const validateCreateShowtime = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = createShowtimeSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};

export const validateUpdateShowtime = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = updateShowtimeSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};

export const validateDeleteShowtime = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = deleteShowtimeSchema.validate(req.params);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};
