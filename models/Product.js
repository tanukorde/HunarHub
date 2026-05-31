const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,   // ⭐ IMPORTANT for image
    },

    category: {
  type: String,
  required: true,
  default: "Small Vendor"
},
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

     entrepreneurId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);