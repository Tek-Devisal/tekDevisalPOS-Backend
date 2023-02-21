const PdfPrinter = require("pdfmake");
const pdfMake = require("pdfmake");
const fs = require("fs");
const Invoice = require("../schemas/Invoice");
const { jsPDF } = require("jspdf");
const FileSaver = require("file-saver");
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

module.exports = { fetchReports };
