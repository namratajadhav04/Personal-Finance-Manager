const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  category: { type: String, unique: true, required: true },
  amount: { type: Number, required: true },
});
const budget = mongoose.model("Budget", budgetSchema);
module.exports = budget;
