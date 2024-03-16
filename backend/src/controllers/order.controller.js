import OrderModel from "../models/order.js";
import CartModel from "../models/cart.js";

const orderApi = {
  get: async (req, res) => {
    const { page } = req.query;
    const limit = 5;
    const skip = page * limit - limit;
    try {
      const count = await OrderModel.count();
      let pageSize = 0;
      if (limit > count) pageSize = 1;
      else if (limit < count) pageSize = Math.ceil(count / limit);
      const order = await OrderModel.find({})
        .populate("products.info")
        .populate("user")
        .skip(skip)
        .limit(limit);
      return res.status(200).json({
        data: order,
        pagination: {
          total: count,
          pageSize,
          currentPage: +page,
        },
      });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  },
  getMe: async (req, res) => {
    try {
      const order = await OrderModel.find({ user: req.user.id }).populate(
        "products.info"
      );
      return res.status(200).json({
        data: order,
      });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  },
  add: async (req, res) => {
    const data = req.body;
    const user = req.user;
    console.log(data)
    try {
      await OrderModel.create({
        ...data,
        user: user.id,
        status: false,
      });
      const cart = await CartModel.findOne({ _id: req.query.id_cart });
      cart.idProduct_item = [];
      cart.save();
      return res.status(200).json({ message: "success" });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  },
  update: async (req, res) => {
    const data = req.body;
    const id_order = req.params.id;
    try {
      await OrderModel.findByIdAndUpdate(
        id_order,
        { $set: data },
        { new: true }
      );
      return res.status(200).json({ message: "success" });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  },
};

export default orderApi;
