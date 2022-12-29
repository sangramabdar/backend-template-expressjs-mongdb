import { Router } from "express";

import { validateLoginDto, validateSignUpDto } from "./auth.dto";
import { loginController, signUpController } from "./auth.controller";

const authRouter = Router();

authRouter.post("/signup", validateSignUpDto, signUpController);

authRouter.post("/login", validateLoginDto, loginController);

export default authRouter;
