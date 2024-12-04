"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTicket = exports.updateTicket = exports.createTicket = exports.getTicketById = exports.getAllTickets = void 0;
const models_1 = require("../models");
const getAllTickets = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tickets = yield models_1.Ticket.find();
        res.status(200).json(tickets);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllTickets = getAllTickets;
const getTicketById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ticket = yield models_1.Ticket.findById(req.params.id);
        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }
        res.status(200).json(ticket);
    }
    catch (error) {
        next(error);
    }
});
exports.getTicketById = getTicketById;
const createTicket = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newTicket = new models_1.Ticket(req.body);
        const savedTicket = yield newTicket.save();
        res.status(201).json(savedTicket);
    }
    catch (error) {
        next(error);
    }
});
exports.createTicket = createTicket;
const updateTicket = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedTicket = yield models_1.Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTicket) {
            return res.status(404).json({ message: "Ticket not found" });
        }
        res.status(200).json(updatedTicket);
    }
    catch (error) {
        next(error);
    }
});
exports.updateTicket = updateTicket;
const deleteTicket = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedTicket = yield models_1.Ticket.findByIdAndDelete(req.params.id);
        if (!deletedTicket) {
            return res.status(404).json({ message: "Ticket not found" });
        }
        res.status(200).json({ message: "Ticket deleted successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteTicket = deleteTicket;
