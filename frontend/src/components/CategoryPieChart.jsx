import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Matching the UI's accent colors
const COLORS = [
  "#6366f1", // indigo (primary)
  "#f43f5e", // rose (top category)
  "#10b981", // emerald (recent)
  "#f59e0b", // amber
  "#0ea5e9", // sky blue
  "#a78bfa", // violet
  "#f97316", // orange
];

function CategoryPieChart({ transactions }) {
  // Calculate totals per category
  const categoryMap = {};

  transactions.forEach((txn) => {
    const cat = txn.category || "Others";
    categoryMap[cat] = (categoryMap[cat] || 0) + txn.amount;
  });

  const data = Object.entries(categoryMap).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="card shadow-sm border-0 h-100">
      <div className="card-body">
        <h4
          className="card-title text-primary mb-4"
          style={{ fontFamily: "Georgia" }}
        >
          🥧 Category-wise Spending
        </h4>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: "#f8fafc", borderRadius: 8 }}
              itemStyle={{ color: "#0f172a" }}
            />
            <Legend
              iconType="circle"
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{ fontSize: "0.85rem" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default CategoryPieChart;
