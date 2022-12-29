"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.validateBody = exports.validateId = void 0;
const mongodb_1 = require("mongodb");
const exceptions_1 = require("./exceptions");
const jwt_1 = require("./jwt");
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
        const user = await (0, jwt_1.verifyAccessToken)(tokenPart);
        req.user = user;
        next();
    }
    catch (error) {
        error = new exceptions_1.CustomError("token is invalid or expired", 403);
        next(error);
    }
}
exports.validateToken = validateToken;
