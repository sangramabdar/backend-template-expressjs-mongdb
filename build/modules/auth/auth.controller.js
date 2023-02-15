"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpController = exports.loginController = void 0;
const auth_service_1 = require("./auth.service");
const responseBodyBuilder_1 = __importDefault(require("../../utils/responseBodyBuilder"));
async function loginController(req, res, next) {
    const [data, error] = await (0, auth_service_1.loginService)(req);
    if (error)
        return next(error);
    const responseBody = new responseBodyBuilder_1.default()
        .setStatusCode(200)
        .setData(data);
    res.status(200).json(responseBody);
}
exports.loginController = loginController;
async function signUpController(req, res, next) {
    const [data, error] = await (0, auth_service_1.signUpService)(req);
    if (error)
        return next(error);
    const responseBody = new responseBodyBuilder_1.default()
        .setStatusCode(201)
        .setData(data);
    res.status(201).json(responseBody);
}
exports.signUpController = signUpController;
