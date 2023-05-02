import { Router } from "express";
import { getNews } from "../../../controllers/news";
import { requireAuth } from "../../../middlewares/auth";
import { articleSubmission } from "../../../controllers/submit-articles";

const privateArticlesRouter: Router = Router();

privateArticlesRouter.post(
  "/articles-submission",
  requireAuth,
  articleSubmission
);

export default privateArticlesRouter;
