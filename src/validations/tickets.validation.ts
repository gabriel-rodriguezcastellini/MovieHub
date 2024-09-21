import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const createTicketSchema = Joi.object({
  movieId: Joi.string().required(),
  userId: Joi.string().required(),
  seatNumber: Joi.string().required(),
  showTime: Joi.date().required(),
  price: Joi.number().required(),
});

const updateTicketSchema = Joi.object({
  movieId: Joi.string().optional(),
  userId: Joi.string().optional(),
  seatNumber: Joi.string().optional(),
  showTime: Joi.date().optional(),
  price: Joi.number().optional(),
});

const deleteTicketSchema = Joi.object({
  ticketId: Joi.string().required(),
});

export const validateCreateTicket = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = createTicketSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export const validateUpdateTicket = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = updateTicketSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export const validateDeleteTicket = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = deleteTicketSchema.validate(req.params);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
