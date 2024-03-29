"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_dto_1 = require("./auth.dto");
const auth_controller_1 = require("./auth.controller");
const passport_1 = __importDefault(require("passport"));
const authRouter = (0, express_1.Router)();
authRouter.post("/signup", auth_dto_1.validateSignUpDto, auth_controller_1.signUpController);
authRouter.post("/login", auth_dto_1.validateLoginDto, auth_controller_1.loginController);
authRouter.get("/google", passport_1.default.authenticate("google", { scope: ["profile", "email"] }));
authRouter.get("/google/callback", passport_1.default.authenticate("google", {
    session: false,
}), auth_controller_1.googleLoginController);
exports.default = authRouter;
