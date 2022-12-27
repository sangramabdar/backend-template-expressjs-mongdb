"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = exports.errorLogger = void 0;
function requestLogger(req, res, next) {
    console.log(`${req.method} : ${req.url}`);
    next();
}
exports.requestLogger = requestLogger;
function errorLogger(error, req, res, next) {
    console.log(`error - ${error.message}`);
    next(error);
}
exports.errorLogger = errorLogger;
