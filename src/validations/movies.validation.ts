import Joi from "joi";
import { Request, Response, NextFunction } from "express";

const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
};

const validateParams = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.params);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
};

export const createMovieValidation = validate(
  Joi.object({
    title: Joi.string().min(1).max(255).required(),
    description: Joi.string().min(1).max(1000).required(),
    imageUrl: Joi.string().uri().required(),
    isVisible: Joi.boolean().required(),
  })
);

export const updateMovieValidation = validate(
  Joi.object({
    title: Joi.string().min(1).max(255).required(),
    description: Joi.string().min(1).max(1000).required(),
    imageUrl: Joi.string().uri().required(),
    isVisible: Joi.boolean().required(),
  })
);

export const updateMovieVisibilityValidation = validate(
  Joi.object({
    isVisible: Joi.boolean().required(),
  })
);

export const getMovieValidation = validateParams(
  Joi.object({
    id: Joi.string().guid({ version: "uuidv4" }).required(),
  })
);

export const deleteMovieValidation = validateParams(
  Joi.object({
    id: Joi.string().required(),
  })
);
