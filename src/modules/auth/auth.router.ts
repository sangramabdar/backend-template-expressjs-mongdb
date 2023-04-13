import { Router } from "express";

import { validateLoginDto, validateSignUpDto } from "./auth.dto";
import {
  googleLoginController,
  loginController,
  signUpController,
} from "./auth.controller";
import passport from "passport";

const authRouter = Router();

authRouter.post("/signup", validateSignUpDto, signUpController);
authRouter.post("/login", validateLoginDto, loginController);
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
  }),
  googleLoginController
);

export default authRouter;
