"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const ArticleSchema = new Schema({
    category: {
        type: String,
        required: true,
    },
    headline: {
        type: String,
        required: false,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    publishedAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    author: {
        type: String,
        required: true,
    },
});
const Article = mongoose_1.default.model("article", ArticleSchema);
exports.default = Article;
