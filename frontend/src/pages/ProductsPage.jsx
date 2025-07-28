import { useEffect, useState } from "react";
import { getAllProducts, purchaseProduct } from "../api/productService";
import "../styles/ProductsPage.css";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

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

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const uniqueCategories = [
    "all",
    ...new Set(products.map((product) => product.category).filter(Boolean)),
  ];
  return (
    <div className="products-page">
      <h2>Available Sweets</h2>

      {/* Search and Filter Controls */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          {uniqueCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat[0].toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Product Listing */}
      {filteredProducts.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="product-list">
          {filteredProducts.map((product) => (
            <div key={product._id} className="product-card">
              <img src={product.imageUrl} width={100} alt={product.name} />
              <h3>{product.name}</h3>
              <p>Category: {product.category}</p> {/* ✅ Add this line */}
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
  );
};

export default ProductsPage;
