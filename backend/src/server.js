import authRoutes from "./routes/authRoute.js";
import dotenv from "dotenv"; 
import mongoose from "mongoose";
import express from "express"; 
import { protect } from "./middleware/authMiddleware.js";

dotenv.config(); 

const app = express(); 

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Use routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5001; 

app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`); 
});


