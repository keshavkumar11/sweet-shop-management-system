const Product = require("../models/Product");

async function createProduct(productData) {
    const product = await Product.create(productData);
    return product;
}

async function restockProduct(productId,quantity){
    if (!quantity || isNaN(quantity) || quantity <= 0) {
    throw new Error("Quantity must be a positive number");
  }

  const product = await Product.findById(productId);
  if (!product) {
    throw new Error("Product not found");
  }

  product.quantity += parseInt(quantity);
  await product.save();

  return product;
}

module.exports = {createProduct, restockProduct};