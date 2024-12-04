"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateScreen = exports.validateCreateScreen = void 0;
const joi_1 = __importDefault(require("joi"));
const createScreenSchema = joi_1.default.object({
    name: joi_1.default.string().min(3).max(30).required(),
    location: joi_1.default.string().min(3).max(100).required(),
    capacity: joi_1.default.number().integer().min(1).required(),
});
const updateScreenSchema = joi_1.default.object({
    name: joi_1.default.string().min(3).max(30),
    location: joi_1.default.string().min(3).max(100),
    capacity: joi_1.default.number().integer().min(1),
}).or("name", "location", "capacity");
const validateCreateScreen = (req, res, next) => {
    const { error } = createScreenSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};
exports.validateCreateScreen = validateCreateScreen;
const validateUpdateScreen = (req, res, next) => {
    const { error } = updateScreenSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};
exports.validateUpdateScreen = validateUpdateScreen;
