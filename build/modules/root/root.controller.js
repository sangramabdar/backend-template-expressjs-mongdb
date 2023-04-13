"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RootController {
    static async get(req, res) {
        res.send("app");
    }
    static async privateRoute(req, res, next) {
        console.log(req.user);
        res.json({
            private: true,
        });
    }
}
exports.default = RootController;
