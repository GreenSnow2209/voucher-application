import mongoose from "mongoose";

export const connectDatabase = async (): Promise<void> => {
    try {
        const mongoUri = process.env.MONGO_URI || "";
        await mongoose.connect(mongoUri);
        console.log("Connected to mongodb successfully!");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};