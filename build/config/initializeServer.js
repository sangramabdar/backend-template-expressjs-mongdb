"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.initializeServer = void 0;
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("../utils/passport"));
const initializeDatabase_1 = __importDefault(require("./initializeDatabase"));
const initializeRoutes_1 = __importDefault(require("./initializeRoutes"));
const initializeOtherServices_1 = __importDefault(require("./initializeOtherServices"));
const PORT = process.env.PORT;
const app = (0, express_1.default)();
exports.app = app;
async function initializeServer() {
    await (0, initializeOtherServices_1.default)();
    await (0, passport_1.default)();
    await (0, initializeDatabase_1.default)();
    await (0, initializeRoutes_1.default)();
    app.listen(PORT, () => {
        console.log("server is started");
    });
}
exports.initializeServer = initializeServer;
