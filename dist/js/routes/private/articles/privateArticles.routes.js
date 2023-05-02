"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../../middlewares/auth");
const submit_articles_1 = require("../../../controllers/submit-articles");
const privateArticlesRouter = (0, express_1.Router)();
privateArticlesRouter.post("/articles-submission", auth_1.requireAuth, submit_articles_1.articleSubmission);
exports.default = privateArticlesRouter;
