import express from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import User from "./routes/Users.js"
dotenv.config();
const app = express();
app.use(express.json())
app.use("/users",User)
connectDB();
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`This  server is running in port ${PORT}`);
});


