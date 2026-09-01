import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import User from "./routes/Users.js";
import Blog from "./routes/Blogs.js";
import Comments from "./routes/Comments.js";
import cors from 'cors'
dotenv.config();
const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use("/users", User);
app.use("/blogs", Blog);
app.use("/Comments", Comments);
connectDB();
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`This  server is running in port ${PORT}`);
});
