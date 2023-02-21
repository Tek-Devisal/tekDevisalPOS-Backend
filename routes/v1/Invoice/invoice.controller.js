const router = require("express").Router();

const {
  addInvoice,
  fetchInvoice,
} = require("../../../private/services/invoice.service");
const { verify } = require("../../../verifyToken");

// FETCH POS INVOICE
router.post("", verify, async (req, res, next) => {
  const { store_id } = req.body;
  try {
    return res.status(200).json(await fetchInvoice({ store_id }));
  } catch (error) {
    next(error);
  }
});

// ADD INVOICE
router.post("/add-invoice", verify, async (req, res, next) => {
  try {
    return res.status(200).json(await addInvoice({ req }));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
