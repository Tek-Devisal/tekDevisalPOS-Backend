// file for all schemas
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: false,
      default: "active",
    },
    profile_image: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      max: 1024,
      min: 6,
      // unique: true,
    },
    phone: {
        type: String,
        required: false,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      min: 6,
    },
    shop_id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: false
    },
    usertype: {
      //0 = normal user
      type: String,
      required: false,
      default: "admin"
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("User", userSchema);
