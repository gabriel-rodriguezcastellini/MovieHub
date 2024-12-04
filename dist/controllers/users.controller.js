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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.deleteUser = exports.updateUser = exports.getUser = exports.getUsers = exports.createUser = void 0;
const axios_1 = __importDefault(require("axios"));
const user_model_1 = require("../models/user.model");
const firebase_1 = __importDefault(require("../config/firebase"));
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const formattedDate = new Date(req.body.birthDate);
    const _a = req.body, { password } = _a, restBody = __rest(_a, ["password"]);
    try {
        const { uid } = yield firebase_1.default
            .auth()
            .createUser({ email: req.body.email, password });
        const newUser = yield user_model_1.User.create(Object.assign(Object.assign({}, restBody), { firebaseUid: uid, birthDate: formattedDate }));
        return res.status(201).json({
            message: "User created successfully",
            data: newUser,
            error: false,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createUser = createUser;
const getUsers = (_req, res) => {
    user_model_1.User.find()
        .then((users) => {
        res.status(200).json({
            message: "Users retrieved successfully",
            data: users,
            error: false,
        });
    })
        .catch(() => {
        res.status(500).json({
            message: "Error retrieving users",
            error: true,
        });
    });
};
exports.getUsers = getUsers;
const getUser = (_req, res) => {
    user_model_1.User.findById(_req.params.id)
        .then((user) => {
        if (!user) {
            return res.status(404).json({ message: "User not found", error: true });
        }
        return res.status(200).json({
            message: "User retrieved successfully",
            data: user,
            error: false,
        });
    })
        .catch(() => {
        res.status(500).json({
            message: "Error retrieving user",
            error: true,
        });
    });
};
exports.getUser = getUser;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const birthDate = new Date(req.body.birthDate);
    try {
        const updatedUser = yield user_model_1.User.findByIdAndUpdate(req.params.id, Object.assign(Object.assign({}, req.body), { birthDate }));
        return res.status(200).json({
            message: "User updated successfully",
            data: updatedUser,
            error: false,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedUser = yield user_model_1.User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found", error: true });
        }
        return res.status(204).send();
    }
    catch (error) {
        next(error);
    }
});
exports.deleteUser = deleteUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const firebaseLoginUrl = `${process.env.FIREBASE_LOGIN_URL}${process.env.FIREBASE_API_KEY}`;
        const firebaseResponse = yield axios_1.default.post(firebaseLoginUrl, {
            email: req.body.email,
            password: req.body.password,
            returnSecureToken: true,
        });
        const { localId } = firebaseResponse.data;
        const user = yield user_model_1.User.findOne({ firebaseUid: localId });
        if (!user)
            return res.status(400).send("Invalid email or password.");
        const customToken = yield firebase_1.default.auth().createCustomToken(localId, {
            isAdmin: user.isAdmin,
        });
        res.send({ idToken: customToken });
    }
    catch (_a) {
        res.status(400).send("Invalid email or password.");
    }
});
exports.login = login;
