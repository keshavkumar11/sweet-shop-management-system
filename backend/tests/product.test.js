require("dotenv").config({ path: "./.env.test" });
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");

// DB setup
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany();
  }
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Product API", () => {
  it("should allow an admin to add a new sweet product", async () => {
    // 1. Register admin user
    const adminRes = await request(app).post("/api/auth/register").send({
      name: "Admin User",
      email: "dulirampeda@sweets.com",
      password: "admin123",
      role: "admin",
    });

    const token = adminRes.body.token;

    // 2. Try to add a product using the token
    const res = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Rasgulla",
        category: "Bengali",
        price: 25,
        quantity: 100,
        imageUrl: "https://example.com/rasgulla.jpg",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("name", "Rasgulla");
  });

  it("should not allow a user to add a sweet product", async () => {
    // Register a regular user (non-admin)
    const userRes = await request(app).post("/api/auth/register").send({
      name: "Regular User",
      email: "user@test.com",
      password: "user123",
      role: "user",
    });

    const token = userRes.body.token;

    // Try to add product
    const res = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Barfi",
        category: "Dry",
        price: 30,
        quantity: 50,
        imageUrl: "https://example.com/barfi.jpg",
      });

    expect(res.statusCode).toBe(403);
    expect(res.body).toHaveProperty("message", "Access Denied");
  });

  it("should return all sweet products", async () => {
    const adminRes = await request(app).post("/api/auth/register").send({
      name: "Harsh",
      email: "harsh@test.com",
      password: "harsh123",
      role: "admin",
    });

    await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${adminRes.body.token}`)
      .send({
        name: "Kaju Katri",
        category: "Dry",
        price: 50,
        quantity: 20,
        imageUrl: "https://example.com/kaju.jpg",
      });

    const res = await request(app).get("/api/products");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty("name", "Kaju Katri");
  });

  it("should search sweets by name, category, and price range", async () => {
    const adminRes = await request(app).post("/api/auth/register").send({
      name: "Yash Joshi",
      email: "yashjoshi@test.com",
      password: "yash123",
      role: "admin",
    });

    const token = adminRes.body.token;

    // Add sweets to DB
    const sampleSweets = [
      {
        name: "Gulab Jamun",
        category: "Wet",
        price: 20,
        quantity: 30,
        imageUrl: "gulabJamun",
      },
      {
        name: "Rasgulla",
        category: "Wet",
        price: 25,
        quantity: 40,
        imageUrl: "rasgulla",
      },
      {
        name: "Kaju Katri",
        category: "Dry",
        price: 50,
        quantity: 20,
        imageUrl: "kajuKatri",
      },
    ];

    for (const sweet of sampleSweets) {
      await request(app)
        .post("/api/products")
        .set("Authorization", `Bearer ${token}`)
        .send(sweet);
    }

    const resByName = await request(app).get("/api/products/search?name=Gulab");
    expect(resByName.statusCode).toBe(200);
    expect(resByName.body.length).toBe(1);
    expect(resByName.body[0]).toHaveProperty("name", "Gulab Jamun");

    const resByCategory = await request(app).get(
      "/api/products/search?category=Wet"
    );
    expect(resByCategory.statusCode).toBe(200);
    expect(resByCategory.body.length).toBe(2);

    const resByPrice = await request(app).get(
      "/api/products/search?minPrice=10&maxPrice=30"
    );
    expect(resByPrice.statusCode).toBe(200);
    expect(resByPrice.body.length).toBe(2);
  });

  it("should allow admin to update a sweet product", async () => {
    // Register a admin
    const adminRes = await request(app).post("/api/auth/register").send({
      name: "Harsh",
      email: "harsh@gmail.com",
      password: "harsh123",
      role: "admin",
    });
    const token = adminRes.body.token;

    // Add sweet product
    const productRes = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name:"Ladu",
        category:"Dry",
        price:40,
        quantity:30,
        imageUrl:"https://example.com/ladu.jpg"
      });

      const productId = productRes.body._id;

    //   Update the sweet
    const updateRes = await request(app).put(`/api/products/${productId}`).set("Authorization",`Bearer ${token}`)
    .send({
        name:"Besan Ladu",
        price:45,
    });

    expect(updateRes.statusCode).toBe(200);
    expect(updateRes.body).toHaveProperty("name","Besan Ladu");
    expect(updateRes.body).toHaveProperty("price",45)

  });

  it("should allow an admin to delete a sweet product", async()=>{
    const adminRes = (await request(app).post("/api/auth/register").send({
        name:"Harsh",
        email:"Harsh@sweets.com",
        password:"harsh123",
        role:"admin",
    }));

    const token = adminRes.body.token;

    const productRes = await request(app).post("/api/products").set("Authorization",`Bearer ${token}`).send({
        name:"Mathurai Peda",
        category:"Dry",
        price:40,
        quantity:20,
        imageUrl:"https://example.com/mathurai.jpg",
    });

    const productId = productRes.body._id;

    const deleteRes = await request(app).delete(`/api/products/${productId}`).set("Authorization",`Bearer ${token}`);

    expect(deleteRes.statusCode).toBe(200);
    expect(deleteRes.body.message).toBe("Sweet deleted successfully.");
  });

  it("should return 403 if user is not admin", async()=>{
    const userRes = await request(app).post("/api/auth/register").send({
        name:"Shiv",
        email:"shiv@gmail.com",
        password:"shiv123",
        role:"user",
    });

    const token = userRes.body.token;

    const res = await request(app).delete("/api/products/123456789012")
    .set("Authorization",`Bearer ${token}`);

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Access Denied");
  })
});
