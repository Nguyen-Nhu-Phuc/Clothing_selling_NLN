import mongoose from "mongoose";

const Cart = new mongoose.Schema(
  {
    idProduct_item: [
      {
        id_item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: { type: Number },
      },
    ],
  },
  { timestamps: true },
  { collection: "Cart" }
);

const CartModel = mongoose.model("Cart", Cart);

export default CartModel;
