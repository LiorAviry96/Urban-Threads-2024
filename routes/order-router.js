const express = require("express");
const { orderController } = require("../controllers/order-controller");

const orderRouter = express.Router();

orderRouter.get("/", orderController.getOrders);
orderRouter.post("/", orderController.sendOrder);
orderRouter.get("/user/:userId", orderController.getOrdersByUserId);
orderRouter.get("/:orderId", orderController.getOrderbyOrderId);

module.exports = { orderRouter };
