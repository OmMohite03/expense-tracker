import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTransaction } from "./transactionsSlice";

const TransactionForm = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    type: "expense",
    amount: "",
    description: "",
    category: "",
    date: new Date().toISOString().slice(0,10)
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) => setForm({...form, [e.target.name]: e.target.value});

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.amount || isNaN(Number(form.amount))) { setError("Enter valid amount"); return; }
    setLoading(true);
    try {
      await dispatch(addTransaction({
        ...form,
        amount: Number(form.amount),
        date: new Date(form.date)
      })).unwrap();
      setForm({ type: "expense", amount: "", description: "", category: "", date: new Date().toISOString().slice(0,10) });
    } catch (err) {
      setError(err.message || "Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="p-4 bg-white rounded shadow space-y-3">
      <div className="flex gap-2">
        <select name="type" value={form.type} onChange={onChange} className="border p-2 rounded">
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <input name="amount" value={form.amount} onChange={onChange} placeholder="Amount" className="border p-2 rounded flex-1" />
      </div>

      <input name="description" value={form.description} onChange={onChange} placeholder="Description (optional)" className="w-full border p-2 rounded" />
      <input name="category" value={form.category} onChange={onChange} placeholder="Category (eg groceries)" className="w-full border p-2 rounded" />
      <input name="date" type="date" value={form.date} onChange={onChange} className="border p-2 rounded" />

      {error && <div className="text-red-600">{error}</div>}
      <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
        {loading ? "Saving..." : "Add Transaction"}
      </button>
    </form>
  );
};

export default TransactionForm;
