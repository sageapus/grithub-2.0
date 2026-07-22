import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;

async function connectDB() {
    try {
        await mongoose.connect(uri);
        console.log("✅ Successfully connected to grithub2 database!");
    } catch (error) {
        console.error("❌ Connection error:", error);
    }
}

connectDB();