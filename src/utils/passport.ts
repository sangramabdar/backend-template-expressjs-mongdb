import passport from "passport";
import { Strategy } from "passport-http-bearer";
var googleStrategy = require("passport-google-oauth20").Strategy;
import { verifyAccessToken } from "../utils/jwt";
import { JWTError } from "../utils/exceptions";
import UserModel from "../models/User";

const BearerStrategy = new Strategy(async function (token, done) {
  try {
    const payload = await verifyAccessToken(token);
    return done(false, payload);
  } catch (error) {
    const jwtError = new JWTError("invalid token");
    done(jwtError, null);
  }
});

const GoogleStrategy = new googleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/api/auth/google/callback",
  },
  async function (accessToken, refreshToken, profile, done) {
    try {
      let user = await UserModel.findOne({ googleId: profile.id });

      if (user) {
        return done(null, user);
      }

      const newUser = new UserModel({
        googleId: profile.id,
      });

      await newUser.save();

      return done(null, newUser);
    } catch (error) {
      return done(error, false);
    }
  }
);

export default async function initializePassport() {
  passport.use(BearerStrategy);
  passport.use(GoogleStrategy);
}
