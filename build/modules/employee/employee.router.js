"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employee_dto_1 = require("./employee.dto");
const employee_controller_1 = __importDefault(require("./employee.controller"));
const validation_1 = require("../../utils/validation");
const employeeRouter = (0, express_1.Router)();
employeeRouter.use("/", validation_1.validateToken);
employeeRouter.use("/:id", validation_1.validateId);
employeeRouter.get("/:id", employee_controller_1.default.getEmployee);
employeeRouter.get("", employee_controller_1.default.getAllEmployees);
employeeRouter.post("/", employee_dto_1.validateEmployeeDto, employee_controller_1.default.saveEmployee);
employeeRouter.put("/:id", employee_dto_1.validateEmployeeDto, employee_controller_1.default.updateEmployee);
employeeRouter.delete("/:id", employee_controller_1.default.deleteEmployee);
exports.default = employeeRouter;
