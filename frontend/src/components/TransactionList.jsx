import React from "react";
import { deleteTransaction } from "../services/api";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function TransactionList({ transactions, onTransactionDeleted }) {
  const handleDelete = async (id) => {
    await deleteTransaction(id);
    onTransactionDeleted();
  };

  return (
    <div className="mt-6 space-y-4">
      <h2 className="text-xl font-semibold">📋 Transaction History</h2>
      {transactions.map((txn) => (
        <Card
          key={txn._id}
          className="p-4 flex items-center justify-between shadow-sm border"
        >
          <div>
            <p className="font-medium text-lg text-gray-800">
              ₹{txn.amount} — {txn.description}
            </p>
            <p className="text-sm text-gray-500">
              {new Date(txn.date).toLocaleDateString()}
            </p>
          </div>
          <Button variant="destructive" onClick={() => handleDelete(txn._id)}>
            Delete
          </Button>
        </Card>
      ))}
    </div>
  );
}

export default TransactionList;
