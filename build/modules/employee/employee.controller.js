"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const employee_service_1 = require("./employee.service");
const response_body_builder_1 = __importDefault(require("../../utils/response-body-builder"));
class EmployeeController {
    static async getEmployee(request, response, next) {
        try {
            const result = await (0, employee_service_1.getEmployeeService)(request);
            const responseBody = new response_body_builder_1.default()
                .setData(result)
                .setStatusCode(200);
            return response.status(200).json(responseBody);
        }
        catch (error) {
            next(error);
        }
    }
    static async getAllEmployees(request, response, next) {
        try {
            const result = await (0, employee_service_1.getEmployeesService)(request);
            let responseBody = new response_body_builder_1.default().setData(result);
            return response.json(responseBody);
        }
        catch (error) {
            next(error);
        }
    }
    static async saveEmployee(request, response, next) {
        try {
            const result = await (0, employee_service_1.saveEmployeeService)(request);
            let responseBody = new response_body_builder_1.default()
                .setStatusCode(201)
                .setData(result);
            return response.status(201).json(responseBody);
        }
        catch (error) {
            next(error);
        }
    }
    static async updateEmployee(request, response, next) {
        try {
            const result = await (0, employee_service_1.updateEmployeeService)(request);
            const responseBody = new response_body_builder_1.default().setData(result);
            return response.json(responseBody);
        }
        catch (error) {
            next(error);
        }
    }
    static async deleteEmployee(request, response, next) {
        try {
            const result = await (0, employee_service_1.deleteEmployeeService)(request);
            const responseBody = new response_body_builder_1.default().setData(result);
            return response.json(responseBody);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = EmployeeController;
