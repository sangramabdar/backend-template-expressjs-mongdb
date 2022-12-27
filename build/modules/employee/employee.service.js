"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveEmployeeService = exports.updateEmployeeService = exports.getEmployeesService = exports.deleteEmployeeService = exports.getEmployeeService = void 0;
const exceptions_1 = require("../../common/helper/exceptions");
const employee_repository_1 = require("./employee.repository");
async function getEmployeesService(req) {
    let userId = req.user._id;
    let employees = await (0, employee_repository_1.getAllEmployees)(userId);
    if (!employees)
        throw new exceptions_1.NotFound("employees");
    return employees;
}
exports.getEmployeesService = getEmployeesService;
async function getEmployeeService(req) {
    let id = req.params["id"];
    let employee = await (0, employee_repository_1.getEmployeeById)(id);
    if (!employee)
        throw new exceptions_1.NotFound("emlpoyee");
    return employee;
}
exports.getEmployeeService = getEmployeeService;
async function saveEmployeeService(req) {
    let employee = req.body;
    let user = req.user;
    employee.createdById = user._id;
    let result = await (0, employee_repository_1.saveEmployee)(employee);
    let savedEmployee = await (0, employee_repository_1.getEmployeeById)(result.insertedId.toString());
    return savedEmployee;
}
exports.saveEmployeeService = saveEmployeeService;
async function updateEmployeeService(req) {
    let employee = req.body;
    let id = req.params["id"];
    let userId = req.user._id;
    let employeeExists = await checkEmployeeExistsOrNot(req);
    if (!employeeExists)
        throw new exceptions_1.NotFound("employee");
    let result = await (0, employee_repository_1.updateEmployeeById)(id, employee, userId);
    if (!result)
        throw new exceptions_1.Unauthorized();
    return result;
}
exports.updateEmployeeService = updateEmployeeService;
async function deleteEmployeeService(req) {
    let id = req.params["id"];
    let userId = req.user._id;
    let employeeExists = await checkEmployeeExistsOrNot(req);
    if (!employeeExists)
        throw new exceptions_1.NotFound("employee");
    let result = await (0, employee_repository_1.deleteEmployee)(id, userId);
    if (!result)
        throw new exceptions_1.Unauthorized();
    return result;
}
exports.deleteEmployeeService = deleteEmployeeService;
async function checkEmployeeExistsOrNot(req) {
    let id = req.params["id"];
    let employee = await (0, employee_repository_1.getEmployeeById)(id);
    return employee ? true : false;
}
