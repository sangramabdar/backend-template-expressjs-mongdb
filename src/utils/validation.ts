import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import { BadRequest, CustomError, Unauthorized } from "./exceptions";

async function validateId(req: Request, res: Response, next) {
  let id = req.params["id"];
  let isValid = ObjectId.isValid(id);
  if (!isValid) {
    let error = new BadRequest("id is in wrong format");
    return next(error);
  }
  next();
}

async function validateBody(req: Request, res: Response, next) {
  if (Object.keys(req.body).length == 0) {
    let error = new BadRequest("id is in wrong format");
    return next(error);
  }

  next();
}

async function validateToken(req: Request, res: Response, next) {
  let error = new Unauthorized();
  try {
    const token = req.headers["authorization"];

    if (!token) {
      error.setMessage("authorization header is not provided in headers");
      return next(error);
    }

    const tokenPart = token.split(" ")[1];

    if (!tokenPart) {
      error.setMessage("authorization header is not in correct format");
      return next(error);
    }

    const user = await verifyAccessToken(tokenPart);

    req.user = user;

    next();
  } catch (error) {
    error = new CustomError("token is invalid or expired", 403);
    next(error);
  }
}

async function generateAccessToken(payload: any, expiresIn: string = "") {
  let accessToken;
  if (expiresIn == "") {
    accessToken = await jwt.sign(payload, process.env.ACCESS_KEY);
  } else {
    accessToken = await jwt.sign(payload, process.env.ACCESS_KEY, {
      expiresIn,
    });
  }

  return accessToken;
}

async function generateRefreshToken(payload: any, expiresIn: string = "") {
  let refreshToken;
  if (expiresIn == "") {
    refreshToken = await jwt.sign(payload, process.env.REFRESH_KEY);
  } else {
    refreshToken = await jwt.sign(payload, process.env.REFRESH_KEY, {
      expiresIn,
    });
  }

  return refreshToken;
}

async function verifyAccessToken(token: string): Promise<jwt.JwtPayload> {
  const data = await jwt.verify(token, process.env.ACCESS_KEY);
  delete data.iat;
  delete data.exp;
  return data;
}

async function verifyRefreshToken(token: string): Promise<jwt.JwtPayload> {
  const data = await jwt.verify(token, process.env.REFRESH_KEY);
  delete data.iat;
  delete data.exp;
  return data;
}

export {
  validateId,
  validateBody,
  validateToken,
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  verifyAccessToken,
};
