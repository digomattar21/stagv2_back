import { Response, Request } from "express";
import axios, { AxiosResponse } from "axios";
import { mountNewsQuery } from "../../util/news/newsQueryMounter";
// import { ITodo } from "./../../types/todo"
// import Todo from "../../models/todo"

export const getPrivateNews = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const yesterday: string =
      (req.query?.from as string) || new Date().toISOString().split("T")[0];
    const today: string =
      (req.query?.to as string) || new Date().toISOString().split("T")[0];

    const uri: string = mountNewsQuery({
      type: "everything",
      language: "pt",
      q: "tecnologia",
      from: yesterday,
      to: today,
    });
    const response: AxiosResponse<any> = await axios.get(uri);

    res.status(200).json({ news: response.data.articles });
  } catch (error) {
    throw error;
  }
};
