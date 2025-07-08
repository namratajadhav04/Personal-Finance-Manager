import React, { useEffect, useState } from "react";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import MonthlyBarChart from "./components/MonthlyBarChart";
import { getTransaction } from "./services/api";

function App() {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const res = await getTransaction();
      console.log("Transactions response 👉", res.data.u);
      setTransactions(res.data.u);
    } catch (error) {
      console.error("Fetch failed:", error.message);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-10">
          💰 Personal Finance Visualizer
        </h1>

        <TransactionForm onTransactionAdded={fetchTransactions} />
        <TransactionList
          transactions={transactions}
          onTransactionDeleted={fetchTransactions}
        />
        <MonthlyBarChart transactions={transactions} />
      </div>
    </div>
  );
}

export default App;
