import { Router } from "express";
import { getNews } from "../../../controllers/news";
import { requireAuth } from "../../../middlewares/auth";
import { articleSubmission } from "../../../controllers/submit-articles";
import * as cloudinary from "cloudinary";
import multer from "multer";
import { getSubmittedArticles } from "../../../controllers/articles";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_KEY_SECRET,
});

// Configure multer memory storage
const upload = multer({ storage: multer.memoryStorage() });

const privateArticlesRouter: Router = Router();

privateArticlesRouter.post(
  "/articles-submission",
  requireAuth,
  upload.single("file"),
  articleSubmission
);

privateArticlesRouter.get(
  "/admin/submitted",
  requireAuth,
  getSubmittedArticles
);

export default privateArticlesRouter;
