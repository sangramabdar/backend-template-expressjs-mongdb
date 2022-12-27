"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.initServer = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const init_routes_1 = __importDefault(require("./init-routes"));
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = require("../utils/logger");
const PORT = 8080;
const app = (0, express_1.default)();
exports.app = app;
async function initServer() {
    app.use((0, cors_1.default)({ origin: true, credentials: true }));
    app.use(express_1.default.json({
        type: ["json"],
    }));
    app.use(logger_1.requestLogger);
    await mongoose_1.default.connect(process.env.DB_URL);
    await (0, init_routes_1.default)();
    app.listen(PORT, () => {
        console.log("server is started ");
    });
}
exports.initServer = initServer;
