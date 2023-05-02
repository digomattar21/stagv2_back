import { Response, Request } from "express";

export const articleSubmission = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log(req.body);
    res.status(200).json({ success: true });
  } catch (error) {
    throw error;
  }
};
