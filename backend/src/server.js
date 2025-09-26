import authRoutes from "./routes/authRoute.js";
import dotenv from "dotenv"; 
import mongoose from "mongoose";
import express from "express"; 
import { protect } from "./middleware/authMiddleware.js";

dotenv.config(); 

const app = express(); 

app.use(express.json());



const PORT = 5001; 

app.listen(5000, () => {

  console.log("server is running on Port: 5000" ); 
});


