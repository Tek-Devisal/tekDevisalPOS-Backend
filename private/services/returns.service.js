const {
  default: mongoose
} = require("mongoose");
const Invoice = require("../schemas/Invoice");
const Product = require("../schemas/Product");
const Returns = require("../schemas/Returns");

async function addReturns({
  req
}) {
  const {
    invoice_number,
    shop_id
  } = req.body;
  try {
    const invoices = Invoice.find({
      shop_id,
      invoice_number,
    });
    const [invoicesRes] = await Promise.all([invoices.exec()]);

    const newData = [...invoicesRes];
    if (newData.length === 0) {
      return {
        status: "failed",
        message: `No order found with the invoice number ${invoice_number}`,
      };
    } else {
      const exist = await Returns.find({
        invoice_number
      });
      if (exist.length === 0) {
        newData.length !== 0 &&
          (await Returns.create({
            invoice_number,
            shop_id
          }));
        newData[0].products_summary.forEach(
          async ({
            product_id,
            quantity
          }) => {
            await Product.updateOne({
              _id: product_id,
            }, {
              $inc: {
                total_stock: +quantity
              },
            });
          }
        );
      } else {
        return {
          status: "failed",
          message: "Invoice already returned"
        };
      }
    }
    return {
      status: "success",
      message: "invoice data retrieved successfully",
      data: newData,
    };
  } catch (error) {
    return {
      status: "error",
      message: "an error occurred, please try again"
    };
  }
}

async function fetchReturns({
  shop_id
}) {
  let newResults = [];
  try {
    const results = await Returns.find({
      shop_id
    });
    for (let result of results) {
      newResults.push(await Invoice.find({
        ...result.invoice_number
      }));
    }
    return {
      message: "success",
      data: results
    };
  } catch (error) {
    return {
      message: error
    };
  }
}

async function groupReturnByDate({
  shop_id
}) {
  try {
    const results = await Returns.aggregate([{
        $match: {
          shop_id: mongoose.Types.ObjectId(shop_id),
        },
      },
      {
        $group: {
          _id: {
            date: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$createdAt",
              },
            },
          },
          // returns: {
          //   $push: "$$ROOT",
          // },
        },
      },
      {
        $sort: {
          "_id.date": -1,
        },

      },
      {
        $project: {
          date: "$_id.date",
          _id: 0
        }
      }

    ]);

    return {
      message: "success",
      data: results
    }
  } catch (error) {
    return {
      message: error,
    };
  }
}

async function fetchReturnSummaryUsingDate({
  date
}) {
  try{
    // console.log(date);
    const startDate = new Date(date);
    const endDate = new Date(date); 

    const results = await Invoice.aggregate([{
          $match: {
            createdAt: {
              $gte: startDate,
              $lte: endDate
            }
          }
        },
        {
          $group: {
            _id: 0,
            totalAmountPaid: {
              $sum: "$amount_paid"
            },
            totalItemsSold: {
              $sum: {
                $size: "$products_summary"
              }
            }
          }
        }
      ])
      // const totalAmountPaid = results[0].totalAmountPaid;
      // const totalItemsSold = results[0].totalItemsSold;

      const output = {
        message: "success",
        data: [
          {
            totalAmountPaid: 03,
            totalItemsSold: 45
          }
        ]
      };
      return output;
  } catch (error) {
    return {
      message: error,
    };
  }
}

module.exports = {
  addReturns,
  fetchReturns,
  groupReturnByDate,
  fetchReturnSummaryUsingDate
};