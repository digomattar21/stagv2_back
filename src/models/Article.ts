import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  mainImageUrl: {
    type: String,
    required: false,
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
  content: {
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

const Article = mongoose.model("article", ArticleSchema);

export default Article;
