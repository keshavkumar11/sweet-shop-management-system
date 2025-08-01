const jwt = require("jsonwebtoken");

exports.verifyToken = (req,res,next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({message:"No token provided"});        
    }

    const token = authHeader && authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token,process.env.TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({message:"Invalid token"})
    }
}