"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDeleteTicket = exports.validateUpdateTicket = exports.validateCreateTicket = void 0;
const joi_1 = __importDefault(require("joi"));
const createTicketSchema = joi_1.default.object({
    seatNumber: joi_1.default.string().required(),
    showtimeId: joi_1.default.string().required(),
});
const updateTicketSchema = joi_1.default.object({
    seatNumber: joi_1.default.string().optional(),
    showtimeId: joi_1.default.string().optional(),
});
const deleteTicketSchema = joi_1.default.object({
    ticketId: joi_1.default.string().required(),
});
const validateCreateTicket = (req, res, next) => {
    const { error } = createTicketSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};
exports.validateCreateTicket = validateCreateTicket;
const validateUpdateTicket = (req, res, next) => {
    const { error } = updateTicketSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};
exports.validateUpdateTicket = validateUpdateTicket;
const validateDeleteTicket = (req, res, next) => {
    const { error } = deleteTicketSchema.validate(req.params);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};
exports.validateDeleteTicket = validateDeleteTicket;
