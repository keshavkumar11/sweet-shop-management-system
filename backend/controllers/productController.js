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