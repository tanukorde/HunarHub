const express = require("express");
const router = express.Router();

const {
  createOrder,
  getOrders,
  updateOrderStatus
} = require("../controllers/orderController");

const protect = require("../middleware/authMiddleware");

router.post("/", protect, createOrder);
router.get("/", protect, getOrders);

// ⭐ NEW ADDED ROUTE
router.put("/:id/status", protect, updateOrderStatus);

module.exports = router;