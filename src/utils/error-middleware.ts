import { Response, Request, NextFunction } from "express";
import { CustomError } from "./exceptions";
import ResponseBodyBuilder from "./response-body-builder";

async function handleError(error: Error, req: Request, res: Response, next) {
  const responseBody = new ResponseBodyBuilder();

  responseBody.setStatusCode(500);
  responseBody.setError(error.message);

  res.status(500).json(responseBody);
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
  next(error);
}

function invalidPathHandler(
  request: Request,
  response: Response,
  next: NextFunction
) {
  response.status(404).json({
    error: "invalid path",
  });
}

export { handleClientError, handleError, invalidPathHandler };
