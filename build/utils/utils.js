"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trimAllStrings = void 0;
function trimAllStrings(body) {
    for (let key in body) {
        if (typeof body[key] === "string") {
            console.log(body[key]);
            body[key] = body[key].trimEnd().trimStart();
            console.log(body[key]);
        }
    }
    return body;
}
exports.trimAllStrings = trimAllStrings;
