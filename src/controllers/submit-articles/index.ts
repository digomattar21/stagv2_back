import { Response, Request } from "express";
import { v2 as cloudinary } from "cloudinary";

export const articleSubmission = async (
  req: any,
  res: Response
): Promise<void> => {
  try {
    if (!checkArticleBody(req.body)) {
      res.status(400).json({ error: "Missing fields" });
    }
    config();
    console.log(req.body);
    console.log(req.file.originalname);
    if (req.file) {
      const response = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: "auto" },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );

        uploadStream.end(req.file.buffer);
      });
      console.log(response);
    }
    //verify upload, get the secure_url from response and save to mongo
    // const newArticle: any = new Article();

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

const checkArticleBody = (body: any) => {
  return !body.title || !body.description || !body.content || !body.category;
};

const config = () => {
  return cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_KEY_SECRET,
  });
};
