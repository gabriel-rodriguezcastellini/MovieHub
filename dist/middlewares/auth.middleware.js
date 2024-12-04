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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const firebase_1 = __importDefault(require("../config/firebase"));
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            next("Provide a token");
            return;
        }
        if (!authorization.startsWith("Bearer ")) {
            next("Invalid token format");
            return;
        }
        const token = authorization.split(" ")[1];
        yield firebase_1.default.auth().verifyIdToken(token);
        next();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        if (error.errorInfo.code === "auth/argument-error") {
            next("Provide a token");
        }
        if (error.errorInfo.code === "auth/id-token-expired") {
            next("Token has expired");
        }
        next(error.message);
    }
});
exports.authMiddleware = authMiddleware;
