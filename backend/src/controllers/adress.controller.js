import AddressInfoModel from "../models/address.js";

const addressController = {
  //[GET] /api/user
  getAddressByUser: async (req, res) => {
    try {
      const address = await AddressInfoModel.find({
        user_id: req.user.id,
      }).sort({createdAt: -1});
      res.status(200).json({data: address});
    } catch (err) {
      res.status(500).json(err);
    }
  },
  createAddress: async (req, res) => {
    try {
      await AddressInfoModel.create({
        ...req.body,
        user_id: req.user.id
      });
      res.status(200).json({ msg: "success" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  updateAddress: async (req, res) => {
    try {
      await AddressInfoModel.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json({ msg: "success" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  deleteAddress: async (req, res) => {
    try {
      await AddressInfoModel.findByIdAndDelete(req.params.id);
      res.status(200).json({ msg: "success" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

export default addressController;