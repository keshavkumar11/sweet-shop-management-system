import { useEffect, useState } from "react";
import AddProduct from "./AddProduct";
import {
  getAllProducts,
  restockProduct,
  updateProductAPI,
  deleteProductAPI,
} from "../api/productService"; // ✅ ADD THIS LINE
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts()
      .then(setProducts)
      .catch(() => alert("Failed to load products"));
  }, []);

  const handleRestock = async (productId) => {
    const quantity = prompt("Enter quantity to restock:");
    const parsedQuantity = parseInt(quantity);

    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      alert("Enter a valid restock quantity");
      return;
    }

    try {
      const result = await restockProduct(productId, parsedQuantity);
      alert(result.message);

      setProducts((prev) =>
        prev.map((p) =>
          p._id === productId
            ? { ...p, quantity: p.quantity + parsedQuantity }
            : p
        )
      );
    } catch (error) {
      alert(error.message);
    }
  };
  const handleUpdate = async (product) => {
      const newPrice = prompt("Enter new price:", product.price);
      const newQuantity = prompt("Enter new quantity:", product.quantity);

      if (!newPrice || !newQuantity) return;

      try {
        const token = localStorage.getItem("token");
        const updated = await updateProductAPI(
          product._id,
          {
            price: newPrice,
            quantity: newQuantity,
          },
          token
        );

        alert("Product updated");
        setProducts((prev) =>
          prev.map((p) => (p._id === product._id ? updated : p))
        );
      } catch (error) {
        alert(error.message);
      }
    };

    const handleDelete = async (id) => {
      if (!window.confirm("Are you sure you want to delete this product?"))
        return;
      try {
        const token = localStorage.getItem("token");
        await deleteProductAPI(id, token);
        alert("Product deleted");
        setProducts((prev) => prev.filter((p) => p._id !== id));
      } catch (error) {
        alert(error.message);
      }
    };
  return (
    <>
      <div className="admin-dashboard">
        <h2>Admin Dashboard - Manage Products</h2>
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <img src={product.imageUrl} width={100} />
            <h3>{product.name}</h3>
            <p>Stock: {product.quantity}</p>
            <p>Price: {product.price}</p>
            <p>Category: {product.category}</p>
            <button onClick={() => handleRestock(product._id)}>Restock</button>
            <button onClick={() => handleUpdate(product)}>Update</button>
            <button onClick={() => handleDelete(product._id)}>Delete</button>
          </div>
        ))}
      </div>
      <AddProduct />
    </>
  );
};
export default Dashboard;
