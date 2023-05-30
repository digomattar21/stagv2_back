"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const SubmittedArticeSchema = new Schema({
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
  user: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  mainImageUrl: {
    type: String,
    required: false,
  },
});
const SubmittedArticle = mongoose_1.default.model(
  "submitted-article",
  SubmittedArticeSchema
);
exports.default = SubmittedArticle;
