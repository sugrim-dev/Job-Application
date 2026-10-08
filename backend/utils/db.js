import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        console.log("Mongo URI exists:", !!process.env.MONGO_URI);
        console.log(
            "Mongo Host:",
            process.env.MONGO_URI?.split("@")[1]
        );

        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000,
        });

        console.log("MongoDB Connected");
    } catch (error) {
        console.error("MongoDB Connection Error:", error.message);
    }
};