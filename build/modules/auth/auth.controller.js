"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupController = exports.loginController = void 0;
const auth_service_1 = require("./auth.service");
const response_body_builder_1 = __importDefault(require("../../utils/response-body-builder"));
const validation_1 = require("../../utils/validation");
async function loginController(req, res, next) {
    const result = await (0, auth_service_1.loginService)(req).catch(next);
    if (!result)
        return;
    const accessToken = await (0, validation_1.generateAccessToken)(result, "24h");
    const responseBody = new response_body_builder_1.default()
        .setStatusCode(200)
        .setData({ accessToken, _id: result._id });
    res.status(200).json(responseBody);
}
exports.loginController = loginController;
async function signupController(req, res, next) {
    const result = await (0, auth_service_1.signUpService)(req).catch(next);
    if (!result)
        return;
    const responseBody = new response_body_builder_1.default()
        .setStatusCode(201)
        .setData(result);
    res.status(201).json(responseBody);
}
exports.signupController = signupController;
