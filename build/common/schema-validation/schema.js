"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _StringSchema_max, _StringSchema_min, _StringSchema_onlyAlphabets, _StringSchema_onlyDigits, _StringSchema_isEmail, _NumberSchema_isNotNegative, _NumberSchema_max, _NumberSchema_min;
Object.defineProperty(exports, "__esModule", { value: true });
exports.string = exports.number = exports.validateSchema = exports.buildSchema = exports.NumberSchema = exports.StringSchema = exports.Schema = void 0;
function buildSchema(Schema) {
    for (let key in Schema) {
        Schema[key].setKey(key);
    }
    return Schema;
}
exports.buildSchema = buildSchema;
class Schema {
    constructor() {
        this.filters = [];
        this.type = "";
        this.key = "";
        // #contains = (name: T) => {
        //   for (let value of this.values) {
        //     if (value === name) return true;
        //   }
        //   return false;
        // };
        // of(values: T[]) {
        //   let s = "";
        //   values.forEach((element, index) => {
        //     if (index === values.length - 1) {
        //       s += element;
        //       return;
        //     }
        //     s += element + " or ";
        //   });
        //   this.values = values;
        //   this.filters.push({
        //     filter: this.#contains,
        //     error: `must be ${s}`,
        //   });
        //   return this;
        // }
    }
    // protected values: T[] = [];
    setKey(key) {
        this.key = key;
    }
    validate(value) {
        //type validation
        if (typeof value !== this.type) {
            throw new Error(`${this.key} must be ${this.type}`);
        }
        //constraint validation
        for (let { filter, error } of this.filters) {
            if (!filter(value)) {
                throw new Error(this.key + " " + error);
            }
        }
    }
}
exports.Schema = Schema;
class StringSchema extends Schema {
    constructor() {
        super();
        this.maxLength = 0;
        this.minLength = 0;
        _StringSchema_max.set(this, (name) => name.trimStart().trimEnd().length <= this.maxLength);
        _StringSchema_min.set(this, (name) => name.trimStart().trimEnd().length >= this.minLength);
        _StringSchema_onlyAlphabets.set(this, (name) => {
            let newData = name.trimStart().trimEnd();
            let format = /^[A-Za-z]+$/;
            if (!format.test(newData))
                return false;
            return true;
        });
        _StringSchema_onlyDigits.set(this, (name) => {
            let format = /^[0-9]+$/;
            if (!format.test(name))
                return false;
            return true;
        });
        _StringSchema_isEmail.set(this, (name) => {
            let format = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!format.test(name))
                return false;
            return true;
        });
        this.type = "string";
    }
    max(length) {
        this.maxLength = length;
        this.filters.push({
            filter: __classPrivateFieldGet(this, _StringSchema_max, "f"),
            error: `should contain at most ${length} characters,`,
        });
        return this;
    }
    min(length) {
        this.minLength = length;
        this.filters.push({
            filter: __classPrivateFieldGet(this, _StringSchema_min, "f"),
            error: `should contain at least ${length} characters,`,
        });
        return this;
    }
    onlyAlphabets() {
        this.filters.push({
            filter: __classPrivateFieldGet(this, _StringSchema_onlyAlphabets, "f"),
            error: `should contain only alphabets`,
        });
        return this;
    }
    onlyDigits() {
        this.filters.push({
            filter: __classPrivateFieldGet(this, _StringSchema_onlyDigits, "f"),
            error: `should contain only numbers`,
        });
        return this;
    }
    email() {
        this.filters.push({
            filter: __classPrivateFieldGet(this, _StringSchema_isEmail, "f"),
            error: `must be a valid email`,
        });
        return this;
    }
}
exports.StringSchema = StringSchema;
_StringSchema_max = new WeakMap(), _StringSchema_min = new WeakMap(), _StringSchema_onlyAlphabets = new WeakMap(), _StringSchema_onlyDigits = new WeakMap(), _StringSchema_isEmail = new WeakMap();
class NumberSchema extends Schema {
    constructor() {
        super();
        this.maxNumber = 0;
        this.minNUmber = 0;
        _NumberSchema_isNotNegative.set(this, (value) => value >= 0);
        _NumberSchema_max.set(this, (value) => value <= this.maxNumber);
        _NumberSchema_min.set(this, (value) => value >= this.minNUmber);
        this.type = "number";
    }
    max(value) {
        this.maxNumber = value;
        this.filters.push({
            filter: __classPrivateFieldGet(this, _NumberSchema_max, "f"),
            error: `should be less than ${this.maxNumber}`,
        });
        return this;
    }
    min(value) {
        this.minNUmber = value;
        this.filters.push({
            filter: __classPrivateFieldGet(this, _NumberSchema_min, "f"),
            error: `should be greater than ${this.minNUmber}`,
        });
        return this;
    }
    notNegative() {
        this.filters.push({
            filter: __classPrivateFieldGet(this, _NumberSchema_isNotNegative, "f"),
            error: `must not be negative`,
        });
        return this;
    }
}
exports.NumberSchema = NumberSchema;
_NumberSchema_isNotNegative = new WeakMap(), _NumberSchema_max = new WeakMap(), _NumberSchema_min = new WeakMap();
function string() {
    return new StringSchema();
}
exports.string = string;
function number() {
    return new NumberSchema();
}
exports.number = number;
async function validateSchema(schema, data, operation) {
    let newObject = {};
    switch (operation) {
        case "complete":
            //validate all keys
            for (let key in schema) {
                if (!(key in data)) {
                    throw new Error(`${key} must be there`);
                }
            }
            for (let key in schema) {
                //each key validation
                schema[key].validate(data[key]);
                newObject[key] = data[key];
            }
            break;
        case "partial":
            for (let key in data) {
                if (key in schema) {
                    //each key validation
                    schema[key].validate(data[key]);
                    newObject[key] = data[key];
                }
            }
            if (Object.keys(newObject).length === 0) {
                throw new Error("invalid object");
            }
            break;
    }
    return newObject;
}
exports.validateSchema = validateSchema;
