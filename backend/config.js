//mongoose connection

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/FinanceVisualizer", {}).then(() => {
  console.log("Connected");
});
