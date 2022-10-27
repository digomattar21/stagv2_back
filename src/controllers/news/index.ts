import { Response, Request } from "express";
import axios, { AxiosResponse } from "axios";
// import { ITodo } from "./../../types/todo"
// import Todo from "../../models/todo"

export const getNews = async (req: Request, res: Response): Promise<void> => {
  try {
    const yesterday = new Date().toISOString().split("T")[0];
    const today = new Date().toISOString().split("T")[0];
    const uri = `${process.env.NEWS_API_BASE_URL}?from=${yesterday}&to=${today}&language=pt&q=ibovespa OR ibov OR (bolsa AND (mercado OR ibovespa OR bancos OR valores)) OR (bolsa AND valores) OR fintech OR fintechs&apiKey=${process.env.NEWS_API_KEY}`;
    console.log(uri);
    const response: AxiosResponse<any> = await axios.get(uri);
    console.log(response.data);
    res.status(200).json({ news: response.data.articles });
  } catch (error) {
    throw error;
  }
};
