import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "./backend/.env" });

import cors from "cors";
import connectDB from "./config/db.js";
import transactionRoutes from "./routes/transactionRoutes.js";

// dotenv.config();
console.log("MONGO_URI from env:", process.env.MONGO_URI);
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/transactions", transactionRoutes);

app.listen(process.env.PORT || 5000, () => console.log(`Server running on port ${process.env.PORT}`));
