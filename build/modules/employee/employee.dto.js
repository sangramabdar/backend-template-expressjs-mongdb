"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmployeeDto = void 0;
const exceptions_1 = require("../../common/helper/exceptions");
const utils_1 = require("../../common/helper/utils");
const schema_1 = require("../../common/schema-validation/schema");
const employeeDto = (0, schema_1.buildSchema)({
    name: (0, schema_1.string)().min(3).max(20),
    age: (0, schema_1.number)().min(18).max(60),
    salary: (0, schema_1.number)().min(1).max(Number.MAX_VALUE),
});
async function validateEmployeeDto(request, response, next) {
    try {
        request.body = (0, utils_1.trimAllStrings)(request.body);
        request.body = await (0, schema_1.validateSchema)(employeeDto, request.body, "complete");
        next();
    }
    catch (error) {
        error = new exceptions_1.BadRequest(error.message);
        next(error);
    }
}
exports.validateEmployeeDto = validateEmployeeDto;
