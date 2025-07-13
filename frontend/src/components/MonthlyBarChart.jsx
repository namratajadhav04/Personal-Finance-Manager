import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
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
    <div className="card shadow-sm border-0 h-100">
      <div className="card-body">
        <h4
          className="card-title text-primary mb-4"
          style={{ fontFamily: "Georgia" }}
        >
          📊 Monthly Expenses Overview
        </h4>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="month" stroke="#8884d8" />
            <YAxis stroke="#8884d8" />
            <Tooltip
              contentStyle={{ backgroundColor: "#f8fafc", borderRadius: 8 }}
              itemStyle={{ color: "#0f172a" }}
            />
            <Legend />
            <Bar
              dataKey="total"
              fill="#6366f1"
              radius={[6, 6, 0, 0]}
              name="Total Spent"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default MonthlyBarChart;
