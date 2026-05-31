const Order = require("../models/Order");

// ➕ CREATE ORDER (FINAL FIXED)
exports.createOrder = async (req, res) => {
  try {
    // ⭐ userId comes from JWT middleware (NOT frontend body)
    const userId = req.user;

    const {
      entrepreneurId,
      productId,
      productName,
      price,
      image,
      category,
      service,
      address,
    } = req.body;

    // validation
    if (!userId || !entrepreneurId || !productId) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    // create order
    const order = await Order.create({
      userId,
      entrepreneurId,
      productId,
      productName,
      price,
      image,
      category,
      service,
      address,
      status: "pending", // ⭐ consistent lowercase
    });

    return res.status(201).json({
      message: "Order placed successfully",
      order,
    });

  } catch (err) {
    console.log("ORDER ERROR:", err.message);

    return res.status(500).json({
      message: "Server error while placing order",
      error: err.message,
    });
  }
};

// 📥 GET ALL ORDERS (FINAL)
exports.getOrders = async (req, res) => {
  try {
    const userId = req.user;

    const orders = await Order.find({ userId })
      .populate("userId", "name email")
      .populate("productId")
      .populate("entrepreneurId", "name email");

    return res.status(200).json(orders);

  } catch (err) {
    console.log("GET ORDERS ERROR:", err.message);

    return res.status(500).json({
      message: "Server error while fetching orders",
    });
  }
};

// 🔄 UPDATE ORDER STATUS (FINAL)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const validStatuses = ["pending", "accepted", "rejected", "delivered"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status value",
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    return res.status(200).json({
      message: "Order status updated",
      order,
    });

  } catch (err) {
    console.log("UPDATE ORDER ERROR:", err.message);

    return res.status(500).json({
      message: "Server error while updating order",
    });
  }
};