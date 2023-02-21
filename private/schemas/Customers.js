const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    shop_id: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
    },
    name: { type: String, unique: true, required: true },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    region: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customers", customerSchema);
