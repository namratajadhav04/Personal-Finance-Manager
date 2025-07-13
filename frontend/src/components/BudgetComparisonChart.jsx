import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function BudgetComparisonChart({ transactions }) {
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    const fetchBudgets = async () => {
      const res = await axios.get("http://localhost:5000/budget/allBudget");
      setBudgets(res.data.u);
    };
    fetchBudgets();
  }, []);

  const actualMap = {};
  transactions.forEach((txn) => {
    actualMap[txn.category] = (actualMap[txn.category] || 0) + txn.amount;
  });

  const chartData = budgets.map((budget) => ({
    category: budget.category,
    budget: budget.amount,
    spent: actualMap[budget.category] || 0,
  }));

  return (
    <div className="card shadow-sm border-0 h-100 mt-4">
      <div className="card-body">
        <h4
          className="card-title text-primary mb-4"
          style={{ fontFamily: "Georgia" }}
        >
          📉 Budget vs Actual
        </h4>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="category" stroke="#4b5563" />
            <YAxis stroke="#4b5563" />
            <Tooltip
              contentStyle={{ backgroundColor: "#f8fafc", borderRadius: 8 }}
              itemStyle={{ color: "#0f172a" }}
            />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              wrapperStyle={{ fontSize: "0.85rem" }}
            />
            <Bar
              dataKey="budget"
              name="Budget"
              fill="#6366f1" // Indigo
              radius={[6, 6, 0, 0]}
            />
            <Bar
              dataKey="spent"
              name="Actual Spent"
              fill="#10b981" // Emerald
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default BudgetComparisonChart;
