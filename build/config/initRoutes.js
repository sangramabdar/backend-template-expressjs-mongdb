"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const initServer_1 = require("./initServer");
const root_router_1 = __importDefault(require("../modules/root/root.router"));
const auth_router_1 = __importDefault(require("../modules/auth/auth.router"));
const errorMiddleware_1 = require("../utils/errorMiddleware");
const logger_1 = require("../utils/logger");
async function initRoutes() {
    //routers to handle different routes
    initServer_1.app.use("/", root_router_1.default);
    initServer_1.app.use("/api/auth", auth_router_1.default);
    initServer_1.app.use("*", errorMiddleware_1.invalidPathHandler);
    //global error handling middleware
    initServer_1.app.use(logger_1.errorLogger);
    initServer_1.app.use(errorMiddleware_1.handleClientError);
    initServer_1.app.use(errorMiddleware_1.handleError);
}
exports.default = initRoutes;
