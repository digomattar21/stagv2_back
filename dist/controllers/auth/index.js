"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = exports.login = void 0;
const login_1 = require("../../util/validation/login");
const User_1 = __importDefault(require("../../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register_1 = require("../../util/validation/register");
const gravatar_1 = __importDefault(require("gravatar"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { errors, isValid } = (0, login_1.validateLoginInput)(req.body);
        if (!isValid) {
            throw errors;
        }
        const email = req.body.email;
        const password = req.body.password;
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            errors.message = "User not found";
            throw errors;
        }
        const matched = yield bcryptjs_1.default.compare(password, user.password);
        if (!matched) {
            errors.message = "Incorrect Password";
            throw errors;
        }
        const payload = {
            id: user.id,
            email: user.email,
            name: user.name,
            avatar: user.avatar,
            admin: user.role === "admin",
        };
        const token = yield jsonwebtoken_1.default.sign(payload, `${process.env.JWT_SECRET}`);
        res.status(200).json({ success: true, token });
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.login = login;
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { errors, isValid } = (0, register_1.validateRegisterInput)(req.body);
        if (!isValid) {
            throw errors;
        }
        const user = yield User_1.default.findOne({ email: req.body.email });
        if (user) {
            errors.message = "Email already exists";
            throw errors;
        }
        const avatar = gravatar_1.default.url(req.body.email, {
            s: "200",
            r: "pg",
            d: "mm",
        });
        const newUser = new User_1.default({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            avatar: avatar,
        });
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hash = yield bcryptjs_1.default.hash(newUser.password, salt);
        newUser.password = hash;
        const savedUser = yield newUser.save();
        const payload = {
            id: savedUser.id,
            email: savedUser.email,
            name: savedUser.name,
            avatar: savedUser.avatar,
        };
        const token = yield jsonwebtoken_1.default.sign(payload, `${process.env.JWT_SECRET}`);
        res.status(200).json(Object.assign(Object.assign({}, savedUser), { token }));
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.signUp = signUp;
