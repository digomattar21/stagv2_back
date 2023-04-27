import { Request, Response } from "express";
import Article from "../../models/Article";

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
