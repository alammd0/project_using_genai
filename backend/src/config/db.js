import mongoose from "mongoose";

console.log(process.env.MONGODB_URL);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("DB Error:", error.message);
        process.exit(1);
    }
};

export default connectDB;