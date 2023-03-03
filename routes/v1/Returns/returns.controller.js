const router = require("express").Router();

const {
  fetchReturns,
  addReturns,
  groupReturnByDate,
  fetchReturnSummaryUsingDate,
} = require("../../../private/services/returns.service");
const { verify } = require("../../../verifyToken");

router.post("/add-return", verify, async (req, res, next) => {
  try {
    const result = await addReturns({ req });
    if (result.status === "success") {
      return res.status(200).json(result);
    }
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

// fetch Returns
router.post("", verify, async (req, res, next) => {
  const { shop_id } = req.body;
  try {
    return res.status(200).json(await fetchReturns({ shop_id }));
  } catch (error) {
    next(error);
  }
});

// fetch Returns - group by date
router.post("/fetch-return-dates", verify, async (req, res, next) => {
  const { shop_id } = req.body;
  try {
    return res.status(200).json(await groupReturnByDate({ shop_id }));
  } catch (error) {
    next(error);
  }
});

// fetch Returns using date
router.post("/fetch-return-by-date", verify, async (req, res, next) => {
  const { date } = req.body;
  try {
    return res.status(200).json(await fetchReturnSummaryUsingDate({ date }));
  } catch (error) {
    next(error);
  }
});


module.exports = router;
