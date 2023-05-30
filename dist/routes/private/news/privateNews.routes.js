"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const news_1 = require("../../../controllers/news");
const auth_1 = require("../../../middlewares/auth");
const privateNewsRouter = (0, express_1.Router)();
privateNewsRouter.get("/", auth_1.requireAuth, news_1.getNews);
exports.default = privateNewsRouter;
