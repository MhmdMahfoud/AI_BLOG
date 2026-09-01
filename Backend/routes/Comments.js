import express from "express";

import Comment from "../models/Comment.js";
import { FaCommentSlash } from "react-icons/fa";
const router = express.Router();

router.post("/add-comment", async (req, res) => {
  try {
    const { name, comment } = req.body;
    const { blogId } = req.params;
    const newComment = await Comment.create({ name, comment, blog: blogId });
    res
      .status(201)
      .json({ message: "comment added successfully", comment: newComment });
    await newComment.save();
  } catch (error) {
    res.status(500).json(error.message);
  }
});
router.get("/get-comment/:blogId", async function name(req, res) {
  try {
    const { blogId } = req.params;
    const comment = await Comment.find({ blog: blogId })
      .populate("blog", "title category")
      .sort({ createdAt: -1 });
    res.status(201).json({ success: true, count: comment.length });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

export default router;
