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
exports.getNews = void 0;
const axios_1 = __importDefault(require("axios"));
// import { ITodo } from "./../../types/todo"
// import Todo from "../../models/todo"
const getNews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const yesterday = new Date().toISOString().split("T")[0];
        const today = new Date().toISOString().split("T")[0];
        const uri = `${process.env.NEWS_API_BASE_URL}?from=${yesterday}&to=${today}&language=pt&q=ibovespa OR ibov OR (bolsa AND (mercado OR ibovespa OR bancos OR valores)) OR (bolsa AND valores) OR fintech OR fintechs&apiKey=${process.env.NEWS_API_KEY}`;
        console.log(uri);
        const response = yield axios_1.default.get(uri);
        console.log(response.data);
        res.status(200).json({ news: response.data.articles });
    }
    catch (error) {
        throw error;
    }
});
exports.getNews = getNews;
