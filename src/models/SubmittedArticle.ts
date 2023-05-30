import mongoose from "mongoose";

const Schema = mongoose.Schema;

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

const SubmittedArticle = mongoose.model(
  "submitted-article",
  SubmittedArticeSchema
);

export default SubmittedArticle;
