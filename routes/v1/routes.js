const router = require("express").Router();

// user related endpoints
router.use("/api/v1/user", require("./Users/auth"));
router.use("/api/v1/product", require("./Products/product.controller"));
router.use(
  "/api/v1/inventory",
  require("./Inventory/inventoryRecords.controller")
);
router.use("/api/v1/customer", require("./Customers/customers.controller"));
router.use("/api/v1/invoice", require("./Invoice/invoice.controller"));
router.use("/api/v1/return", require("./Returns/returns.controller"));
router.use("/api/v1/sales", require("./Sales/sales.controller"));
router.use("/api/v1/reports", require("./Reports/report.controller"));

module.exports = router;
