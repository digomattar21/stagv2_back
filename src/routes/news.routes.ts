import { Router } from "express";
import { getNews } from "../controllers/news";

const newsRouter: Router = Router();

newsRouter.get("/", getNews);

export default newsRouter;
