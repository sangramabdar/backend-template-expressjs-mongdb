"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const init_server_1 = require("./init-server");
const root_router_1 = __importDefault(require("../modules/root/root.router"));
const auth_router_1 = __importDefault(require("../modules/auth/auth.router"));
const error_middleware_1 = require("../utils/error-middleware");
const logger_1 = require("../utils/logger");
async function initRoutes() {
    //routers to handle different routes
    init_server_1.app.use("/", root_router_1.default);
    init_server_1.app.use("/api/auth", auth_router_1.default);
    init_server_1.app.use("*", error_middleware_1.invalidPathHandler);
    //global error handling middleware
    init_server_1.app.use(logger_1.errorLogger);
    init_server_1.app.use(error_middleware_1.handleClientError);
    init_server_1.app.use(error_middleware_1.handleError);
}
exports.default = initRoutes;
