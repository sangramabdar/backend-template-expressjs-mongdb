"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseBodyBuilder {
    constructor() {
        this.timeStamp = Date.now();
        this.error = "";
        this.statusCode = 200;
        this.data = null;
    }
    setError(error) {
        this.error = error;
        return this;
    }
    setStatusCode(statusCode) {
        this.statusCode = statusCode;
        return this;
    }
    setData(data) {
        this.data = data;
        return this;
    }
    build() {
        return this;
    }
}
exports.default = ResponseBodyBuilder;
