import { Request, Response, NextFunction } from "express";
import { Ticket } from "../models";

export const getAllTickets = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
  } catch (error) {
    next(error);
  }
};

export const getTicketById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.status(200).json(ticket);
  } catch (error) {
    next(error);
  }
};

export const createTicket = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newTicket = new Ticket(req.body);
    const savedTicket = await newTicket.save();
    res.status(201).json(savedTicket);
  } catch (error) {
    next(error);
  }
};

export const updateTicket = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedTicket = await Ticket.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedTicket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.status(200).json(updatedTicket);
  } catch (error) {
    next(error);
  }
};

export const deleteTicket = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deletedTicket = await Ticket.findByIdAndDelete(req.params.id);
    if (!deletedTicket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.status(200).json({ message: "Ticket deleted successfully" });
  } catch (error) {
    next(error);
  }
};
