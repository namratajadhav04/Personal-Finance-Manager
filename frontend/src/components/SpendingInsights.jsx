import React, { useEffect, useState } from "react";
import axios from "axios";

function SpendingInsights({ transactions }) {
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    const fetchBudgets = async () => {
      const res = await axios.get("http://localhost:5000/budget/allBudget");
      setBudgets(res.data.u);
    };
    fetchBudgets();
  }, []);

  // Total spent per category
  const actualMap = {};
  transactions.forEach((txn) => {
    actualMap[txn.category] = (actualMap[txn.category] || 0) + txn.amount;
  });

  const insights = budgets.map((b) => {
    const spent = actualMap[b.category] || 0;
    const percent = Math.round((spent / b.amount) * 100);

    let variant = "success";
    let status = "✅ Under control";

    if (percent > 100) {
      variant = "danger";
      status = "❌ Over budget!";
    } else if (percent >= 90) {
      variant = "warning";
      status = "⚠️ Nearing limit";
    }

    return {
      category: b.category,
      spent,
      budget: b.amount,
      percent,
      status,
      variant,
    };
  });

  return (
    <div className="container mt-5">
      <div className="card shadow-sm border-0">
        <div className="card-body p-4">
          <h4
            className="card-title text-primary mb-4"
            style={{ fontFamily: "Georgia" }}
          >
            💬 Spending Insights
          </h4>

          {insights.length === 0 ? (
            <p className="text-muted">No insights yet.</p>
          ) : (
            <div className="list-group">
              {insights.map((item) => (
                <div
                  key={item.category}
                  className={`list-group-item list-group-item-${item.variant} rounded mb-2`}
                >
                  <div className="fw-bold">{item.category}</div>
                  <div>
                    ₹{item.spent} of ₹{item.budget} ({item.percent}%)
                  </div>
                  <div className="mt-1 small fw-semibold">{item.status}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SpendingInsights;
