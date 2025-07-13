import React from "react";

function SummaryCards({ transactions }) {
  if (!transactions.length) return null;

  const total = transactions.reduce((acc, txn) => acc + txn.amount, 0);

  const categoryTotals = {};
  transactions.forEach((txn) => {
    categoryTotals[txn.category] =
      (categoryTotals[txn.category] || 0) + txn.amount;
  });

  const topCategory = Object.entries(categoryTotals).sort(
    (a, b) => b[1] - a[1]
  )[0];
  const latest = [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  )[0];

  return (
    <div className="container mt-4">
      <h2
        className="mb-4 text-primary fw-bold"
        style={{ fontFamily: "Georgia" }}
      >
        📋 Summary
      </h2>
      <div className="row g-4">
        {/* Total Spent */}
        <div className="col-md-4">
          <div className="card border-start border-primary border-4 shadow-sm">
            <div className="card-body">
              <h5 className="card-title text-primary fw-semibold">
                💰 Total Spent
              </h5>
              <h3 className="card-text fw-bold text-dark mt-2">₹{total}</h3>
            </div>
          </div>
        </div>

        {/* Top Category */}
        <div className="col-md-4">
          <div className="card border-start border-danger border-4 shadow-sm">
            <div className="card-body">
              <h5 className="card-title text-danger fw-semibold">
                🏆 Top Category
              </h5>
              <p className="card-text fs-5 fw-medium text-dark mt-2">
                {topCategory ? `${topCategory[0]} - ₹${topCategory[1]}` : "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Most Recent */}
        <div className="col-md-4">
          <div className="card border-start border-success border-4 shadow-sm">
            <div className="card-body">
              <h5 className="card-title text-success fw-semibold">
                ⏰ Most Recent
              </h5>
              {latest ? (
                <div className="card-text text-dark">
                  <p className="mb-1 fw-medium">
                    ₹{latest.amount} — {latest.category}
                  </p>
                  <small className="text-muted">
                    {new Date(latest.date).toLocaleDateString()}
                  </small>
                </div>
              ) : (
                <p className="text-muted">N/A</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SummaryCards;
