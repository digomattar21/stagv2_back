"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const news_1 = require("../../../controllers/news");
const newsRouter = (0, express_1.Router)();
newsRouter.get("/", news_1.getNews);
exports.default = newsRouter;
