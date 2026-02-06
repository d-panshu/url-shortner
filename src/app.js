import express from "express";
import cookieParser  from "cookie-parser";

import helmet from "helmet";
import rateLimit from "express-rate-limit";

import urlRoutes from "./routes/url.router.js";
import authRoutes from "./routes/auth.router.js";

import path from "path";
import { fileURLToPath } from "url";

const app= express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("views", path.join(__dirname, "views"));



app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(helmet());

app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs          

}));
app.use("/auth", authRoutes);
app.use("/", urlRoutes);

export default app;
