import { useEffect, useState } from "react"
import { getAllProducts } from "../api/productService";
const ProductsPage = () => {
    const [products,setProducts] = useState([]);
    useEffect(()=>{
        async function loadProducts() {
            try {
                const data = await getAllProducts();
                setProducts(data);
            } catch (error) {
                alert(error.message);
            }
        }

        loadProducts();
    },[])

    const handlePurchase = async (id) => {
        alert(`Purchase triggered for product ID: ${id}`);
    }

    return(
        <>
         <div className="products-grid">
      {products.map((prod) => (
        <div key={prod._id} className="product-card">
          <img src={prod.imageUrl} alt={prod.name} width={150} />
          <h3>{prod.name}</h3>
          <p>Category: {prod.category}</p>
          <p>Price: ₹{prod.price}</p>
          <p>Available: {prod.quantity}</p>
          <button
            disabled={prod.quantity === 0}
            onClick={() => handlePurchase(prod._id)}
          >
            {prod.quantity === 0 ? "Out of Stock" : "Purchase"}
          </button>
        </div>
      ))}
    </div>
        </>
    )
}

export default ProductsPage;