require("dotenv").config({path:"./.env.test"});
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");

beforeAll(async()=>{
    await mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    });
});

afterEach(async () =>{
    const collections = await mongoose.connection.db.collections();
    for (const collection of collections) {
        await collection.deleteMany();
    }
})

afterAll(async()=>{
    await mongoose.connection.close();
})

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

  it("should login an existing user and return a token", async ()=>{
    // First register the user
    (await request(app).post("/api/auth/register")).setEncoding({
        name:"Keshav",
        "email":"keshavkumarpurani@gmail.com",
        "password": "Password123",
        role:"user",
    });

    // Then try to login
    const res = (await request(app).post("/api/auth/login")).setEncoding({
        email:"keshavkumarpurani@gmail.com",
        password:"Password123",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});
