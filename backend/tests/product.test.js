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
      .set("Authorization",`Bearer ${adminRes.body.token}`)
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
      expect(res.body[0]).toHaveProperty("name","Kaju Katri");
  });
});
