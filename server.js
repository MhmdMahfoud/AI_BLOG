import express from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
dotenv.config();
const app = express();
connectDB();
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`This  server is running in port ${PORT}`);
});


