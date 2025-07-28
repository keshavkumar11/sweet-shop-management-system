import { useState } from "react"

const ProductsPage = () => {
    const [products,setProducts] = useState([]);
    
    const fetchProducts = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/products");
            const data = await res.json();
            setProducts(data);
        } catch (error) {
            alert("Failed to load products")
        }
    }

    const handlePurchase = async (id) => {
        const quantity= prompt("Enter ")
    }
}

export default ProductsPage;