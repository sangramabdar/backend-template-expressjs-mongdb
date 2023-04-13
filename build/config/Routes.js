"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const initializeServer_1 = require("./initializeServer");
const root_router_1 = __importDefault(require("../modules/root/root.router"));
const auth_router_1 = __importDefault(require("../modules/auth/auth.router"));
const errorMiddleware_1 = require("../utils/errorMiddleware");
const logger_1 = require("../utils/logger");
const root_controller_1 = __importDefault(require("../modules/root/root.controller"));
const passport_1 = __importDefault(require("passport"));
async function initializeRoutes() {
    //routers to handle different routes
    initializeServer_1.app.use("/", root_router_1.default);
    initializeServer_1.app.use("/api/auth", auth_router_1.default);
    initializeServer_1.app.use(passport_1.default.authenticate("bearer", {
        session: false,
    }));
    initializeServer_1.app.use("/api/private", root_controller_1.default.privateRoute);
    initializeServer_1.app.use("*", errorMiddleware_1.invalidPathHandler);
    //global error handling middleware
    initializeServer_1.app.use(logger_1.errorLogger);
    initializeServer_1.app.use(errorMiddleware_1.handleClientError);
    initializeServer_1.app.use(errorMiddleware_1.handleError);
}
exports.default = initializeRoutes;
