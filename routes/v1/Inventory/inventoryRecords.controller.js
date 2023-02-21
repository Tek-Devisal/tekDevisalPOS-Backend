const router = require("express").Router();

const Product = require("../../../private/schemas/Product");
const { editInventory, fetchInventoryRecords } = require("../../../private/services/inventoryRecords.service");
const { verify } = require("../../../verifyToken");

router.post("/edit-inventory", verify, async (req, res, next) => {
  try {
    return res.status(201).json(await editInventory({ req }));
  } catch (error) {
    next(error);
  }
});

router.post("/inventory-records", verify, async (req, res, next) => {
  try {
    return res.status(201).json(await fetchInventoryRecords({ req }));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
