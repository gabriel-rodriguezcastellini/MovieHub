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
exports.deleteShowtime = exports.updateShowtime = exports.createShowtime = exports.getShowtimeById = exports.getAllShowtimes = void 0;
const models_1 = require("../models");
const mongoose_1 = __importDefault(require("mongoose"));
const getAllShowtimes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { movieId } = req.query;
        let showtimes;
        if (movieId) {
            showtimes = yield models_1.Showtime.find({ movieId });
        }
        else {
            showtimes = yield models_1.Showtime.find();
        }
        res.status(200).json(showtimes);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllShowtimes = getAllShowtimes;
const getShowtimeById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const showtime = yield models_1.Showtime.aggregate([
            {
                $lookup: {
                    from: "tickets",
                    localField: "_id",
                    foreignField: "showtimeId",
                    as: "tickets",
                },
            },
            {
                $match: {
                    _id: new mongoose_1.default.Types.ObjectId(req.params.id),
                },
            },
        ]);
        if (!showtime) {
            return res.status(404).json({ message: "Showtime not found" });
        }
        res.status(200).json(showtime);
    }
    catch (error) {
        next(error);
    }
});
exports.getShowtimeById = getShowtimeById;
const createShowtime = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newShowtime = new models_1.Showtime(req.body);
        const savedShowtime = yield newShowtime.save();
        res.status(201).json(savedShowtime);
    }
    catch (error) {
        next(error);
    }
});
exports.createShowtime = createShowtime;
const updateShowtime = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedShowtime = yield models_1.Showtime.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedShowtime) {
            return res.status(404).json({ message: "Showtime not found" });
        }
        res.status(200).json(updatedShowtime);
    }
    catch (error) {
        next(error);
    }
});
exports.updateShowtime = updateShowtime;
const deleteShowtime = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedShowtime = yield models_1.Showtime.findByIdAndDelete(req.params.id);
        if (!deletedShowtime) {
            return res.status(404).json({ message: "Showtime not found" });
        }
        res.status(200).json({ message: "Showtime deleted successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteShowtime = deleteShowtime;
