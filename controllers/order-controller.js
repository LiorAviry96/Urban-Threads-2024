const { OrderModel } = require("../models/order-model");
const { UserModel } = require("../models/user-model");
const getOrders = async (req, res) => {
  const orders = await OrderModel.find();
  res.json({ orders });
};
const sendOrder = async (req, res) => {
  try {
    const { userId, shippingAddress, totalPrice, products, transactionId } =
      req.body;

    const newOrder = await OrderModel.create({
      userId,
      shippingAddress,
      totalPrice,
      products,
      transactionId,
    });

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $set: { cart: [] } },
      { new: true }
    );

    res.json({
      success: true,
      message: "Order placed successfully",
      order: newOrder,
      updatedUser,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getOrderbyOrderId = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await OrderModel.findById(orderId);

    if (order) {
      res.json({ order });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    console.error("Error getting order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getOrdersByUserId = async (req, res) => {
  const userId = req.params.userId;
  const orders = await OrderModel.find({ userId });
  res.json({ orders });
};

const orderController = {
  getOrders,
  getOrdersByUserId,
  getOrderbyOrderId,
  sendOrder,
};

module.exports = { orderController };
