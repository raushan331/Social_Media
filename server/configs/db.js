import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return; // already connected

  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/Social_media`, {
      serverSelectionTimeoutMS: 8000,
    });
    console.log("Database is connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    throw error; // Inngest me asli error dikhega
  }
};

export default connectDB;
