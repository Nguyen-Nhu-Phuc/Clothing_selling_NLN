import mongoose from "mongoose";

const Order = new mongoose.Schema(
  {
    phone: { type: Number },
    name: { type: String },
    address: { type: String },
    status: { type: Boolean },
    products: [
      {
        info: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: { type: Number },
      },
    ],
    user: { type: String, ref: "User" },
  },
  { timestamps: true },
  { collection: "Order" }
);

const OrderModel = mongoose.model("Order", Order);

export default OrderModel;
