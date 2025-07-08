const express = require("express");
const app = express();
const transactionRoute = require("./routes/transactionRoute");
require("./config");
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", transactionRoute);

app.listen(5000, () => {
  console.log("Server is listening on port 5000");
});
