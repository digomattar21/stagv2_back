import { Router } from "express";
import { getMainArticles } from "../../../controllers/articles";

const articlesRouter: Router = Router();

articlesRouter.get("/", getMainArticles);

export default articlesRouter;
