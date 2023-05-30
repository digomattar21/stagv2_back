import { Request, Response } from "express";
import Article from "../../models/Article";
import SubmittedArticle from "../../models/SubmittedArticle";

export const getMainArticles = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const response = await Article.find();
    res.status(200).json({ articles: response });
  } catch (error) {
    throw error;
  }
};

export const getSubmittedArticles = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const response = await SubmittedArticle.find();
    console.log("response", response);
    res.status(200).json({ articles: response });
  } catch (error) {
    throw error;
  }
};
