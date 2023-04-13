"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = exports.verifyAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function generateAccessToken(payload, expiresIn = "") {
    let accessToken;
    if (expiresIn == "") {
        accessToken = await jsonwebtoken_1.default.sign(payload, process.env.JWT_ACCESS_KEY);
    }
    else {
        accessToken = await jsonwebtoken_1.default.sign(payload, process.env.JWT_ACCESS_KEY, {
            expiresIn,
        });
    }
    return accessToken;
}
exports.generateAccessToken = generateAccessToken;
async function verifyAccessToken(token) {
    const data = await jsonwebtoken_1.default.verify(token, process.env.JWT_ACCESS_KEY);
    delete data.iat;
    delete data.exp;
    return data;
}
exports.verifyAccessToken = verifyAccessToken;
