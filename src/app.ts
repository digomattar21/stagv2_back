import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";
import newsRouter from "./routes/public/news/news.routes";
import { config } from "dotenv";
import authRouter from "./routes/auth/auth.routes";
import privateNewsRouter from "./routes/private/news/privateNews.routes";

config();

const app: Express = express();

const PORT: string | number = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use("/news", newsRouter);
app.use("/auth", authRouter);
app.use("/userNews", privateNewsRouter);

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.jsehy3t.mongodb.net/?retryWrites=true&w=majority`;
const options: any = { useNewUrlParser: true, useUnifiedTopology: true };

const mongooseConnect = async (): Promise<void> => {
  return await mongoose.connect(uri, options);
};
mongooseConnect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Connected to Mongo Instance at: ${mongoose.connection.host}`
      );
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    throw error;
  });
