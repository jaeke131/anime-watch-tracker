import authRoutes from "./routes/authRoute.js";
import dotenv from "dotenv"; 
import express from "express"; 
import { protect } from "./middleware/authMiddleware.js";
import { connectDB } from "./config/db.js";

dotenv.config(); 

const app = express(); 

app.use(express.json());

// Connect to MongoDB
connectDB();

// Use routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`); 
});


