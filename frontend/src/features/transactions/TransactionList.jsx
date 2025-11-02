import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTransactions, deleteTransaction } from "./transactionsSlice";

const TransactionList = () => {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((state) => state.transactions);

  const [filters, setFilters] = useState({
    type: "",
    category: "",
    date: ""
  });

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFilter = () => {
    // Only send non-empty filters
    const activeFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, v]) => v !== "")
    );
    dispatch(fetchTransactions(activeFilters));
  };

  const clearFilters = () => {
    setFilters({ type: "", category: "", date: "" });
    dispatch(fetchTransactions());
  };

  if (status === "loading") return <div>Loading transactions...</div>;
  if (status === "failed") return <div className="text-red-600">Error: {error}</div>;

  return (
    <div className="space-y-3">
      {/* Filter bar */}
      <div className="bg-white p-3 rounded shadow flex flex-wrap gap-2 items-end">
        <select
          name="type"
          value={filters.type}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <input
          type="text"
          name="category"
          placeholder="Category (e.g. groceries)"
          value={filters.category}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <button
          onClick={handleFilter}
          className="bg-blue-600 text-white px-3 py-2 rounded"
        >
          Apply
        </button>

        <button
          onClick={clearFilters}
          className="bg-gray-400 text-white px-3 py-2 rounded"
        >
          Clear
        </button>
      </div>

      {/* Transactions list */}
      {list.length === 0 && <div>No transactions found</div>}
      {list.map((tx) => (
        <div
          key={tx._id}
          className="flex justify-between items-center p-3 bg-white rounded shadow"
        >
          <div>
            <div className="font-medium">{tx.description || tx.category}</div>
            <div className="text-sm text-gray-500">
              {new Date(tx.date).toLocaleDateString()} • {tx.category}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div
              className={
                tx.type === "income"
                  ? "text-green-600 font-bold"
                  : "text-red-600 font-bold"
              }
            >
              {tx.type === "income" ? `+₹${tx.amount}` : `-₹${tx.amount}`}
            </div>
            <button
              onClick={() => dispatch(deleteTransaction(tx._id))}
              className="text-sm text-gray-500 hover:text-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
