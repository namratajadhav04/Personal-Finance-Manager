const express = require("express");
const router = express.Router();
const Transaction = require("../models/transactionmodel");

router.get("/alltransaction", async (req, res) => {
  try {
    const u = await Transaction.find().sort({ date: -1 });
    res.status(200).json({ u });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post("/add", async (req, res) => {
  const { amount, description } = req.body;
  try {
    const u = new Transaction({ amount, description });
    await u.save();
    res.status(201).json({ message: "Transaction created" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/edit/:_id", async (req, res) => {
  const { _id } = req.params;
  const { amount, description } = req.body;
  try {
    const u = await Transaction.findByIdAndUpdate(
      { _id },
      { amount, description },
      { new: true }
    );
    res.status(201).json({ message: "Transaction updated" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.delete("/delete/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    const u = await Transaction.findByIdAndDelete(_id);
    res.status(200).json({ message: "Transaction deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
