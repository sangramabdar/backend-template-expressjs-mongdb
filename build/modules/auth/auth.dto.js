"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLoginDto = exports.validateSignUpDto = void 0;
const yup = __importStar(require("yup"));
const exceptions_1 = require("../../utils/exceptions");
const utils_1 = require("../../utils/utils");
const signUpDto = yup.object().shape({
    name: yup
        .string()
        .required("name is required")
        .min(3, "name must contain at least 3 characters"),
    email: yup
        .string()
        .email("email must be valid")
        .required("email is required"),
    password: yup
        .string()
        .required("password is required")
        .min(8, "password must contain between 8 to 20 characters"),
    confirmPassword: yup.string().required("confirmPassword is required"),
});
const loginDto = yup.object().shape({
    email: yup
        .string()
        .email("email must be valid")
        .required("email is required"),
    password: yup
        .string()
        .required("password is required")
        .min(8, "password must contain between 8 to 20 characters"),
});
async function validateLoginDto(req, res, next) {
    try {
        req.body = (0, utils_1.trimAllStrings)(req.body);
        req.body = await loginDto.validate(req.body, {
            stripUnknown: true,
        });
        next();
    }
    catch (error) {
        error = new exceptions_1.BadRequest(error.message);
        next(error);
    }
}
exports.validateLoginDto = validateLoginDto;
async function validateSignUpDto(req, res, next) {
    try {
        req.body = (0, utils_1.trimAllStrings)(req.body);
        req.body = await signUpDto.validate(req.body, {
            stripUnknown: true,
        });
        if (req.body["password"] !== req.body["confirmPassword"]) {
            let error = new exceptions_1.BadRequest("password and confirmPassword must be same");
            next(error);
            return;
        }
        delete req.body.confirmPassword;
        next();
    }
    catch (error) {
        error = new exceptions_1.BadRequest(error.message);
        next(error);
    }
}
exports.validateSignUpDto = validateSignUpDto;
