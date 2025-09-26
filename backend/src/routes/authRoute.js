import { register, login} from "/Users/new pc/Desktop/anime-watch-tracker/backend/src/controllers/authController.js";
import express from "express"; 



const router = express.Router(); 


router.post("./register", register), () => {};

router.post("/login", login), () => {};

export default router; 