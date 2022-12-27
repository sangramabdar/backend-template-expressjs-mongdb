"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByEmail = exports.saveUser = void 0;
const User_1 = __importDefault(require("../../models/User"));
async function saveUser(user) {
    const userDoc = new User_1.default(Object.assign({}, user));
    await userDoc.save();
    return {
        _id: userDoc._id,
    };
}
exports.saveUser = saveUser;
async function getUserByEmail(email) {
    const userDoc = await User_1.default.findOne({
        email,
    });
    if (!userDoc)
        return null;
    return userDoc;
}
exports.getUserByEmail = getUserByEmail;
