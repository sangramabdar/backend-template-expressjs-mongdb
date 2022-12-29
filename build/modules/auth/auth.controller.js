"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpController = exports.loginController = void 0;
const auth_service_1 = require("./auth.service");
const responseBodyBuilder_1 = __importDefault(require("../../utils/responseBodyBuilder"));
const jwt_1 = require("../../utils/jwt");
async function loginController(req, res, next) {
    try {
        const result = await (0, auth_service_1.loginService)(req);
        const accessToken = await (0, jwt_1.generateAccessToken)(result, "24h");
        const responseBody = new responseBodyBuilder_1.default()
            .setStatusCode(200)
            .setData({ accessToken, _id: result._id });
        res.status(200).json(responseBody);
    }
    catch (error) {
        next(error);
    }
}
exports.loginController = loginController;
async function signUpController(req, res, next) {
    try {
        const result = await (0, auth_service_1.signUpService)(req);
        const responseBody = new responseBodyBuilder_1.default()
            .setStatusCode(201)
            .setData(result);
        res.status(201).json(responseBody);
    }
    catch (error) {
        next(error);
    }
}
exports.signUpController = signUpController;
