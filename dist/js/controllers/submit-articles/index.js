"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.articleSubmission = void 0;
const cloudinary_1 = require("cloudinary");
const SubmittedArticle_1 = __importDefault(
  require("../../models/SubmittedArticle")
);
const User_1 = __importDefault(require("../../models/User"));
const articleSubmission = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      if (checkArticleBody(req.body)) {
        throw new Error("Invalid article body");
      }
      config();
      const user = yield User_1.default.findById(req.userId);
      let response;
      if (req.file) {
        response = yield new Promise((resolve, reject) => {
          const uploadStream = cloudinary_1.v2.uploader.upload_stream(
            { resource_type: "auto" },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            }
          );
          return uploadStream.end(req.file.buffer);
        });
      }
      const secure_url = response.secure_url;
      //verify upload, get the secure_url from response and save to mongo
      // const newArticle: any = new Article();
      const articleData = {
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        category: req.body.category,
        user,
        author: user === null || user === void 0 ? void 0 : user.name,
        mainImageUrl: secure_url,
      };
      const submittedArticle = new SubmittedArticle_1.default(articleData);
      yield submittedArticle.save();
      res.status(200).json({ success: true });
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  });
exports.articleSubmission = articleSubmission;
const checkArticleBody = (body) => {
  return (
    !body.title ||
    !body.description ||
    !body.content ||
    !body.category ||
    body.title === "" ||
    body.description === "" ||
    body.content === "" ||
    body.category === ""
  );
};
const config = () => {
  return cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_KEY_SECRET,
  });
};
