import request from "supertest";
import app from "../server.js"; 
import mongoose from "mongoose";

beforeAll(async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/testdb");
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Transaction API", () => {
  it("should create a transaction", async () => {
    const res = await request(app)
      .post("/api/transactions")
      .send({
        type: "income",
        amount: 5000,
        category: "salary",
        date: "2025-11-02",
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
  });

  it("should fetch all transactions", async () => {
    const res = await request(app).get("/api/transactions");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
