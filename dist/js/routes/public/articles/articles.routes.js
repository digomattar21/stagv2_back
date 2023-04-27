"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const articles_1 = require("../../../controllers/articles");
const articlesRouter = (0, express_1.Router)();
articlesRouter.get("/", articles_1.getMainArticles);
exports.default = articlesRouter;
