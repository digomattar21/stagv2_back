"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegisterInput = void 0;
const validator_1 = __importDefault(require("validator"));
const is_empty_1 = require("./is-empty");
const validateRegisterInput = (data) => {
    let errors = {};
    try {
        data.name = !(0, is_empty_1.isEmpty)(data.name) ? data.name : "";
        data.email = !(0, is_empty_1.isEmpty)(data.email) ? data.email : "";
        data.password = !(0, is_empty_1.isEmpty)(data.password) ? data.password : "";
        data.password_confirm = !(0, is_empty_1.isEmpty)(data.password_confirm)
            ? data.password_confirm
            : "";
        if (!validator_1.default.isLength(data.name, { min: 2, max: 30 })) {
            errors.name = "Name must be between 2 to 30 chars";
        }
        if (validator_1.default.isEmpty(data.name)) {
            errors.name = "Name field is required";
        }
        if (!validator_1.default.isEmail(data.email)) {
            errors.email = "Email is invalid";
        }
        if (validator_1.default.isEmpty(data.email)) {
            errors.email = "Email is required";
        }
        if (!validator_1.default.isLength(data.password, { min: 6, max: 30 })) {
            errors.password = "Password must have 6 chars";
        }
        if (validator_1.default.isEmpty(data.password)) {
            errors.password = "Password is required";
        }
        if (!validator_1.default.isLength(data.passwordConfirm, { min: 6, max: 30 })) {
            errors.passwordConfirm = "Password must have 6 chars";
        }
        if (!validator_1.default.equals(data.password, data.passwordConfirm)) {
            errors.passwordConfirm = "Password and Confirm Password must match";
        }
        if (validator_1.default.isEmpty(data.passwordConfirm)) {
            errors.passwordConfirm = "Password is required";
        }
    }
    catch (error) {
        return {
            error,
            isValid: false,
        };
    }
    return {
        errors,
        isValid: (0, is_empty_1.isEmpty)(errors),
    };
};
exports.validateRegisterInput = validateRegisterInput;
