import express from "express";
const router = express.Router();
import Blog from "../models/Blog.js";

router.post("/Add-Blog", async (req, res) => {
  try {
    const {
      tittle,
      subtittle,
      description,
      category,
      published,
      //views,
    } = req.body;
    if (!tittle || !subtittle || !description || !category || !published) {
      return res.status(401).json({ error, message: "ALL Field are required" });
    }
    const newBlog = await Blog.Create({
      tittle,
      subtittle,
      description,
      category,
      published: published === "true",
      author: req.userId,
    });
    res
      .status(201)
      .json({ success: true, message: "Blog added successfully", newBlog });
    await newBlog.save();
  } catch (error) {
    res.status(500).json(error.message);
  }
});
router.get("All-Blog", async (req, res) => {
  try {
    const Blogs = await Blog.find().populate("author", "name");
    res.status(200).json({ success: true, Blogs }); //count :Blog.length
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
router.delete("/Delete-Blog/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      res.status(400).json({ message: "blog not found" });
    }
    await Blog.findByIdAndDelete(id);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params.id;
    const blog = await Blog.findById(id).populate("author", "name");
    if (!blog) {
      res.status(400).json({ message: "blog not found" });
    }
    Blog.views += 1;
    await Blog.save();
    res.json({ blog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
export default router;
