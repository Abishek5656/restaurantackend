import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import { v2 as cloudinary } from 'cloudinary';

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

   // Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET_KEY 
});

const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";
const JWT_KEY  = process.env.JWT_SECREAT_KEY;

//import Routes
import userRouter from "./routes/admin.routes.js";
import itemRouter from "./routes/menu.routes.js";
import customerRouter from "./routes/customer.routes.js";
import oderDetails from "./routes/order.routes.js"

//routes declaration
app.use("/api/v1/admin", userRouter);
app.use("/api/v1/item", itemRouter);
app.use("/api/v1/customer",customerRouter);
app.use("/api/v1/order",oderDetails)


export {envMode,JWT_KEY, app };
