import { Router } from "express";
import { getNews } from "../../../controllers/news";
import { requireAuth } from "../../../middlewares/auth";

const privateNewsRouter: Router = Router();

privateNewsRouter.get("/", requireAuth, getNews);

export default privateNewsRouter;
