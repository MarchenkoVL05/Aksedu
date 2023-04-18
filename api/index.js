import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import router from "./routes/index.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/uploads", express.static("uploads"));

app.use("/api", router);

const PORT = process.env.PORT || 80;

mongoose.set("strictQuery", false);

mongoose
  .connect(
    `mongodb+srv://vladimir:${process.env.DB_PASSWORD}@cluster0.4jqdqhf.mongodb.net/aksedu?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("DB is connected");
  });

app.listen(PORT, "192.168.0.43", (error) => {
  if (error) {
    console.log("Ошибка сервера: ", error);
  }
  console.log(`Server is running on port: ${PORT}`);
});
