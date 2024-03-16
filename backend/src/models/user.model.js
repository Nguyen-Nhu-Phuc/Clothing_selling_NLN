import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    role: { type: String, default: "User" },
    fullName: { type: String },
    userName: { type: String, unique: true },
    email: { type: String, unique: true },
    passWord: { type: String, required: true },
    admin: { type: Boolean, default: false },
    refreshToken: { type: String },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" }
  },
  { timestamps: true },
  { collection: "user" }
);

const User = mongoose.model("User", userSchema);

export default User;
