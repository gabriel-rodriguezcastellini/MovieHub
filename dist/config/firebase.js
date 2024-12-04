"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { FIREBASE_PRIVATE_KEY, FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL } = process.env;
const firebaseApp = firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert({
        privateKey: FIREBASE_PRIVATE_KEY === null || FIREBASE_PRIVATE_KEY === void 0 ? void 0 : FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
        clientEmail: FIREBASE_CLIENT_EMAIL,
        projectId: FIREBASE_PROJECT_ID,
    }),
});
exports.default = firebaseApp;
