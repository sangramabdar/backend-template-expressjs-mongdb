import { Response, Request, NextFunction } from "express";
import { CustomError } from "./exceptions";
import ResponseBodyBuilder from "./responseBodyBuilder";

function invalidPathHandler(
  request: Request,
  response: Response,
  next: NextFunction
) {
  response.status(404).json({
    error: "invalid path",
  });
}

async function handleClientError(
  error: CustomError,
  req: Request,
  res: Response,
  next
) {
  const responseBody = new ResponseBodyBuilder();

  if (error.statusCode) {
    responseBody.setStatusCode(error.statusCode);
    responseBody.setError(error.message);
    res.status(error.statusCode).json(responseBody);
    return;
  }

  if (error.name === "ValidationError") {
    responseBody.setStatusCode(400);
    responseBody.setError(error.message);
    res.status(400).json(responseBody);
    return;
  }

  next(error);
}

async function handleError(error: Error, req: Request, res: Response, next) {
  const responseBody = new ResponseBodyBuilder();

  responseBody.setStatusCode(500);
  responseBody.setError(error.message);

  res.status(500).json(responseBody);
}

export { handleClientError, handleError, invalidPathHandler };
