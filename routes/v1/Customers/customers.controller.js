const router = require("express").Router();
const { verify } = require("../../../verifyToken");
const {
  createCustomer,
  fetchCustomers,
  deleteCustomers,
  editCustomers,
} = require("../../../private/services/customer.service");

// Add customers to pharmacy
router.post("/add-new-customer", verify, async (req, res, next) => {
  try {
    return res.status(200).json(await createCustomer({ req }));
  } catch (error) {
    next(error);
  }
});

// Fetch customer information
router.post("/fetch-customers", verify, async (req, res, next) => {
  const { shop_id } = req.body;
  try {
    return res.status(200).json(await fetchCustomers({ shop_id }));
  } catch (error) {
    next(error);
  }
});

// Fetch customer information
router.post("/edit-customers", verify, async (req, res, next) => {
  try {
    return res.status(200).json(await editCustomers({ req}));
  } catch (error) {
    next(error);
  }
});

router.delete("/delete-customers", verify, async (req, res, next) => {
  try {
    return res.status(201).json(await deleteCustomers({ req }));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
