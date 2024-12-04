"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDeleteShowtime = exports.validateUpdateShowtime = exports.validateCreateShowtime = void 0;
const joi_1 = __importDefault(require("joi"));
const createShowtimeSchema = joi_1.default.object({
    movieId: joi_1.default.string().required(),
    screenId: joi_1.default.string().required(),
    startTime: joi_1.default.date().iso().required(),
    endTime: joi_1.default.date().iso().required(),
    price: joi_1.default.number().positive().required(),
});
const updateShowtimeSchema = joi_1.default.object({
    movieId: joi_1.default.string().optional(),
    screenId: joi_1.default.string().optional(),
    startTime: joi_1.default.date().iso().optional(),
    endTime: joi_1.default.date().iso().optional(),
    price: joi_1.default.number().positive().optional(),
}).min(1);
const deleteShowtimeSchema = joi_1.default.object({
    showtimeId: joi_1.default.string().required(),
});
const validateCreateShowtime = (req, res, next) => {
    const { error } = createShowtimeSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};
exports.validateCreateShowtime = validateCreateShowtime;
const validateUpdateShowtime = (req, res, next) => {
    const { error } = updateShowtimeSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};
exports.validateUpdateShowtime = validateUpdateShowtime;
const validateDeleteShowtime = (req, res, next) => {
    const { error } = deleteShowtimeSchema.validate(req.params);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};
exports.validateDeleteShowtime = validateDeleteShowtime;
