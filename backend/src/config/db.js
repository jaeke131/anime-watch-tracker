import mongoose from "mongoose";
import { MongoClient, ServerApiVersion } from "mongodb";

export const connectDB = async () => { 
    try { 
        const conn = await mongoose.connect(process.env.MONGO.URI);
        console.log("MongoDB Connected:" );
    }
}