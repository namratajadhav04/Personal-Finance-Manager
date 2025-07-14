import React from "react";
import { useForm } from "react-hook-form";
import { addTransaction } from "../services/api";

function TransactionForm({ onTransactionAdded }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await addTransaction(data);
      reset();
      onTransactionAdded();
    } catch (err) {
      console.error("Failed to add transaction:", err);
    }
  };

  return (
    <div
      className="py-5"
      style={{
        backgroundImage: "linear-gradient(to right, #f8fafc, #e0e7ff)",
        minHeight: "50vh",
      }}
    >
      <div className="container d-flex justify-content-center">
        <div
          className="card shadow-lg border-0 w-100"
          style={{ maxWidth: "600px" }}
        >
          <div className="card-body p-5">
            <h3
              className="card-title text-center text-primary mb-4"
              style={{ fontFamily: "Georgia" }}
            >
              ➕ Add New Transaction
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              {/* Amount */}
              <div className="mb-3">
                <label htmlFor="amount" className="form-label fw-semibold">
                  Amount
                </label>
                <input
                  type="number"
                  id="amount"
                  className={`form-control ${
                    errors.amount ? "is-invalid" : ""
                  }`}
                  placeholder="Enter amount"
                  {...register("amount", { required: true })}
                />
                {errors.amount && (
                  <div className="invalid-feedback">Amount is required.</div>
                )}
              </div>

              {/* Description */}
              <div className="mb-3">
                <label htmlFor="description" className="form-label fw-semibold">
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  className={`form-control ${
                    errors.description ? "is-invalid" : ""
                  }`}
                  placeholder="e.g. Grocery shopping"
                  {...register("description", { required: true })}
                />
                {errors.description && (
                  <div className="invalid-feedback">
                    Description is required.
                  </div>
                )}
              </div>

              {/* Category */}
              <div className="mb-3">
                <label htmlFor="category" className="form-label fw-semibold">
                  Category
                </label>
                <select
                  id="category"
                  className={`form-select ${
                    errors.category ? "is-invalid" : ""
                  }`}
                  {...register("category", { required: true })}
                >
                  <option value="">-- Select Category --</option>
                  <option value="Food">Food</option>
                  <option value="Rent">Rent</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Bills">Bills</option>
                  <option value="Health">Health</option>
                  <option value="Travel">Travel</option>
                  <option value="Others">Others</option>
                </select>
                {errors.category && (
                  <div className="invalid-feedback">Category is required.</div>
                )}
              </div>

              {/* Date */}
              <div className="mb-4">
                <label htmlFor="date" className="form-label fw-semibold">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  className={`form-control ${errors.date ? "is-invalid" : ""}`}
                  {...register("date", { required: true })}
                />
                {errors.date && (
                  <div className="invalid-feedback">Date is required.</div>
                )}
              </div>

              <button type="submit" className="btn btn-primary w-100 fw-bold">
                Add Transaction
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionForm;
