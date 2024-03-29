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
exports.getSubmittedArticles = exports.getMainArticles = void 0;
const Article_1 = __importDefault(require("../../models/Article"));
const SubmittedArticle_1 = __importDefault(require("../../models/SubmittedArticle"));
const getMainArticles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield Article_1.default.find();
        res.status(200).json({ articles: response });
    }
    catch (error) {
        throw error;
    }
});
exports.getMainArticles = getMainArticles;
const getSubmittedArticles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield SubmittedArticle_1.default.find();
        console.log("response", response);
        res.status(200).json({ articles: response });
    }
    catch (error) {
        throw error;
    }
});
exports.getSubmittedArticles = getSubmittedArticles;
