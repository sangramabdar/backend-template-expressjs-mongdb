import { Response, Request } from "express";

import { loginService, signUpService } from "./auth.service";
import ResponseBodyBuilder from "../../utils/response-body-builder";
import { generateAccessToken } from "../../utils/validation";

async function loginController(req: Request, res: Response, next) {
  const result = await loginService(req).catch(next);

  if (!result) return;

  const accessToken = await generateAccessToken(result, "24h");

  const responseBody = new ResponseBodyBuilder()
    .setStatusCode(200)
    .setData({ accessToken, _id: result._id });

  res.status(200).json(responseBody);
}

async function signupController(req: Request, res: Response, next) {
  const result = await signUpService(req).catch(next);

  if (!result) return;

  const responseBody = new ResponseBodyBuilder()
    .setStatusCode(201)
    .setData(result);

  res.status(201).json(responseBody);
}

export { loginController, signupController };
