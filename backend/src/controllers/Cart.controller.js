import Cart from "../models/cart.js";

const CartController = {
  // [POST] /api/Cart/add
  async addCart(req, res) {
    try {
      let data = req.body.product.idProduct_item[0];
      const cart = await Cart.findOne({ _id: req.params.id });
      cart.idProduct_item.push(data);
      cart.save();
      res.status(200).json(cart);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  async updatedQuantity(req, res) {
    try {
      let { id, id_obj, quantity } = req.body;
      const cart = await Cart.findOne({ _id: id });
      cart.idProduct_item.forEach((item) => {
        if (item.id_item == id_obj) {
          item.quantity = quantity;
        }
      });
      await cart.save();
      return res.status(200).json(cart);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  async getAllCart(req, res) {
    try {
      const cart = await Cart.findById(req.params.id);
      return res.status(200).json(cart);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  async deleteProductInCart(req, res) {
    try {
      let { id, id_obj } = req.body;
      await Cart.updateOne(
        { _id: id },
        {
          $pull: {
            idProduct_item: {
              _id: id_obj,
            },
          },
        }
      );
      return res.status(200).send("Ok");
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  async Oder(req, res) {
    try {
      const cart = await Cart.findById(req.params.id);
      cart.idProduct_item = [];
      cart.save();
      return res.status(200).json(cart);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};

export default CartController;
