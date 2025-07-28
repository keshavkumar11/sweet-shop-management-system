export async function addProductAPI(productData) {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:5000/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Add Product failed");
  return data;
}

export async function getAllProducts() {
  const res = await fetch("http://localhost:5000/api/products");
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch products");
  return data;
}

export async function purchaseProduct(productId, quantity) {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `http://localhost:5000/api/products/${productId}/purchase`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ quantity }),
    }
  );

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Purchase failed");
  return data;
}

export async function restockProduct(productId, quantity) {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `http://localhost:5000/api/products/${productId}/restock`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ quantity }),
    }
  );

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to restock product");
  return data;
}
