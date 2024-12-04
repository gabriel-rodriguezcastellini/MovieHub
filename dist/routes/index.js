"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_route_1 = __importDefault(require("./users.route"));
const movies_route_1 = __importDefault(require("./movies.route"));
const showtimes_route_1 = __importDefault(require("./showtimes.route"));
const screens_route_1 = __importDefault(require("./screens.route"));
const tickets_route_1 = __importDefault(require("./tickets.route"));
const router = (0, express_1.Router)();
router.use("/users", users_route_1.default);
router.use("/movies", movies_route_1.default);
router.use("/showtimes", showtimes_route_1.default);
router.use("/screens", screens_route_1.default);
router.use("/tickets", tickets_route_1.default);
exports.default = router;
