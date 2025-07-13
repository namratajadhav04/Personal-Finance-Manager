import React, { useEffect, useState } from "react";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import MonthlyBarChart from "./components/MonthlyBarChart";
import { getTransaction } from "./services/api";
import CategoryPieChart from "./components/CategoryPieChart";
import SummaryCards from "./components/SummaryCards";
import BudgetForm from "./components/BudgetForm";
import BudgetComparisonChart from "./components/BudgetComparisonChart";
import SpendingInsights from "./components/SpendingInsights";
import Header from "./components/Header";

function App() {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const res = await getTransaction();
      setTransactions(res.data.u);
    } catch (error) {
      console.error("Fetch failed:", error.message);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div
      className="min-vh-100 bg-light pb-5"
      style={{
        background: "linear-gradient(to bottom right, #f8fafc, #e0f2fe)",
      }}
    >
      <Header />

      <main className="container py-5">
        {/* Summary Cards */}
        <div className="mb-5">
          <SummaryCards transactions={transactions} />
        </div>

        {/* Transaction Form */}
        <div className="mb-5">
          <TransactionForm onTransactionAdded={fetchTransactions} />
        </div>

        {/* Transaction List */}
        <div className="mb-3">
          <TransactionList
            transactions={transactions}
            onTransactionDeleted={fetchTransactions}
          />
        </div>

        {/* Charts: MonthlyBarChart & CategoryPieChart side by side */}
        <div className="row g-4 mb-5">
          <div className="col-md-6">
            <MonthlyBarChart transactions={transactions} />
          </div>
          <div className="col-md-6">
            <CategoryPieChart transactions={transactions} />
          </div>
        </div>

        {/* Budget Form */}
        <div className="mb-5">
          <BudgetForm />
        </div>

        {/* Budget Comparison Chart */}
        <div className="mb-5">
          <BudgetComparisonChart transactions={transactions} />
        </div>

        {/* Insights */}
        <SpendingInsights transactions={transactions} />
      </main>
    </div>
  );
}

export default App;
