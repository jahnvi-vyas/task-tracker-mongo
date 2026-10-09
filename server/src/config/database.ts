import mongoose from "mongoose";

export const connectDatabase = async (): Promise<void> => {
    const mongoUri = process.env.MONGODB_URI?.trim();
    if (!mongoUri) {
        throw new Error(
            "MONGODB_URI is not defined. Check your server/.env file."
        );
    }
    console.log("MongoDB URI detected:", `${mongoUri.substring(0, 20)}...`);
    if (!mongoUri.startsWith("mongodb://") && !mongoUri.startsWith("mongodb+srv://")) {
        throw new Error(
            "MONGODB_URI has an invalid MongoDB connection scheme."
        );
    }
    try {
        await mongoose.connect(mongoUri);
        console.log("MongoDB connected successfully.");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        throw error;
    }
};

export const disconnectDatabase =
    async (): Promise<void> => {
        await mongoose.disconnect();
        console.log("MongoDB disconnected.");
    };