//server setup

import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import route from "./routes/fishpriceRoute.js";
import morgan from "morgan";
import userRouter from "./routes/userRoute.js";

const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

app.use(morgan("dev"));

app.use("/api/fish", route);

app.use("/api/user", userRouter);

const PORT = process.env.PORT || 4000;
const URL = process.env.MONGOURL;

mongoose
  .connect(URL)
  .then(() => {
    console.log("DB Connected successfully");

    app.listen(PORT, () => {
      console.log(`server is running on port : ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
