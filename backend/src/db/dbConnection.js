import mongoose from "mongoose";

export default async function connectDb(URI) {
  try {
    await mongoose.connect(URI);
    console.log("MongoDB atlas connected successfully ");
    
  } catch (err) {
    console.log("Db connection failed -> ", err);
  }
}
