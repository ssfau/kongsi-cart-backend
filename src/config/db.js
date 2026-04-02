import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("Missing env variable: MONGO_URI");
    }

    // In serverless environments (Vercel), this file may be invoked many times.
    // Reuse existing mongoose connection when possible.
    if (mongoose.connection.readyState === 1) return;

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err?.message || err);
    throw err;
  }
};

export default connectDB;