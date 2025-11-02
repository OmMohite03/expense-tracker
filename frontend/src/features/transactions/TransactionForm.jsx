import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTransaction } from "./transactionsSlice";

function TransactionForm() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.transactions);

  const [form, setForm] = useState({
    type: "",
    amount: "",
    description: "",
    category: "",
    date: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // basic validation (can enhance later)
    if (!form.type || !form.amount || !form.category || !form.date) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      await dispatch(addTransaction(form)).unwrap();
      setForm({
        type: "",
        amount: "",
        description: "",
        category: "",
        date: "",
      });
      alert("Transaction added successfully!");
    } catch (err) {
      console.error("Error adding transaction:", err);
      alert("Failed to add transaction. Please try again.");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">Add Transaction</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Type */}
        <div>
          <label className="block text-gray-700">Type</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          >
            <option value="">Select Type</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        {/* Amount */}
        <div>
          <label className="block text-gray-700">Amount</label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            placeholder="Enter amount"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700">Description</label>
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            placeholder="Optional"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-700">Category</label>
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            placeholder="e.g. salary, groceries"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-gray-700">Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-md text-white ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Adding..." : "Add Transaction"}
        </button>

        {error && <p className="text-red-600 text-center mt-2">{error}</p>}
      </form>
    </div>
  );
}

export default TransactionForm;
