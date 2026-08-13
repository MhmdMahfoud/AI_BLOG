import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["User", "Admin"],
    default: "user",
  },
  timestamps:true
});
export default mongoose.model('User',userSchema)