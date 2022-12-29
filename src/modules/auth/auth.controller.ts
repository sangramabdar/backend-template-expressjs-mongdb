import { Response, Request } from "express";

import { loginService, signUpService } from "./auth.service";
import ResponseBodyBuilder from "../../utils/responseBodyBuilder";
import { generateAccessToken } from "../../utils/jwt";

async function loginController(req: Request, res: Response, next) {
  try {
    const result = await loginService(req);

    const accessToken = await generateAccessToken(result, "24h");

    const responseBody = new ResponseBodyBuilder()
      .setStatusCode(200)
      .setData({ accessToken, _id: result._id });

    res.status(200).json(responseBody);
  } catch (error) {
    next(error);
  }
}

async function signUpController(req: Request, res: Response, next) {
  try {
    const result = await signUpService(req);

    const responseBody = new ResponseBodyBuilder()
      .setStatusCode(201)
      .setData(result);

    res.status(201).json(responseBody);
  } catch (error) {
    next(error);
  }
}

export { loginController, signUpController };
