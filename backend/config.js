const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/FinanceVisualizer").then(() => {
  console.log("Connected successfully");
});

// // (Optional for local dev)
// require("dotenv").config();

// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => console.log("❌ MongoDB connection error:", err));
