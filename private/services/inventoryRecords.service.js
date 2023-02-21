const InventoryRecords = require("../schemas/InventoryRecords");
const Product = require("../schemas/Product");

async function editInventory({ req }) {
  try {
    const stock_added = req.body.stock_added;

    result = await Product.updateOne(
      {
        _id: req.body.product_id,
      },
      { $inc: { total_stock: +stock_added } }
    );

    if (result) {
      await InventoryRecords.create({
        ...req.body,
      });
      return { message: "success", data: result };
    }

    return { message: "failed to edit product inventory, please try again" };
  } catch (error) {
    return { message: "an error occurred, please try again", error };
  }
}

async function fetchInventoryRecords({ req }) {
  const { product_id } = req.body;
  try {
    const results = await InventoryRecords.find({ product_id });

    return { message: "success", data: results };
  } catch (error) {}
}

// async function deleteProduct({ req }) {
//   try {
//     result = await Product.findByIdAndRemove(
//       {
//         _id: req.body._id,
//       },
//     );

//     if (result) {
//       return { message: "success", data: result };
//     }

//     return { message: "failed to delete product, please try again" };
//   } catch (error) {
//     return { message: "an error occurred, please try again", error };
//   }
// }

module.exports = { editInventory, fetchInventoryRecords };
