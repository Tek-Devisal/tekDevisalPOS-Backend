const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    shop_id: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
    },
    customer_name: {
      type: String,
      required: false,
      default: "N/A",
    },
    invoice_number: {
      type: String,
      required: true,
    },
    payment_type: {
      type: String,
      required: true,
      default: "Cash",
    },
    grand_total: {
      type: Number,
      required: true,
    },
    amount_paid: {
      type: Number,
      required: false,
    },
    products_summary: [
      {
        product_id: {
          type: mongoose.SchemaTypes.ObjectId,
          required: false,
        },
        name: {
          type: String,
          required: false,
        },
        image: {
          type: String,
          required: false,
        },
        quantity: {
          type: Number,
          required: false,
        },
        discount: {
          type: Number,
          required: false,
          default: 0.0,
        },
        selling_price: {
          type: Number,
          required: false,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Invoice", invoiceSchema);
