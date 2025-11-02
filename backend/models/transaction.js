import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  type: { type: String, required: true }, // income or expense
  amount: { type: Number, required: true },
  description: String,
  category: String,
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Transaction", transactionSchema);
