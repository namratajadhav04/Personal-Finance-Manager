import React from "react";
import { useForm } from "react-hook-form";
import { addTransaction } from "../services/api";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function TransactionForm({ onTransactionAdded }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await addTransaction(data);
    reset();
    onTransactionAdded();
  };

  return (
    <Card className="shadow-xl">
      <CardContent className="p-6 space-y-4">
        <h2 className="text-xl font-bold">➕ Add Transaction</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>Amount</Label>
            <Input type="number" {...register("amount", { required: true })} />
            {errors.amount && (
              <p className="text-red-500 text-sm">Amount is required</p>
            )}
          </div>
          <br></br>

          <div>
            <Label>Description</Label>
            <Input
              type="text"
              {...register("description", { required: true })}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">Description is required</p>
            )}
          </div>
          <br></br>

          <div>
            <Label>Date</Label>
            <Input type="date" {...register("date", { required: true })} />
            {errors.date && (
              <p className="text-red-500 text-sm">Date is required</p>
            )}
          </div>
          <br></br>
          <br></br>

          <Button type="submit" className="w-full">
            Add Transaction
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default TransactionForm;
