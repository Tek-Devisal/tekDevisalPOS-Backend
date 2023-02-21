const mongoose = require("mongoose");

const returnsSchema = new mongoose.Schema(
  {
    invoice_number: {
      type: String,
      required: false,
    },
    shop_id: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Returns", returnsSchema);
