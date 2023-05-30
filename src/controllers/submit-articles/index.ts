import { Response, Request } from "express";
import { v2 as cloudinary } from "cloudinary";
import { Mongoose } from "mongoose";
import SubmittedArticle from "../../models/SubmittedArticle";
import User from "../../models/User";

export const articleSubmission = async (
  req: any,
  res: Response
): Promise<void> => {
  try {
    if (checkArticleBody(req.body)) {
      throw new Error("Invalid article body");
    }
    config();
    const user = await User.findById(req.userId);
    let response: any;
    if (req.file) {
      response = await new Promise((resolve, reject) => {
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

        return uploadStream.end(req.file.buffer);
      });
    }
    const secure_url: any = response.secure_url;
    //verify upload, get the secure_url from response and save to mongo
    // const newArticle: any = new Article();
    const articleData = {
      title: req.body.title,
      description: req.body.description,
      content: req.body.content,
      category: req.body.category,
      user,
      author: user?.name,
      mainImageUrl: secure_url,
    };

    const submittedArticle: any = new SubmittedArticle(articleData);
    await submittedArticle.save();
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const checkArticleBody = (body: any) => {
  return (
    !body.title ||
    !body.description ||
    !body.content ||
    !body.category ||
    body.title === "" ||
    body.description === "" ||
    body.content === "" ||
    body.category === ""
  );
};

const config = () => {
  return cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_KEY_SECRET,
  });
};
