const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/authController");

// ================= TEST ROUTE =================
router.get("/test", (req, res) => {
  res.send("TEST WORKING 🚀");
});

// ================= AUTH ROUTES =================
router.post("/register", register);
router.post("/login", login);

module.exports = router;