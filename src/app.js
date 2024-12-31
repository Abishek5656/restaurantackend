import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';


const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser())

const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";
const JWT_KEY  = process.env.JWT_SECREAT_KEY;

//import Routes
import userRouter from "./routes/admin.routes.js";

//routes declaration
app.use("/api/v1/admin", userRouter);


export {envMode,JWT_KEY, app };
