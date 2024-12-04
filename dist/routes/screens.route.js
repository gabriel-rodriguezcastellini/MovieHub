"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const validations_1 = require("../validations");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.get("/", controllers_1.getAllScreens);
router.get("/:id", controllers_1.getScreenById);
router.post("/", auth_middleware_1.authMiddleware, validations_1.validateCreateScreen, controllers_1.createScreen);
router.patch("/:id", auth_middleware_1.authMiddleware, validations_1.validateUpdateScreen, controllers_1.updateScreen);
router.delete("/:id", auth_middleware_1.authMiddleware, controllers_1.deleteScreen);
exports.default = router;