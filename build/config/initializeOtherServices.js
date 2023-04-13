"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const initializeServer_1 = require("./initializeServer");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
async function initializeOtherServices() {
    initializeServer_1.app.use((0, cors_1.default)({ origin: true, credentials: true }));
    initializeServer_1.app.use(express_1.default.json({
        type: ["json"],
    }));
    initializeServer_1.app.use((0, morgan_1.default)(":method - :url :status - :response-time ms"));
}
exports.default = initializeOtherServices;
