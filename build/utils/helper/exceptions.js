"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequest = exports.CustomError = exports.Unauthorized = exports.NotRegistered = exports.EmailExists = exports.WrongContent = exports.NotFound = exports.DataBaseConnectionError = void 0;
class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = null;
        this.statusCode = statusCode;
    }
    setMessage(message) {
        this.message = message;
    }
}
exports.CustomError = CustomError;
class BadRequest extends CustomError {
    constructor(message = "bad request") {
        super(message, 400);
    }
}
exports.BadRequest = BadRequest;
class DataBaseConnectionError extends CustomError {
    constructor() {
        super(DataBaseConnectionError.message, 500);
    }
}
exports.DataBaseConnectionError = DataBaseConnectionError;
DataBaseConnectionError.message = "db connection error";
class NotFound extends CustomError {
    constructor(entity) {
        super(`${entity} ${NotFound.message}`, 404);
    }
}
exports.NotFound = NotFound;
NotFound.message = "not found";
class WrongContent extends CustomError {
    constructor(message) {
        super(message, 404);
    }
}
exports.WrongContent = WrongContent;
class EmailExists extends CustomError {
    constructor() {
        super(EmailExists.message, 401);
    }
}
exports.EmailExists = EmailExists;
EmailExists.message = "email already exists";
class NotRegistered extends CustomError {
    constructor() {
        super(NotRegistered.message, 401);
    }
}
exports.NotRegistered = NotRegistered;
NotRegistered.message = "email is not registered";
class Unauthorized extends CustomError {
    constructor() {
        super(Unauthorized.message, 401);
    }
}
exports.Unauthorized = Unauthorized;
Unauthorized.message = "unauthorized";
