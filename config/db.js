

import mongoose, { connect } from "mongoose";

export const connectDB=async ()=>{ 
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("mongoo connected successfully")
    } catch (error) {
        console.log("there is an error" ,error.message)
    }
}


















