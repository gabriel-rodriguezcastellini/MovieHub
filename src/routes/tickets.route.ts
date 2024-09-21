import { Router } from "express";

import {
  createTicket,
  deleteTicket,
  getTicketById,
  getAllTickets,
  updateTicket,
} from "../controllers";

import { validateCreateTicket, validateUpdateTicket } from "../validations";

const router = Router();
router.get("/", getAllTickets);
router.get("/:id", getTicketById);
router.post("/", validateCreateTicket, createTicket);
router.patch("/:id", validateUpdateTicket, updateTicket);
router.delete("/:id", deleteTicket);

export default router;
