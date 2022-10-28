import { Response, Request } from "express";
import axios, { AxiosResponse } from "axios";
import { mountNewsQuery } from "../../util/news/newsQueryMounter";
// import { ITodo } from "./../../types/todo"
// import Todo from "../../models/todo"

export const getNews = async (req: Request, res: Response): Promise<void> => {
  try {
    const yesterday: string = new Date().toISOString().split("T")[0];
    const today = new Date().toISOString().split("T")[0];

    const uri: string = mountNewsQuery({
      type: "everything",
      language: "pt",
      q: "technology",
      from: yesterday,
      to: today,
    });
    console.log(uri);
    const response: AxiosResponse<any> = await axios.get(uri);
    console.log(response.data);
    res.status(200).json({ news: response.data.articles });
  } catch (error) {
    throw error;
  }
};
