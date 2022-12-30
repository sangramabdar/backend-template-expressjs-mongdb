import { Response, Request } from "express";

import { loginService, signUpService } from "./auth.service";
import ResponseBodyBuilder from "../../utils/responseBodyBuilder";

async function loginController(req: Request, res: Response, next) {
  const [data, error] = await loginService(req);

  if (error) return next(error);

  const responseBody = new ResponseBodyBuilder()
    .setStatusCode(200)
    .setData(data);

  res.status(200).json(responseBody);
}

async function signUpController(req: Request, res: Response, next) {
  const [data, error] = await signUpService(req);

  if (error) return next(error);

  const responseBody = new ResponseBodyBuilder()
    .setStatusCode(201)
    .setData(data);

  res.status(201).json(responseBody);
}

export { loginController, signUpController };
