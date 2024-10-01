import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const createTicketSchema = Joi.object({
  seatNumber: Joi.string().required(),
  showtimeId: Joi.string().required(),
});

const updateTicketSchema = Joi.object({
  seatNumber: Joi.string().optional(),
  showtimeId: Joi.string().optional(),
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
