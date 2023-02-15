import passport from "passport";
import { Strategy } from "passport-http-bearer";
import { verifyAccessToken } from "../utils/jwt";
import { JWTError } from "../utils/exceptions";

export default async function initializePassport() {
  passport.use(
    new Strategy(async function (token, done) {
      try {
        const payload = await verifyAccessToken(token);
        return done(false, payload);
      } catch (error) {
        const jwtError = new JWTError("invalid token");
        done(jwtError, null);
      }
    })
  );
}
