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
exports.deleteScreen = exports.updateScreen = exports.createScreen = exports.getScreenById = exports.getAllScreens = void 0;
const models_1 = require("../models");
const mongoose_1 = __importDefault(require("mongoose"));
const getAllScreens = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const screens = yield models_1.Screen.find();
        res.status(200).json(screens);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllScreens = getAllScreens;
const getScreenById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const screen = yield models_1.Screen.aggregate([
            {
                $lookup: {
                    from: "showtimes",
                    localField: "_id",
                    foreignField: "screenId",
                    as: "showtimes",
                },
            },
            {
                $match: {
                    _id: new mongoose_1.default.Types.ObjectId(req.params.id),
                },
            },
        ]);
        if (!screen) {
            return res.status(404).json({ message: "Screen not found" });
        }
        res.status(200).json(screen);
    }
    catch (error) {
        next(error);
    }
});
exports.getScreenById = getScreenById;
const createScreen = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newScreen = new models_1.Screen(req.body);
        const savedScreen = yield newScreen.save();
        res.status(201).json(savedScreen);
    }
    catch (error) {
        next(error);
    }
});
exports.createScreen = createScreen;
const updateScreen = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedScreen = yield models_1.Screen.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedScreen) {
            return res.status(404).json({ message: "Screen not found" });
        }
        res.status(200).json(updatedScreen);
    }
    catch (error) {
        next(error);
    }
});
exports.updateScreen = updateScreen;
const deleteScreen = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedScreen = yield models_1.Screen.findByIdAndDelete(req.params.id);
        if (!deletedScreen) {
            return res.status(404).json({ message: "Screen not found" });
        }
        res.status(200).json({ message: "Screen deleted successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteScreen = deleteScreen;
