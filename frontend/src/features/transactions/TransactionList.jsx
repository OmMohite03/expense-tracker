import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTransactions, deleteTransaction } from "./transactionsSlice";

const TransactionList = () => {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((state) => state.transactions);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  if (status === "loading") return <div>Loading transactions...</div>;
  if (status === "failed") return <div className="text-red-600">Error: {error}</div>;

  return (
    <div className="space-y-2">
      {list.length === 0 && <div>No transactions yet</div>}
      {list.map(tx => (
        <div key={tx._id} className="flex justify-between items-center p-3 bg-white rounded shadow">
          <div>
            <div className="font-medium">{tx.description || tx.category}</div>
            <div className="text-sm text-gray-500">{new Date(tx.date).toLocaleDateString()} • {tx.category}</div>
          </div>
          <div className="flex items-center gap-3">
            <div className={tx.type === 'income' ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
              {tx.type === 'income' ? `+₹${tx.amount}` : `-₹${tx.amount}`}
            </div>
            <button onClick={() => dispatch(deleteTransaction(tx._id))} className="text-sm text-gray-500 hover:text-red-600">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
