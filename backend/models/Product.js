const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{type:String,required:true},
    category:{type:String,required:true},
    price:{type:Number,required:true},
    quantity:{type:Number,required:true},
    imageUrl:{type:String,required:true}
},{timestamps:true});

module.exports = mongoose.model("Product",productSchema);