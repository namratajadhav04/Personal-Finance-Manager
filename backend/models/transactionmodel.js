const mongoose = require("mongoose");

const transcationSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const transcation = mongoose.model("Transaction", transcationSchema);
module.exports = transcation;
