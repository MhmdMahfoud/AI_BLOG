import mongoose from "mongoose";
import { PiStandardDefinitionLight } from "react-icons/pi";
const commentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
export default mongoose.model("Comment", commentSchema);
