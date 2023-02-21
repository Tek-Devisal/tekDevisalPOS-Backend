const mongoose = require("mongoose");

const inventoryRecordSchema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.SchemaTypes.ObjectId,
      required: false,
      ref: "product",
    },
    current_stock: {
      type: Number,
      required: true,
    },
    stock_added: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("InventoryRecord", inventoryRecordSchema);
