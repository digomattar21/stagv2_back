import { Response, Request } from "express"
// import { ITodo } from "./../../types/todo"
// import Todo from "../../models/todo"

export const getNews = async (req: Request, res: Response): Promise<void> => {
  try {
    // const todos: ITodo[] = await Todo.find()
    res.status(200).json({ live: true })
  } catch (error) {
    throw error
  }
}
