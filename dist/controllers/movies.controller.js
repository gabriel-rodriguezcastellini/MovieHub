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
exports.deleteMovie = exports.updateMovieVisibility = exports.updateMovie = exports.createMovie = exports.getMovieById = exports.getVisibleMovies = exports.getMovies = void 0;
const models_1 = require("../models");
const getMovies = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movies = yield models_1.Movie.find();
        return res.status(200).json(movies);
    }
    catch (error) {
        return res.status(500).json({ message: "Error fetching movies", error });
    }
});
exports.getMovies = getMovies;
const getVisibleMovies = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movies = yield models_1.Movie.find({ isVisible: true });
        return res.status(200).json(movies);
    }
    catch (error) {
        return res.status(500).json({ message: "Error fetching movies", error });
    }
});
exports.getVisibleMovies = getVisibleMovies;
const getMovieById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movie = yield models_1.Movie.findById(req.params.id)
            .select("_id title description imageUrl isVisible")
            .lean();
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        if (!movie.isVisible && !req.headers.authorization) {
            return res.status(403).json({ message: "Access denied" });
        }
        return res.status(200).json(movie);
    }
    catch (error) {
        return res.status(500).json({ message: "Error fetching movie", error });
    }
});
exports.getMovieById = getMovieById;
const createMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, imageUrl, isVisible } = req.body;
        const existingMovie = yield models_1.Movie.findOne({ title });
        if (existingMovie) {
            return res
                .status(400)
                .json({ message: "Movie with this title already exists" });
        }
        const newMovie = new models_1.Movie({ title, description, imageUrl, isVisible });
        const savedMovie = yield newMovie.save();
        return res.status(201).json(savedMovie);
    }
    catch (error) {
        return res.status(500).json({ message: "Error creating movie", error });
    }
});
exports.createMovie = createMovie;
const updateMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, imageUrl, isVisible } = req.body;
        const existingMovie = yield models_1.Movie.findOne({ title });
        if (existingMovie &&
            existingMovie._id.toString() !== req.params.id) {
            return res
                .status(400)
                .json({ message: "Movie with this title already exists" });
        }
        const updatedMovie = yield models_1.Movie.findByIdAndUpdate(req.params.id, { title, description, imageUrl, isVisible }, { new: true });
        if (!updatedMovie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        return res.status(200).json(updatedMovie);
    }
    catch (error) {
        return res.status(500).json({ message: "Error updating movie", error });
    }
});
exports.updateMovie = updateMovie;
const updateMovieVisibility = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedMovie = yield models_1.Movie.findByIdAndUpdate(req.params.id, { isVisible: req.body.isVisible }, { new: true });
        if (!updatedMovie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        return res.status(204).send();
    }
    catch (error) {
        return res.status(500).json({ message: "Error updating movie", error });
    }
});
exports.updateMovieVisibility = updateMovieVisibility;
const deleteMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedMovie = yield models_1.Movie.findByIdAndDelete(req.params.id);
        if (!deletedMovie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        return res.status(204).send();
    }
    catch (error) {
        return res.status(500).json({ message: "Error deleting movie", error });
    }
});
exports.deleteMovie = deleteMovie;
