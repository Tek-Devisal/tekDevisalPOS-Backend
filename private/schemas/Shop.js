const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema(
  {
    owner_id: {
      type: mongoose.SchemaTypes.ObjectId,
      required: false,
      ref: "user",
    },
    shop_name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Shop", shopSchema);
