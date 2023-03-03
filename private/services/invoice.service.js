const Product = require("../schemas/Product");
const Invoice = require("../schemas/Invoice");
const Returns = require("../schemas/Returns");


function generateInvoiceNumber() {
  // var count = oldInvoiceNumber.match(/\d*$/);

  // // Take the substring up until where the integer was matched
  // // Concatenate it to the matched count incremented by 1
  // return oldInvoiceNumber.substr(0, count.index) + ++count[0];
  const today = new Date();

  let day = today.getDate();
  let month = today.getMonth() + 1;
  const year = today.getFullYear().toString().substring(2);
  month = month.toString().length === 1 ? "0" + month : month;
  day = day.toString().length === 1 ? "0" + day : day;
  let randomDigits = (Math.floor(Math.random() * 99999) + 100000).toString();
  return "IN" + day + year + month + randomDigits;
}

async function fetchInvoice({ store_id }) {
  try {
    const result = await Invoice.find({ store_id });
    return { message: "success", data: result };
  } catch (error) {
    return { message: "an error occurred, please try again" };
  }
}

async function fetchInvoicePerDay({ store_id }) {
  // try {
  //   const result = await Invoice.find({ store_id });
  //   return { message: "success", data: result };
  // } catch (error) {
  //   return { message: "an error occurred, please try again" };
  // }
  // try{
    const salesPerDay = await Invoice.aggregate([
      {
        $match: {
          shop: store_id,
          payment_type: 'Cash'
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $unwind: '$products_summary',
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: '$createdAt',
            },
          },
          goods_sold: {$sum: '$products_summary.quantity'},
          totalSales: { $sum: '$amount_paid' },
          goods_returned: { $sum: 0}
        },
      },
    ])
   
    return {message: "success", data: salesPerDay}
  // } catch (error) {
  //   return { message: "an error occurred, please try again" };
  // }
  // console.log(salesPerDay);
    // .then(salesByDate => console.log('Sales by date:', salesByDate))
    // .catch(err => console.error('Error retrieving sales from database', err));
}

async function addInvoice({ req }) {
  const { name } = req.body;

  try {
    const invoice_number = generateInvoiceNumber();
    await Invoice.create({
      ...req.body,
      invoice_number,
    });
    const { products_summary } = req.body;
    products_summary.forEach(
      async ({ product_id, quantity }) =>
        await Product.updateOne(
          {
            _id: product_id,
          },
          { $inc: { total_stock: -quantity } }
        )
    );

    return { message: "success" };
  } catch (error) {
    return { message: "Failed to add invoice.", data: error };
  }
}

module.exports = { fetchInvoice, addInvoice, fetchInvoicePerDay };
