import { Router } from "express";

import { validateLoginDto, validateSignUpDto } from "./auth.dto";
import { loginController, signupController } from "./auth.controller";

const authRouter = Router();

authRouter.post("/signup", validateSignUpDto, signupController);

authRouter.post("/login", validateLoginDto, loginController);

export default authRouter;
