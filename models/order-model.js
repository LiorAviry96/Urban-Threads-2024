const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    shippingAddress: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    products: [
      {
        versionId: { type: mongoose.Schema.Types.ObjectId, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    transactionId: { type: String, required: true },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("Order", orderSchema);

module.exports = { OrderModel };

const MOCK_ORDERS = [];

async function initDb() {
  //await OrderModel.deleteMany({}).exec();
  const orders = await OrderModel.find();
  if (orders.length === 0) {
    for (const order of MOCK_ORDERS) {
      const newOrders = new OrderModel(orders);
      await newOrders.save();
    }
  }
}

initDb();
