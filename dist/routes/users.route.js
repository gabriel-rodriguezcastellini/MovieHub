"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const validations_1 = require("../validations");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.get("/", auth_middleware_1.authMiddleware, controllers_1.getUsers);
router.get("/:id", controllers_1.getUser);
router.post("/", validations_1.createUserValidation, controllers_1.createUser);
router.patch("/:id", auth_middleware_1.authMiddleware, validations_1.updatedUserValidation, controllers_1.updateUser);
router.delete("/:id", auth_middleware_1.authMiddleware, validations_1.deleteUserValidation, controllers_1.deleteUser);
router.post("/login", validations_1.validateLogin, controllers_1.login);
exports.default = router;
