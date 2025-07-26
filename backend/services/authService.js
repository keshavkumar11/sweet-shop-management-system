const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function registerUser({ name, email, password, role }) {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: role || "user",
  });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.TOKEN_SECRET,
    { expiresIn: "1h" }
  );

  return token;
}

async function loginUser({email,password}) {
    const user = await User.findOne({email});
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(password,user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = jwt.sign(
        { id: user._id,role: user.role},
        process.env.TOKEN_SECRET,
        {expiresIn:'1h'}
    );

    return token;
}

module.exports = {registerUser,loginUser};
