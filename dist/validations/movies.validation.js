"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMovieValidation = exports.getMovieValidation = exports.updateMovieVisibilityValidation = exports.updateMovieValidation = exports.createMovieValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        next();
    };
};
const validateParams = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.params);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        next();
    };
};
exports.createMovieValidation = validate(joi_1.default.object({
    title: joi_1.default.string().min(1).max(255).required(),
    description: joi_1.default.string().min(1).max(1000).required(),
    imageUrl: joi_1.default.string().uri().required(),
    isVisible: joi_1.default.boolean().required(),
}));
exports.updateMovieValidation = validate(joi_1.default.object({
    title: joi_1.default.string().min(1).max(255).required(),
    description: joi_1.default.string().min(1).max(1000).required(),
    imageUrl: joi_1.default.string().uri().required(),
    isVisible: joi_1.default.boolean().required(),
}));
exports.updateMovieVisibilityValidation = validate(joi_1.default.object({
    isVisible: joi_1.default.boolean().required(),
}));
exports.getMovieValidation = validateParams(joi_1.default.object({
    id: joi_1.default.string().guid({ version: "uuidv4" }).required(),
}));
exports.deleteMovieValidation = validateParams(joi_1.default.object({
    id: joi_1.default.string().required(),
}));
