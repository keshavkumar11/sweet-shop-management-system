const request = require("supertest");
const app = require("../app");

describe("Auth API", () => {
  it("should register a new user and return a token", async () => {
    const res = await request(app).post("/api/auth/register").send({
        name:"Keshav",
        email:"keshavkumarpurani@gmail.com",
        password:"password123",
        role:"user"
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("token");
  });
});
