"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_dto_1 = require("./auth.dto");
const auth_controller_1 = require("./auth.controller");
const authRouter = (0, express_1.Router)();
authRouter.post("/signup", auth_dto_1.validateSignUpDto, auth_controller_1.signUpController);
authRouter.post("/login", auth_dto_1.validateLoginDto, auth_controller_1.loginController);
exports.default = authRouter;
