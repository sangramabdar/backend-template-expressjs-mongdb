"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const root_controller_1 = __importDefault(require("./root.controller"));
const RootRouter = (0, express_1.Router)();
RootRouter.get("/", root_controller_1.default.get);
exports.default = RootRouter;
