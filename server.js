const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const transactionRoutes = require("./routes/transactionRoutes");

const app = express();
app.use(cors());
dotenv.config();
app.use(express.json());

app.use("/api/transactions", transactionRoutes);

const BASE_URL = process.env.PROCESS_URL 

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(5000, () => console.log(`Server running on port ${BASE_URL}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));


