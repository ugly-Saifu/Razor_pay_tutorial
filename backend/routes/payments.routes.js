const express = require("express");
const {
  createOrder,
  verifyPayment,
} = require("../controllers/payment.controller");
const router = express.Router();

router.post("/createOrder", createOrder);
router.post("/verifyPayment", verifyPayment);
router.post("/webhook", verifyPayment);

module.exports = router;
