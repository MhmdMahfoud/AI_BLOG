import mongoose from "mongoose";
const blogSchema = new mongoose.Schema({
  tittle: {
    type: String,
    required: true,
    trim: true, //remove white space
  },
  subtttle: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    default: "default-image.jpg",
  },
  category: {
    type: String,
    required: true,
    enum: ["Technology", "Startup", "LifeStyle", "Fnance"],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  published:{
    type:Boolean,
    default:false
  },
  views:{
    type:Number,
    default:0
  },
  timestamps:true
});
export default mongoose.model("Blog", blogSchema);
