"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RootController {
    static async get(req, res) {
        res.send("app");
    }
}
exports.default = RootController;
