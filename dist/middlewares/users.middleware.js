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
exports.usersMiddleware = void 0;
const models_1 = require("../models");
const usersMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            req.body.userId = (_a = (yield models_1.User.findOne({
                firebaseUid: JSON.parse(Buffer.from(authHeader.split(" ")[1].split(".")[1], "base64").toString()).user_id,
            }, { _id: 1 }))) === null || _a === void 0 ? void 0 : _a.id;
        }
        next();
    }
    catch (_b) {
        return res.status(403).json({ message: "Invalid token" });
    }
});
exports.usersMiddleware = usersMiddleware;
