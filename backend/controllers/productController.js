const Product = require("../models/Product");
const {createProduct} = require("../services/productService");

exports.addProduct = async (req,res)=>{
    try {
        const {name,category,price,quantity,imageUrl} = req.body;

        if (!name || !category || !price || !quantity || !imageUrl) {
            return res.status(400).json({message:"All fields are required"});
        }

        const product = await createProduct({name,category,price,quantity,imageUrl});
        res.status(201).json(product);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({message:error.message});
    }
}

exports.getAllProducts = async (req,res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message:"Failed to fetch products"})
    }
}