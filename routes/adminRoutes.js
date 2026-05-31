const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");

// USERS
router.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// PRODUCTS
router.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// ENTREPRENEUR REQUESTS
router.get("/entrepreneur-requests", async (req, res) => {
  const requests = await User.find({
    role: "entrepreneur",
  });

  res.json(requests);
});

// ORDERS
router.get("/orders", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

// APPROVE
router.put("/approve/:id", async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, {
    approved: true,
  });

  res.json({
    message: "Approved",
  });
});

// DELETE PRODUCT
router.delete("/product/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);

  res.json({
    message: "Deleted",
  });
});

module.exports = router;