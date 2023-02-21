const { fetchDaySales, fetchMonthSales, totalSales, salesToday, monthSales } = require("../../../private/services/sales.services");
const { verify } = require("../../../verifyToken")

const router = require("express").Router()

router.post("/day-sales", verify, async (req, res, next) => {
    try {
        return res.status(201).json(await fetchDaySales({ req }));
      } catch (error) {
        next(error);
      }
})

// sales for a month
router.post("/monthly-sales", verify, async (req, res, next) => {
    try {
        return res.status(201).json(await fetchMonthSales({ req }));
      } catch (error) {
        next(error);
      }
})
// Total Sales 
router.post("/total-sales", verify, async (req, res, next) => {
    try {
        return res.status(201).json(await totalSales({ req }));
      } catch (error) {
        next(error);
      }
})
// Total Sales 
router.post("/sales-today", verify, async (req, res, next) => {
    try {
        return res.status(201).json(await salesToday({ req }));
      } catch (error) {
        next(error);
      }
})

router.post("/sales-current-month", verify, async (req, res, next) => {
    try {
        return res.status(201).json(await monthSales({ req }));
      } catch (error) {
        next(error);
      }
})

module.exports = router