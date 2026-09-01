import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { authMiddleware } from "../middleware/AuthMiddleware.js";
import jwt from "jsonwebtoken";
const router = express.Router();
// always for auth////////////////////////////////////////////////////////////
function setAuthCookie(res, token) {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}
//// ////////////// /////////////////////////////////////////////////////////////
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already registered" });
    }
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    setAuthCookie(res, token);
    res.status(201).json({
      success: true,
      message: "User Added Successfully",
      newUser: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        role: newUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
//login

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "email not exist! please register" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "invalid password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    setAuthCookie(res, token);
    return res.status(201).json({
      message: "user logged in successfully",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// get current user

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ error: "user not found" });
    res.json("user found", user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
