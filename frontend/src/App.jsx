import React from "react";
import TransactionForm from "./features/transactions/TransactionForm";
import TransactionList from "./features/transactions/TransactionList";
import Summary from "./features/transactions/Summary";
import ChartComp from "./features/transactions/ChartComp";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <TransactionForm />
          <TransactionList />
        </div>

        <div className="space-y-4">
          <Summary />
          <ChartComp />
        </div>
      </div>
    </div>
  );
}

export default App;
