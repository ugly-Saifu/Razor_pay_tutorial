const { createRazorpayInstance } = require("../config/razorpay_config");
const crypto = require("crypto");
require("dotenv").config();

const razorpayInstance = createRazorpayInstance();

exports.createOrder = async (req, res) => {
  // do not accept amount from clinet
  const { courseId, amount } = req.body;

  //checks
  if (!courseId || !amount) {
    return res
      .status(400)
      .json({ message: "Course ID and Amount are required" });
  }
  // course id se fetch krenge course ka data including its price
  // create order
  const options = {
    amount: amount * 100, // convert to paisa
    currency: "INR",
    receipt: `order_${courseId}`, // unique id for order
  };

  try {
    razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: "Error creating order",
        });
      }
      return res.status(200).json(order);
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating order",
    });
  }
};

exports.verifyPayment = async (req, res) => {
  const { order_id, payment_id, signature } = req.body;

  const secret = process.env.RAZORPAY_KEY_SECRET;

  // create hmac object
  const hmac = crypto.createHmac("sha256", secret);

  hmac.update(order_id + "|" + payment_id);

  const generatedSignature = hmac.digest("hex");

  if (generatedSignature === signature) {
    //db operation
    // payment is verified
    return res.status(200).json({
      success: true,
      message: "Payment is verified",
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Invalid signature",
    });
  }
};