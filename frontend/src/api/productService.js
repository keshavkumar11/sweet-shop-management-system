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
