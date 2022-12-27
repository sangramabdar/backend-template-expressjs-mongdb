"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAccessToken = exports.verifyRefreshToken = exports.generateRefreshToken = exports.generateAccessToken = exports.validateToken = exports.validateBody = exports.validateId = void 0;
const mongodb_1 = require("mongodb");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const exceptions_1 = require("./exceptions");
async function validateId(req, res, next) {
    let id = req.params["id"];
    let isValid = mongodb_1.ObjectId.isValid(id);
    if (!isValid) {
        let error = new exceptions_1.BadRequest("id is in wrong format");
        return next(error);
    }
    next();
}
exports.validateId = validateId;
async function validateBody(req, res, next) {
    if (Object.keys(req.body).length == 0) {
        let error = new exceptions_1.BadRequest("id is in wrong format");
        return next(error);
    }
    next();
}
exports.validateBody = validateBody;
async function validateToken(req, res, next) {
    let error = new exceptions_1.Unauthorized();
    try {
        const token = req.headers["authorization"];
        if (!token) {
            error.setMessage("authorization header is not provided in headers");
            return next(error);
        }
        const tokenPart = token.split(" ")[1];
        if (!tokenPart) {
            error.setMessage("authorization header is not in correct format");
            return next(error);
        }
        const user = await verifyAccessToken(tokenPart);
        req.user = user;
        next();
    }
    catch (error) {
        error = new exceptions_1.CustomError("token is invalid or expired", 403);
        next(error);
    }
}
exports.validateToken = validateToken;
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
