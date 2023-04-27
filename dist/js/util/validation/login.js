"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLoginInput = void 0;
const validator_1 = __importDefault(require("validator"));
const is_empty_1 = require("./is-empty");
const validateLoginInput = (data) => {
    let errors = {};
    try {
        data.email = !(0, is_empty_1.isEmpty)(data.email) ? data.email : "";
        data.password = !(0, is_empty_1.isEmpty)(data.password) ? data.password : "";
        if (!validator_1.default.isEmail(data.email)) {
            errors.message = "Email is invalid";
        }
        if (validator_1.default.isEmpty(data.email)) {
            errors.message = "Email is required";
        }
        if (!validator_1.default.isLength(data.password, { min: 6, max: 30 })) {
            errors.message = "Password must have 6 chars";
        }
        if (validator_1.default.isEmpty(data.password)) {
            errors.message = "Password is required";
        }
        return {
            errors,
            isValid: (0, is_empty_1.isEmpty)(errors),
        };
    }
    catch (error) {
        return {
            errors,
            isValid: (0, is_empty_1.isEmpty)(errors),
        };
    }
};
exports.validateLoginInput = validateLoginInput;
