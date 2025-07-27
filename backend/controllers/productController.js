const { parse } = require("dotenv");
const Product = require("../models/Product");
const { createProduct } = require("../services/productService");

exports.addProduct = async (req, res) => {
  try {
    const { name, category, price, quantity, imageUrl } = req.body;

    if (!name || !category || !price || !quantity || !imageUrl) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const product = await createProduct({
      name,
      category,
      price,
      quantity,
      imageUrl,
    });
    res.status(201).json(product);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ message: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

exports.searchProducts = async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;

    let query = {};

    if (name) {
      query.name = { $regex: name, $options: "i" };
    }

    if (category) {
      query.category = category;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    const sweets = await Product.find(query);
    res.status(200).json(sweets);
  } catch (error) {
    res.status(500).json({ message: "Search failed", error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(id, updateFields, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update product", error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const deleted = await Product.findByIdAndDelete(productId);

    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Sweet deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete product", error: error.message });
  }
};

exports.purchaseProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    let { quantity } = req.body;

    if (!quantity || isNaN(quantity) || quantity <= 0) {
      return res
        .status(400)
        .json({ message: "Quantity must be a positive number" });
    }

    quantity = parseInt(quantity);

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.quantity < quantity) {
      return res.status(400).json({ message: "Insufficient stock" });
    }

    product.quantity -= quantity;
    await product.save();

    res
      .status(200)
      .json({
        message: `${quantity} ${product.name} purchased successfully`,
        remainingQuantity: product.quantity,
      });
  } catch (error) {
    res.status(500).json({ message: "Purchase failed", error: error.message });
  }
};
