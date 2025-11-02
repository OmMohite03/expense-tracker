import React from "react";
import { useSelector } from "react-redux";

const Summary = () => {
  const { list } = useSelector(state => state.transactions);
  const totalIncome = list.filter(t=>t.type==='income').reduce((s,a)=>s+a.amount,0);
  const totalExpense = list.filter(t=>t.type==='expense').reduce((s,a)=>s+a.amount,0);
  const balance = totalIncome - totalExpense;

  return (
    <div className="p-4 bg-white rounded shadow space-y-2">
      <div className="text-xl font-semibold">Balance: ₹{balance}</div>
      <div className="flex gap-4">
        <div>Income: <span className="text-green-600 font-bold">₹{totalIncome}</span></div>
        <div>Expense: <span className="text-red-600 font-bold">₹{totalExpense}</span></div>
      </div>
    </div>
  );
};

export default Summary;
