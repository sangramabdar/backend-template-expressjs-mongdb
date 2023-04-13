import { Response, Request } from "express";

import { loginService, signUpService } from "./auth.service";
import ResponseBodyBuilder from "../../utils/responseBodyBuilder";
import { generateAccessToken } from "../../utils/jwt";

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

async function googleLoginController(req: Request, res: Response, next) {
  const user = req.user as any;

  const accessToken = await generateAccessToken({
    _id: user._id,
    googleId: user.googleId,
  });

  const responebody = new ResponseBodyBuilder().setStatusCode(200).setData({
    accessToken,
    _id: user._id,
  });

  const url = `${process.env.CLIENT_URL}/google/?accessToken=${accessToken}`;

  res.redirect(url);
}

export { loginController, signUpController, googleLoginController };
