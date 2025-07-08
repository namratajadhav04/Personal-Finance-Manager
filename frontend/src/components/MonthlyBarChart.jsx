import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function MonthlyBarChart({ transactions }) {
  const monthlyData = {};

  transactions.forEach((txn) => {
    const month = new Date(txn.date).toLocaleString("default", {
      month: "short",
      year: "numeric",
    });
    monthlyData[month] = (monthlyData[month] || 0) + txn.amount;
  });

  const chartData = Object.entries(monthlyData).map(([month, total]) => ({
    month,
    total,
  }));

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-4">Monthly Expenses</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MonthlyBarChart;
