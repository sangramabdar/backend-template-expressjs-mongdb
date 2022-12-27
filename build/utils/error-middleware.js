"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalidPathHandler = exports.handleError = exports.handleClientError = void 0;
const response_body_builder_1 = __importDefault(require("./response-body-builder"));
async function handleError(error, req, res, next) {
    const responseBody = new response_body_builder_1.default();
    responseBody.setStatusCode(500);
    responseBody.setError(error.message);
    res.status(500).json(responseBody);
}
exports.handleError = handleError;
async function handleClientError(error, req, res, next) {
    const responseBody = new response_body_builder_1.default();
    if (error.statusCode) {
        responseBody.setStatusCode(error.statusCode);
        responseBody.setError(error.message);
        res.status(error.statusCode).json(responseBody);
        return;
    }
    next(error);
}
exports.handleClientError = handleClientError;
function invalidPathHandler(request, response, next) {
    response.status(404).json({
        error: "invalid path",
    });
}
exports.invalidPathHandler = invalidPathHandler;
