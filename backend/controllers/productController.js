const {createProduct} = require("../services/productService");

exports.addProduct = async (req,res)=>{
    try {
        const product = await createProduct(req.body);
        res.status(201).json(product);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({message:error.message});
    }
}