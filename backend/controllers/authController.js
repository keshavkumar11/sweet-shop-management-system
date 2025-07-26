const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { registerUser } = require("../services/authService");

exports.register = async (req,res) => {
    try {
        const token = await registerUser(req.body);
        res.status(201).json({token});
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}