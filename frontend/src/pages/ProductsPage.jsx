import { useEffect, useState } from "react";
import { getAllProducts, purchaseProduct } from "../api/productService";
const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        alert("Failed to load products");
      }
    };
    fetchProducts();
  }, []);

  const handlePurchase = async (productId) => {
    const quantity = prompt("Enter quantity to purchase:");
    const parsedQuantity = parseInt(quantity);

    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      alert("Enter a valid quantity");
      return;
    }

    try {
      const result = await purchaseProduct(productId, parsedQuantity);
      alert(result.message);

      setProducts((prev) =>
        prev.map((p) =>
          p._id === productId
            ? { ...p, quantity: p.quantity - parsedQuantity }
            : p
        )
      );
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <div className="products-page">
        <h2>Available Sweets</h2>
        {products.length === 0 ? (
          <p>No products found</p>
        ) : (
          <div className="product-list">
            {products.map((product) => (
              <div key={product._id} className="product-card">
                <img src={product.imageUrl} width={100} alt={product.name} />
                <h3>{product.name}</h3>
                <p>₹{product.price}</p>
                <p>Stock: {product.quantity}</p>
                <button
                  onClick={() => handlePurchase(product._id)}
                  disabled={product.quantity <= 0}
                >
                  {product.quantity <= 0 ? "Out of Stock" : "Purchase"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ProductsPage;
