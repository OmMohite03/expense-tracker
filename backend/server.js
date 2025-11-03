import express from "express";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import connectDB from "./config/db.js";
import transactionRoutes from "./routes/transactionRoutes.js";

// console.log("MONGO_URI from env:", process.env.MONGO_URI);
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/transactions", transactionRoutes);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;