import { NextFunction, Request, Response } from "express";

function requestLogger(req: Request, res: Response, next) {
  console.log(`${req.method} : ${req.url}`);
  next();
}

function errorLogger(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(`error - ${error.message}`);
  next(error);
}

export { errorLogger, requestLogger };
