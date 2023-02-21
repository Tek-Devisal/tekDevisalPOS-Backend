const router = require("express").Router();
const multer = require("multer");

const Product = require("../../../private/schemas/Product");
const {
  addProduct,
  updateProduct,
  deleteProduct,
  fetchProducts,
} = require("../../../private/services/product.service");
const { verify } = require("../../../verifyToken");

const storage = multer.memoryStorage();
const upload = multer({ storage }).single("picture");

router.post("/add-new-product", upload, verify, async (req, res, next) => {
  try {
    return res.status(201).json(await addProduct({ req }));
  } catch (error) {
    next(error);
  }
});
router.post("/fetch-product", verify, async (req, res, next) => {
  try {
    return res.status(201).json(await fetchProducts({ req }));
  } catch (error) {
    next(error);
  }
});

router.post("/edit-product", upload, verify, async (req, res, next) => {
  try {
    return res.status(201).json(await updateProduct({ req }));
  } catch (error) {
    next(error);
  }
});

router.delete("/delete-product", verify, async (req, res, next) => {
  try {
    return res.status(201).json(await deleteProduct({ req }));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
