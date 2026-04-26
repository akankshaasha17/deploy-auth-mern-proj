const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const AuthRouter = require("../Routes/AuthRouter");
const ProductRouter = require("../Routes/ProductRouter");

const app = express();

app.use(express.json());
app.use(cors());

// test route
app.get("/", (req, res) => {
  res.send("Backend is live 🚀");
});

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.use("/auth", AuthRouter);
app.use("/products", ProductRouter);

// MongoDB connection (serverless safe)
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
  console.log("MongoDB connected");
};

app.use(async (req, res, next) => {
  await connectDB();
  next();
});

module.exports = app;