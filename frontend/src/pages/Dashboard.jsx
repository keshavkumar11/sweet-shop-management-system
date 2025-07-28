import { useEffect, useState } from "react";
import AddProduct from "./AddProduct";
import { getAllProducts, restockProduct } from "../api/productService"; // ✅ ADD THIS LINE

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
   return (
    <>
    <div className="admin-dashboard">
      <h2>Admin Dashboard - Manage Products</h2>
      {products.map((product) => (
        <div key={product._id} className="product-card">
          <img src={product.imageUrl} width={100} />
          <h3>{product.name}</h3>
          <p>Stock: {product.quantity}</p>
          <button onClick={() => handleRestock(product._id)}>Restock</button>
        </div>
      ))}
    </div>
      <AddProduct />
    </>
  );
};
export default Dashboard;
