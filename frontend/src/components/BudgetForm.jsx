import React, { useEffect, useState } from "react";
import axios from "axios";

function BudgetForm() {
  const [budgets, setBudgets] = useState([]);
  const [form, setForm] = useState({ category: "", amount: "" });

  const categories = [
    "Food",
    "Rent",
    "Shopping",
    "Bills",
    "Health",
    "Travel",
    "Others",
  ];

  const fetchBudgets = async () => {
    const res = await axios.get("http://localhost:5000/budget/allBudget");
    setBudgets(res.data.u);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/budget/addbudget", form);
    setForm({ category: "", amount: "" });
    fetchBudgets();
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  return (
    <div className="container my-5">
      <div className="card shadow-sm border-0">
        <div className="card-body p-5">
          <h4
            className="card-title text-primary mb-4"
            style={{ fontFamily: "Georgia" }}
          >
            💡 Set Monthly Budgets
          </h4>

          <form onSubmit={handleSubmit} className="row g-3 mb-4">
            {/* Category */}
            <div className="col-md-5">
              <label className="form-label fw-semibold">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="form-select"
                required
              >
                <option value="">-- Select Category --</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Amount */}
            <div className="col-md-5">
              <label className="form-label fw-semibold">Amount</label>
              <input
                type="number"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                className="form-control"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="col-md-2 d-flex align-items-end">
              <button type="submit" className="btn btn-primary w-100">
                Save
              </button>
            </div>
          </form>

          <div>
            <h5 className="text-secondary mb-2">🧾 Current Budgets</h5>
            <ul className="list-group list-group-flush">
              {budgets.map((b) => (
                <li key={b._id} className="list-group-item px-0">
                  <strong>{b.category}</strong>: ₹{b.amount}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BudgetForm;
