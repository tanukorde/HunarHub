console.log("🔥 SERVER FILE RUNNING");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Product = require("./models/Product");
const Order = require("./models/Order");
const User = require("./models/User");

const app = express();

app.use(cors());
app.use(express.json());

// ================= ROUTES =================

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

// ================= HOME =================

app.get("/", (req, res) => {
  res.send("HunarHub Backend Running 🚀");
});

// ================= DASHBOARD STATS =================

app.get("/api/dashboard/stats", async (req, res) => {
  try {
    const products = await Product.countDocuments();
    const orders = await Order.countDocuments();

    const entrepreneurs = await User.countDocuments({
      role: "entrepreneur",
    });

    const allOrders = await Order.find();

    let earnings = 0;

    allOrders.forEach((order) => {
      earnings += order.price || 0;
    });

    res.json({
      products,
      orders,
      entrepreneurs,
      earnings,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ================= ENTREPRENEURS API =================

app.get("/api/entrepreneurs", async (req, res) => {
  try {
    const users = await User.find({
      role: "entrepreneur",
    });

    res.json(users);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// ================= SERVICE REQUEST API =================

app.post("/api/service-request", async (req, res) => {
  try {

    console.log("Service Request:", req.body);

    res.json({
      message: "Service Request Received",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ================= ADMIN USERS =================

app.get("/api/admin/users", async (req, res) => {
  try {
    const users = await User.find();

    res.json(users);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// ================= ADMIN PRODUCTS =================

app.get("/api/admin/products", async (req, res) => {
  try {
    const products = await Product.find();

    res.json(products);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// ================= ADMIN ORDERS =================

app.get("/api/admin/orders", async (req, res) => {
  try {
    const orders = await Order.find();

    res.json(orders);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// ================= DELETE PRODUCT =================

app.delete("/api/admin/product/:id", async (req, res) => {
  try {

    await Product.findByIdAndDelete(req.params.id);

    res.json({
      message: "Product Deleted",
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// ================= ENTREPRENEUR REQUESTS =================

app.get("/api/admin/entrepreneur-requests", async (req, res) => {
  try {

    const requests = await User.find({
      role: "entrepreneur",
    });

    res.json(requests);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// ================= APPROVE ENTREPRENEUR =================

app.put("/api/admin/approve/:id", async (req, res) => {
  try {

    await User.findByIdAndUpdate(
      req.params.id,
      {
        approved: true,
      }
    );

    res.json({
      message: "Entrepreneur Approved",
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// ================= DB CONNECT =================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {

    console.log("MongoDB Connected ✅");

    const PORT = process.env.PORT || 10000; 
    app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

  })
  .catch((err) => {
    console.log("DB Error ❌", err);
  });