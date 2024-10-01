import { Router } from "express";

import {
  createTicket,
  deleteTicket,
  getTicketById,
  getAllTickets,
  updateTicket,
} from "../controllers";

import { validateCreateTicket, validateUpdateTicket } from "../validations";
import { authMiddleware } from "../middlewares/auth.middleware";
import { usersMiddleware } from "../middlewares";

const router = Router();
router.get("/", getAllTickets);
router.get("/:id", getTicketById);

router.post(
  "/",
  authMiddleware,
  validateCreateTicket,
  usersMiddleware,
  createTicket
);

router.patch("/:id", authMiddleware, validateUpdateTicket, updateTicket);
router.delete("/:id", authMiddleware, deleteTicket);

export default router;
