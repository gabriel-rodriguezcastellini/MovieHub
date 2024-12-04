"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const validations_1 = require("../validations");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.get("/", auth_middleware_1.authMiddleware, controllers_1.getMovies);
router.get("/visible", controllers_1.getVisibleMovies);
router.get("/:id", controllers_1.getMovieById, validations_1.getMovieValidation);
router.post("/", auth_middleware_1.authMiddleware, validations_1.createMovieValidation, controllers_1.createMovie);
router.patch("/:id", auth_middleware_1.authMiddleware, validations_1.updateMovieValidation, controllers_1.updateMovie);
router.patch("/:id/visibility", auth_middleware_1.authMiddleware, validations_1.updateMovieVisibilityValidation, controllers_1.updateMovieVisibility);
router.delete("/:id", auth_middleware_1.authMiddleware, validations_1.deleteMovieValidation, controllers_1.deleteMovie);
exports.default = router;