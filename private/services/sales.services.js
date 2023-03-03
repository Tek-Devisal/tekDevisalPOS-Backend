const Invoice = require("../schemas/Invoice");
const mongoose = require("mongoose");

async function fetchDaySales({
  req
}) {
  const {
    shop_id
  } = req.body;
  try {
    const results = await Invoice.find({
      shop_id
    });
    const sales = {};
    let total = 0;
    let previousWeekDay = null; // keep track of the previous week day
    results.forEach(({
      grand_total,
      createdAt,
      invoice_number
    }) => {
      const dayOfWeek = new Date(createdAt).toLocaleDateString("en-US", {
        weekday: "short",
      });
      const revenue = grand_total;
      if (!sales[dayOfWeek]) {
        if (previousWeekDay && dayOfWeek !== previousWeekDay) {
          // if it's a new week day, set the total to zero
          total = 0;
        }
        previousWeekDay = dayOfWeek; // update the previous week day
        total = sales[dayOfWeek] ? (total += revenue) : revenue;
        sales[dayOfWeek] = {
          name: dayOfWeek,
          sale: total
        };
      } else {
        total += revenue;
        sales[dayOfWeek].sale = total;
      }
    });
    const salevalue = Object.values(sales);
    return {
      message: "success",
      data: salevalue
    };
  } catch (error) {
    return {
      data: error
    };
  }
}

// SALES FOR MONTH
async function fetchMonthSales({
  req
}, raw = false) {
  const {
    shop_id
  } = req.body;
  try {
    const results = await Invoice.find({
      shop_id
    });
    const sales = {};
    let total = 0;
    results.forEach(({
      grand_total,
      createdAt
    }) => {
      const currentMonth = new Date(createdAt).toLocaleDateString("en-US", {
        month: "short",
      });
      const revenue = grand_total;
      if (!sales[createdAt]) {
        total = sales[currentMonth] ? (total += revenue) : revenue;
        sales[currentMonth] = {
          name: currentMonth,
          sale: total
        };
      } else {
        sales[currentMonth].sale = sales[currentMonth] + revenue;
      }
    });

    const salesvalue = Object.values(sales);

    if (!raw) {
      return {
        message: "success",
        data: salesvalue
      };
    } else {
      return salesvalue
    }
  } catch (error) {
    return {
      data: error
    };
  }
}
// TOTAL SALES FOR MONTH
async function monthSales({
  req
}, raw = false) {
  const {
    shop_id
  } = req.body;
  try {
    const results = await Invoice.find({
      shop_id
    });
    const sales = {};
    let total = 0;
    results.forEach(({
      grand_total,
      createdAt
    }) => {
      const currentMonth = new Date(createdAt).toLocaleDateString("en-US", {
        month: "long",
      });
      const revenue = grand_total;
      if (!sales[createdAt]) {
        total = sales[currentMonth] ? (total += revenue) : revenue;
        sales[currentMonth] = {
          name: currentMonth,
          sale: total
        };
      } else {
        sales[currentMonth].sale = sales[currentMonth] + revenue;
      }
    });

    const salesvalue = Object.values(sales);
    const monthSales = salesvalue[salesvalue.length - 1];
    // const newValue = salesvalue[salesvalue.length - 1];
    // const subValue = salesvalue[salesvalue.length - 2];
    // const value = Number((((newValue.sale - subValue.sale) / newValue.sale) * 100).toFixed(2));
    if (!raw) {
      return {
        message: "success",
        data: monthSales
      };
    } else {
      return monthSales
    }
  } catch (error) {
    return {
      data: error
    };
  }
}

// Total Sales
async function totalSales({
  req
}) {
  const {
    shop_id
  } = req.body;
  try {
    const results = await Invoice.find({
      shop_id
    });
    let revenue = 0;
    results.forEach(({
      grand_total
    }) => {
      revenue += grand_total;
    });

    return {
      message: "success",
      data: revenue
    };
  } catch (error) {
    return {
      data: error
    };
  }
}

// Today Sales
async function salesToday({
  req
}, raw = false) {
  const {
    shop_id
  } = req.body;
  try {
    const results = await Invoice.find({
      shop_id
    });
    const sales = {};
    const todaySale = {};
    let total = 0;
    results.forEach(({
      grand_total,
      createdAt,
      invoice_number
    }) => {
      const dayofweek = new Date(createdAt).toLocaleDateString("en-US", {
        weekday: "long",
      });
      const revenue = grand_total;
      if (!sales[createdAt]) {
        total = sales[dayofweek] ? (total += revenue) : revenue;
        sales[dayofweek] = {
          name: dayofweek,
          sale: total
        };
      } else {
        total += revenue;
        sales[dayofweek].sale = total;
      }
    });

    const salevalue = Object.values(sales);
    const newValue = salevalue[salevalue.length - 1];
    const subValue = salevalue[salevalue.length - 2];
    const value = Number((((newValue.sale - subValue.sale) / newValue.sale) * 100).toFixed(2));
    if (!raw) {
      return {
        message: "success",
        data: newValue,
        value
      };
    } else {
      return newValue;
    }
  } catch (error) {
    return {
      data: error
    };
  }
}

// Weekly sales
async function salesWeekly({
  req
}, raw = false) {
  const {
    shop_id
  } = req.body;
  try {
    // Set the start and end dates for the week
    const now = new Date();
    const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
    const endOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() + 6);

    // Aggregate the invoices for the week and the shop_id
    const result = await Invoice.aggregate([{
        $match: {
          createdAt: {
            $gte: startOfWeek,
            $lte: endOfWeek,
          },
          amount_paid: {
            $exists: true,
          },
          shop_id: mongoose.Types.ObjectId(shop_id),
        },
      },
      {
        $group: {
          _id: null,
          totalSales: {
            $sum: '$amount_paid',
          },
        },
      },
    ])
    const totalSales = result[0].totalSales;
    if (!raw) {
      return {
        message: "success",
        data: {
          totalSales
        }
      };
    } else {
      return totalSales;
    }
  } catch (error) {
    return {
      data: error
    };
  }
}

// Yearly sales
async function salesYearly({
  req,
}, raw = false) {
  const {
    shop_id
  } = req.body;
  try {
    // Set the start and end dates for the year
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const endOfYear = new Date(now.getFullYear(), 11, 31);

    // Aggregate the invoices for the week and the shop_id
    const result = await Invoice.aggregate([{
        $match: {
          createdAt: {
            $gte: startOfYear,
            $lte: endOfYear,
          },
          amount_paid: {
            $exists: true,
          },
          shop_id: mongoose.Types.ObjectId(shop_id),
        },
      },
      {
        $group: {
          _id: null,
          totalSales: {
            $sum: '$amount_paid',
          },
        },
      },
    ])
    const totalSales = result[0].totalSales;
    if (!raw) {
      return {
        message: "success",
        data: {
          totalSales
        }
      };
    } else {
      return totalSales;
    }
  } catch (error) {
    return {
      data: error
    };
  }
}



module.exports = {
  fetchDaySales,
  fetchMonthSales,
  totalSales,
  salesToday,
  monthSales,
  salesWeekly,
  salesYearly
};