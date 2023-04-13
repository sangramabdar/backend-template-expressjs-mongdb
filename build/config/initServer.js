"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.initServer = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const initRoutes_1 = __importDefault(require("./initRoutes"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
const passport_1 = __importDefault(require("../utils/passport"));
const PORT = process.env.PORT;
const app = (0, express_1.default)();
exports.app = app;
async function initServer() {
    app.use((0, cors_1.default)({ origin: true, credentials: true }));
    app.use(express_1.default.json({
        type: ["json"],
    }));
    app.use((0, morgan_1.default)(":method - :url :status - :response-time ms"));
    await mongoose_1.default.connect(process.env.DB_URL);
    await (0, initRoutes_1.default)();
    await (0, passport_1.default)();
    app.listen(PORT, () => {
        console.log("server is started");
    });
}
exports.initServer = initServer;
