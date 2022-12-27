class CustomError extends Error {
  statusCode: number | null = null;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }

  setMessage(message: string) {
    this.message = message;
  }
}

class BadRequest extends CustomError {
  constructor(message: string = "bad request") {
    super(message, 400);
  }
}

class DataBaseConnectionError extends CustomError {
  private static message: string = "db connection error";
  constructor() {
    super(DataBaseConnectionError.message, 500);
  }
}

class NotFound extends CustomError {
  private static message: string = "not found";
  constructor(entity: string) {
    super(`${entity} ${NotFound.message}`, 404);
  }
}

class WrongContent extends CustomError {
  constructor(message: string) {
    super(message, 404);
  }
}

class EmailExists extends CustomError {
  private static message: string = "email already exists";
  constructor() {
    super(EmailExists.message, 401);
  }
}

class NotRegistered extends CustomError {
  private static message: string = "email is not registered";
  constructor() {
    super(NotRegistered.message, 401);
  }
}

class Unauthorized extends CustomError {
  private static message: string = "unauthorized";
  constructor() {
    super(Unauthorized.message, 401);
  }
}

export {
  DataBaseConnectionError,
  NotFound,
  WrongContent,
  EmailExists,
  NotRegistered,
  Unauthorized,
  CustomError,
  BadRequest,
};
