"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_http_bearer_1 = require("passport-http-bearer");
var googleStrategy = require("passport-google-oauth20").Strategy;
const jwt_1 = require("../utils/jwt");
const exceptions_1 = require("../utils/exceptions");
const User_1 = __importDefault(require("../models/User"));
const BearerStrategy = new passport_http_bearer_1.Strategy(async function (token, done) {
    try {
        const payload = await (0, jwt_1.verifyAccessToken)(token);
        return done(false, payload);
    }
    catch (error) {
        const jwtError = new exceptions_1.JWTError("invalid token");
        done(jwtError, null);
    }
});
const GoogleStrategy = new googleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/api/auth/google/callback",
}, async function (accessToken, refreshToken, profile, done) {
    try {
        let user = await User_1.default.findOne({ googleId: profile.id });
        if (user) {
            return done(null, user);
        }
        const newUser = new User_1.default({
            googleId: profile.id,
        });
        await newUser.save();
        return done(null, newUser);
    }
    catch (error) {
        return done(error, false);
    }
});
async function initializePassport() {
    passport_1.default.use(BearerStrategy);
    passport_1.default.use(GoogleStrategy);
}
exports.default = initializePassport;
