"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_http_bearer_1 = require("passport-http-bearer");
const jwt_1 = require("../utils/jwt");
const exceptions_1 = require("../utils/exceptions");
async function initializePassport() {
    passport_1.default.use(new passport_http_bearer_1.Strategy(async function (token, done) {
        try {
            const payload = await (0, jwt_1.verifyAccessToken)(token);
            return done(false, payload);
        }
        catch (error) {
            const jwtError = new exceptions_1.JWTError("invalid token");
            done(jwtError, null);
        }
    }));
}
exports.default = initializePassport;
