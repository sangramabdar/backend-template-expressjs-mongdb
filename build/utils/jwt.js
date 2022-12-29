"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = exports.generateRefreshToken = exports.verifyRefreshToken = exports.verifyAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function generateAccessToken(payload, expiresIn = "") {
    let accessToken;
    if (expiresIn == "") {
        accessToken = await jsonwebtoken_1.default.sign(payload, process.env.ACCESS_KEY);
    }
    else {
        accessToken = await jsonwebtoken_1.default.sign(payload, process.env.ACCESS_KEY, {
            expiresIn,
        });
    }
    return accessToken;
}
exports.generateAccessToken = generateAccessToken;
async function generateRefreshToken(payload, expiresIn = "") {
    let refreshToken;
    if (expiresIn == "") {
        refreshToken = await jsonwebtoken_1.default.sign(payload, process.env.REFRESH_KEY);
    }
    else {
        refreshToken = await jsonwebtoken_1.default.sign(payload, process.env.REFRESH_KEY, {
            expiresIn,
        });
    }
    return refreshToken;
}
exports.generateRefreshToken = generateRefreshToken;
async function verifyAccessToken(token) {
    const data = await jsonwebtoken_1.default.verify(token, process.env.ACCESS_KEY);
    delete data.iat;
    delete data.exp;
    return data;
}
exports.verifyAccessToken = verifyAccessToken;
async function verifyRefreshToken(token) {
    const data = await jsonwebtoken_1.default.verify(token, process.env.REFRESH_KEY);
    delete data.iat;
    delete data.exp;
    return data;
}
exports.verifyRefreshToken = verifyRefreshToken;
