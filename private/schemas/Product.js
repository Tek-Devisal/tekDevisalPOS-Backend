const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    store_id: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "shop",
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    selling_price: {
      type: Number,
      required: true,
    },
    total_stock: {
      type: Number,
      required: true,
      default: 0,
    },

    discount: {
      type: Number,
      required: false,
      default: 0,
    },
    // expiry_date: {
    //   type: Date,
    //   required: true,
    // },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
