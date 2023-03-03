const { fetchReports, fetchDailyReports, dailyCashRecieved, dailyBorrowed } = require("../../../private/services/report.service");

const router = require("express").Router();
router.post("", verify, async (req, res, next) => {
  // res.attachment("table.pdf");
  try {
    return res.status(201).json(await fetchReports({ req, res }));
  } catch (error) {
    next(error);
  }
});

router.post("daily-report", verify, async (req, res, next) => {
  try {
    return res.status(201).json(await fetchDailyReports({ req, res }));
  } catch (error) {
    next(error);
  }
});

router.post("/daily-cash-recieved-report", verify, async (req, res, next) => {
  try {
      return res.status(201).json(await dailyCashRecieved({ req }));
    } catch (error) {
      next(error);
    }
})

router.post("/daily-cash-borrowed-report", verify, async (req, res, next) => {
  try {
      return res.status(201).json(await dailyBorrowed({ req }));
    } catch (error) {
      next(error);
    }
})

module.exports = router;
