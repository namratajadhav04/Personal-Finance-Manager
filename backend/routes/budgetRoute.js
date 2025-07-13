const express = require("express");
const router = express.Router();

const Budget = require("../models/budgetModel");

router.post("/addbudget", async (req, res) => {
  const { category, amount } = req.body;
  try {
    //for existing budget
    const exist = await Budget.findOne({ category });
    if (exist) {
      exist.amount = amount;
      await exist.save();
      res.status(200).json({ message: "Budget Updated" });
    }

    //this is for creating new budget
    const u = new Budget({ category, amount });
    await u.save();
    res.status(201).json({ u });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/allBudget", async (req, res) => {
  try {
    const u = await Budget.find();
    res.status(200).json({ u });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
