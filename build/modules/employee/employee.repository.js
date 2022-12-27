"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmployeeById = exports.deleteEmployee = exports.updateEmployeeById = exports.saveEmployee = exports.getAllEmployees = void 0;
const db_1 = __importDefault(require("../../config/db"));
const mongodb_1 = require("mongodb");
async function getAllEmployees(userId) {
    let db = await db_1.default.getDb();
    let employees = await db
        .collection("employees")
        .find({
        createdById: userId,
    })
        .toArray();
    if (!employees)
        return null;
    return employees;
}
exports.getAllEmployees = getAllEmployees;
async function getEmployeeById(id) {
    let db = await db_1.default.getDb();
    const _id = new mongodb_1.ObjectId(id);
    const findObject = { _id };
    const employee = await db.collection("employees").findOne(findObject);
    if (!employee)
        return null;
    return employee;
}
exports.getEmployeeById = getEmployeeById;
async function saveEmployee(employee) {
    let db = await db_1.default.getDb();
    let insertResult = await db.collection("employees").insertOne(employee);
    return insertResult;
}
exports.saveEmployee = saveEmployee;
async function updateEmployeeById(id, employee, userId) {
    let db = await db_1.default.getDb();
    let _id = new mongodb_1.ObjectId(id);
    let updateObject = { _id, createdById: userId };
    let updateResult = await db.collection("employees").updateOne(updateObject, {
        $set: employee,
    });
    if (updateResult.matchedCount === 0)
        return null;
    return "updated";
}
exports.updateEmployeeById = updateEmployeeById;
async function deleteEmployee(id, userId) {
    let db = await db_1.default.getDb();
    let _id = new mongodb_1.ObjectId(id);
    let deleteObject = { _id, createdById: userId };
    let deleteResult = await db.collection("employees").deleteOne(deleteObject);
    if (deleteResult.deletedCount === 0)
        return null;
    return "deleted";
}
exports.deleteEmployee = deleteEmployee;
