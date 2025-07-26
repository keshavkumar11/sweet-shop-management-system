const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

app.use(express.json())

app.use("/api/auth",authRoutes)
app.use("/api/products",productRoutes);

module.exports = app;