import { useState } from "react";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";
import { addProductAPI } from "../api/productService";
import "../styles/AddProduct.css";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const imageUrl = await uploadToCloudinary(file);
      setFormData((prev) => ({ ...prev, imageUrl }));
    } catch (error) {
      alert("Image upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await addProductAPI(formData, token);
      alert("Product added successfully!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-product-form">
      <input name="name" placeholder="Name" onChange={handleChange} required />
      <input
        name="category"
        placeholder="Category"
        onChange={handleChange}
        required
      />
      <input
        name="price"
        type="number"
        placeholder="Price"
        onChange={handleChange}
        required
      />
      <input
        name="quantity"
        type="number"
        placeholder="Quantity"
        onChange={handleChange}
        required
      />
      <input type="file" onChange={handleImageChange} />
      {formData.imageUrl && <img src={formData.imageUrl} width={100} alt="" />}
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProduct;
