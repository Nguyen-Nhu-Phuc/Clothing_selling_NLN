import mongoose from "mongoose";

const AddressInfoSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    address: { type: String, required: true },
  },
  { timestamps: true },
  { collection: "AddressInfo" }
);

const AddressInfoModel = mongoose.model("AddressInfo", AddressInfoSchema);

export default AddressInfoModel;
