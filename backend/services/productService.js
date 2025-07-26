const Product = require("../models/Product");

async function createProduct(productData) {
    const product = await Product.create(productData);
    return product;
}

module.exports = {createProduct};