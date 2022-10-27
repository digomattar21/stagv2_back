import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";
import newsRouter from "./routes/news.routes";
import { config } from "dotenv";

config();

const app: Express = express();

const PORT: string | number = process.env.PORT || 4000;

app.use(cors());
app.use("/news", newsRouter);

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.9xi6kms.mongodb.net/?retryWrites=true&w=majority`;
const options: any = { useNewUrlParser: true, useUnifiedTopology: true };

const mongooseConnect = async (): Promise<void> => {
  await mongoose.connect(uri, options);
};

mongooseConnect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    throw error;
  });
