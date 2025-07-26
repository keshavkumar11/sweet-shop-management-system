const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req,res) => {
    try {
        const {name,email,password,role} = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({email});
        if (existingUser) return res.status(400).json({message: "User already exists"});

        // Hash password
        const hashedPassword = await bcrypt.hash(password,10);

        // Create user
        const user = await User.create({
            name,
            email,
            password : hashedPassword,
            role: role || 'user'
        });

        // Generate JWT
        const token = jwt.sign(
            {id : user._id, role: user.role},
            process.env.TOKEN_SECRET || "dev_secret",
            {expiresIn:'1h'}
        );

        res.status(201).json({token});
    } catch (error) {
        res.status(500).json({message:"Registration failed"});
    }
}