import User from "../models/Users.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
//Register a new user
export const register = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        const userExists = await User.findOne({email});
        if (userExists) return res.status(400).json({msg:"User already exists"});
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
       
        const user = new User({username, email, password: hashedPassword});
        await user.save();
       
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "1h"});
        //Approved user created
        res.status(201).json({token, user: {id: user._id, username, email}});
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find user
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "User not found" });
        
        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
        
        // Create token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
};
