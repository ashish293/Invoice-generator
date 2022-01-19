const fs = require("fs");
const PDFDocument = require("pdfkit");

const generateHr = (doc, y) => {
	doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(20, y).lineTo(380, y).stroke();
};
const generateHrDashed = (doc, y) => {
	doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(30, y).lineTo(360, y).dash(5).stroke().undash();
};

const generateHeader = (doc) => {
	doc.image("logo.png", 15, 30, { width: 50 }).fontSize(34).text("Urbanstall", 75, 44);
};
const formatDate = (date) => {
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();
	const time = date.toLocaleTimeString();

	return day + "/" + month + "/" + year + "   " + time;
};

const generateBrief = (doc, invoice) => {
	doc.fillColor("#9E9E9E").fontSize(20).text("Invoice", 20, 115);
	generateHr(doc, 135);
	const customerInformationTop = 150;
	doc
		.fontSize(12)
		.fillColor("#000")
		.font("Helvetica-Bold")
		.text("Name:", 30, customerInformationTop)
		.text("Date:")
		.text("Mobile:")
		.text("Payment Mode:")
		.text("Address")
		.font("Helvetica")
		.text(invoice.CUSTOMER.FIRST_NAME + invoice.CUSTOMER.LAST_NAME, 200, customerInformationTop)
		.text(formatDate(new Date(invoice.RECEIVED_DATE.$date)))
		.text(invoice.CUSTOMER.PHONE_NUMBER)
		.text(invoice.PAYMENT_MODE)
		.text(invoice.ADDRESS);
};

const generateOrders = (doc, invoice) => {
	doc.fillColor("#9E9E9E").fontSize(20).text("Orders", 20, 240);
	generateHr(doc, 260);
	let itemTop = 280;
	for (let i = 0; i < 3; i++) {
		doc
			.roundedRect(30, itemTop, 340, 55, 4)
			.fillOpacity(0.4)
			.fillAndStroke("#D3DEDC", "#92A9BD")
			.fillOpacity(1)
			.fillColor("#000")
			.fontSize(16)
			.text("Cake", 35, itemTop + 5)
			.fontSize(14)
			.text("Dark Forest")
			.fontSize(12)
			.text("Cocobela")
			.text("QNT", 300, itemTop + 10, { align: "center" })
			.text("2", { align: "center" })
			.text("Price: 200 x 2", 280, itemTop + 40, { align: "center" });
		itemTop += 70;
	}
	generateHrDashed(doc, itemTop);
	itemTop += 10;
	doc
		.fontSize(14)
		.text("Base:", 200, itemTop)
		.text("Delivery:")
		.text("Total:")
		.text("1200", 330, itemTop)
		.text("30")
		.text("1230");
};

const createInvoice = (invoice, path) => {
	let doc = new PDFDocument({ size: [400, 700], margin: 20 });
	generateHeader(doc);
	generateBrief(doc, invoice);
	generateOrders(doc, invoice);
	doc.end();
	doc.pipe(fs.createWriteStream(path));
};

module.exports.createInvoice = createInvoice;
