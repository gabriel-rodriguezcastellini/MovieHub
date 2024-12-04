"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = exports.deleteUserValidation = exports.updatedUserValidation = exports.createUserValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const createUserBodyValidationSchema = joi_1.default.object({
    name: joi_1.default.string().min(3).max(250).required(),
    lastName: joi_1.default.string().required(),
    birthDate: joi_1.default.date().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
    isAdmin: joi_1.default.boolean().optional().default(false),
});
const createUserValidation = (req, res, next) => {
    const { error } = createUserBodyValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: error.details[0].message,
            error: true,
        });
    }
    next();
};
exports.createUserValidation = createUserValidation;
const updateUserBodyValidationSchema = joi_1.default.object({
    name: joi_1.default.string().min(3).max(250).optional(),
    lastName: joi_1.default.string().optional(),
    birthDate: joi_1.default.date().optional(),
    email: joi_1.default.string().email().optional(),
    isAdmin: joi_1.default.boolean().optional(),
});
const userParamValidationSchema = joi_1.default.object({
    id: joi_1.default.string().hex().length(24).required(),
});
const updatedUserValidation = (req, res, next) => {
    const { error: bodyError } = updateUserBodyValidationSchema.validate(req.body);
    const { error: paramError } = userParamValidationSchema.validate(req.params);
    if (paramError || bodyError) {
        return res.status(400).json({
            message: paramError
                ? paramError.details[0].message
                : bodyError === null || bodyError === void 0 ? void 0 : bodyError.details[0].message,
            error: true,
        });
    }
    next();
};
exports.updatedUserValidation = updatedUserValidation;
const deleteUserValidation = (req, res, next) => {
    const { error } = userParamValidationSchema.validate(req.params);
    if (error) {
        return res.status(400).json({
            message: error.details[0].message,
            error: true,
        });
    }
    next();
};
exports.deleteUserValidation = deleteUserValidation;
const validateLogin = (req, res, next) => {
    const schema = joi_1.default.object({
        email: joi_1.default.string().min(6).required().email(),
        password: joi_1.default.string().min(6).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: error.details[0].message,
            error: true,
        });
    }
    next();
};
exports.validateLogin = validateLogin;
