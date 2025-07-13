import React, { useState } from "react";
import { deleteTransaction, editTransaction } from "../services/api";

function TransactionList({ transactions, onTransactionDeleted }) {
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    date: "",
    category: "",
  });

  const handleDelete = async (id) => {
    await deleteTransaction(id);
    onTransactionDeleted();
  };

  const handleEditClick = (txn) => {
    setEditId(txn._id);
    setFormData({
      amount: txn.amount,
      description: txn.description,
      date: txn.date.slice(0, 10),
      category: txn.category,
    });
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await editTransaction(editId, formData);
    setEditId(null);
    onTransactionDeleted();
  };

  return (
    <div className="container py-5" style={{ backgroundColor: "#f9fafb" }}>
      <h2
        className="mb-4 text-primary fw-bold"
        style={{ fontFamily: "Georgia" }}
      >
        📋 Transaction History
      </h2>

      <div className="row g-4">
        {transactions.map((txn) => (
          <div className="col-12" key={txn._id}>
            <div className="card shadow-sm border-0">
              <div className="card-body">
                {editId === txn._id ? (
                  <form onSubmit={handleEditSubmit} className="row g-3">
                    <div className="col-md-3">
                      <label className="form-label fw-semibold">Amount</label>
                      <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                      />
                    </div>

                    <div className="col-md-3">
                      <label className="form-label fw-semibold">
                        Description
                      </label>
                      <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                      />
                    </div>

                    <div className="col-md-3">
                      <label className="form-label fw-semibold">Date</label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                      />
                    </div>

                    <div className="col-md-3">
                      <label className="form-label fw-semibold">Category</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="form-select"
                        required
                      >
                        <option value="">Select</option>
                        <option value="Food">Food</option>
                        <option value="Rent">Rent</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Bills">Bills</option>
                        <option value="Health">Health</option>
                        <option value="Travel">Travel</option>
                        <option value="Others">Others</option>
                      </select>
                    </div>

                    <div className="col-12 d-flex gap-2 mt-2">
                      <button type="submit" className="btn btn-success">
                        Save
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setEditId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3">
                    <div>
                      <h5 className="mb-1 text-primary fw-semibold">
                        ₹{txn.amount} — {txn.description}
                      </h5>
                      <p className="mb-0 text-muted small">
                        {new Date(txn.date).toLocaleDateString()} |{" "}
                        {txn.category}
                      </p>
                    </div>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => handleEditClick(txn)}
                      >
                        Edit
                      </button>{" "}
                      &nbsp;&nbsp;
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => handleDelete(txn._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TransactionList;
