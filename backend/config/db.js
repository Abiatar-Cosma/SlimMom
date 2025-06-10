import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Conectat la MongoDB Atlas");
  } catch (error) {
    console.error("❌ Eroare conectare MongoDB:", error.message);
    process.exit(1);
  }
};

export default connectDB;
