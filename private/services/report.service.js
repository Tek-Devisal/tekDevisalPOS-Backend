const PdfPrinter = require("pdfmake");
const pdfMake = require("pdfmake");
const fs = require("fs");
const Invoice = require("../schemas/Invoice");
const { jsPDF } = require("jspdf");
const FileSaver = require("file-saver");
const { salesYearly, salesWeekly, monthSales, salesToday, fetchMonthSales } = require("./sales.services");

async function fetchReports({ req, res }) {
  const { shop_id } = req.body;
  // const results = await Invoice.find({ shop_id });

  let pdfFile = null;
  const fonts = {
    Roboto: {
      normal: "fonts/Poppins-Regular.ttf",
      bold: "fonts/Poppins-Bold.ttf",
    },
  };
  // return { message: "success", data: results };

  try {
    // Define the PDF content
    const docDefinition = {
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5],
        },
        tableExample: {
          margin: [0, 5, 0, 15],
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: "black",
        },
      },
      content: [
        { text: "Tables", style: "header" },
        {
          table: {
            headerRows: 1,
            widths: ["*", "*", "*", "*", "*"],
            body: [
              ["#", "INVOICE NO.", "NAME", "TOTAL", "DATE"],
              ["Row 1", "Row 1", "Row 1", "Row 1", "Row 1"],
              ["Row 2", "Row 2", "Row 2", "Row 2", "Row 2"],
            ],
          },
        },
      ],
    };

    const pdfDoc = new PdfPrinter(fonts);
    let pdfFiles = pdfDoc.createPdfKitDocument(docDefinition);
    pdfFiles.pipe(res.attachment("table.pdf"));
    pdfFiles.end();

    // const blob = new Blob(["Hello, world!"], {
    //   type: "text/plain;charset=utf-8",
    // });
    // FileSaver.saveAs(blob, "hello world.txt");

    return { message: "success", data: pdfFiles };
  } catch (error) {}
}


async function fetchDailyReports({ req, res }) {
  const { shop_id } = req.body;
  const dailyreport = await Invoice.find({ shop_id });

  console.log(sales);
}


async function dailyCashRecieved({ req, res }){
  const { shop_id } = req.body;
  
  const daily_sales = await salesToday({req}, true)
  const weekly_sales = await salesWeekly({req}, true)
  const monthly_sales = await fetchMonthSales({req}, true)
  const yearly_sales = await salesYearly({req}, true)

  return {
    message: "success",
    data: {
      "daily_sales": 34340,
      "weekly_sales": weekly_sales ?? 0,
      "monthly_sales": 1220,
      "yearly_sales": yearly_sales ?? 0
    }
  }
  
  // console.log("yearly:"+yearly_sales);
}



async function dailyBorrowed({ req, res }){
  const { shop_id } = req.body;
  
  const daily_borrowed = await salesToday({req}, true)
  const weekly_borrowed = await salesWeekly({req}, true)
  const monthly_borrowed = await fetchMonthSales({req}, true)
  const yearly_borrowed = await salesYearly({req}, true)

  return {
    message: "success",
    data: {
      "daily_borrowed": 34340,
      "weekly_borrowed": 332,
      "monthly_borrowed": 1220,
      "yearly_borrowed": 555
    }
  }
  
  // console.log("yearly:"+yearly_sales);
}


module.exports = { fetchReports, fetchDailyReports, dailyCashRecieved, dailyBorrowed };
