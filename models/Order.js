const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    entrepreneurId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    productName: {
      type: String,
    },

    price: {
      type: Number,
    },

    image: {
      type: String,
    },

    category: {
      type: String,
    },

    service: {
  type: String,
},

address: {
  type: String,
},

date: {
  type: Date,
},

    quantity: {
      type: Number,
      default: 1,
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "delivered"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);