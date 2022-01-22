const fs = require("fs");
const PDFDocument = require("pdfkit");

const generateHr = (doc, y) => {
	doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(20, y).lineTo(380, y).stroke();
};
const generateHrDashed = (doc, y) => {
	doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(30, y).lineTo(370, y).dash(5).stroke().undash();
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
	const customerInformationTop = 125;
	doc
		.roundedRect(20, 115, 360, 80, 4)
		.fillOpacity(0.4)
		.fillAndStroke("#D3DEDC", "#92A9BD")
		.fontSize(16)
		.fillOpacity(1)
		.fillColor("#9E9E9E")
		.text("Customer Details", 20, 95)
		.fontSize(12)
		.fillColor("#000000")
		.font("Helvetica-Bold")
		.text("Name:", 35, customerInformationTop)
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

const generateStall = (doc, invoice) => {
	doc
		.fillColor("#9E9E9E")
		.fontSize(16)
		.text("Stall Details", 20, 210)
		.roundedRect(20, 230, 360, 70, 4)
		.fillOpacity(0.4)
		.fillAndStroke("#D3DEDC", "#92A9BD")
		.fillOpacity(1)
		.fillColor("#000")
		.fontSize(12)
		.font("Helvetica-Bold")
		.text("Name:", 35, 240)
		.text("Type:")
		.text("Phone:")
		.text("Address:")
		.font("Helvetica")
		.text(invoice.STALL.NAME, 200, 240)
		.text(invoice.STALL.TYPE)
		.text(invoice.STALL.PHONE_NUMBER)
		.text(invoice.STALL.ADDRESS);
};

const generateOrders = (doc, invoice) => {
	doc.fillColor("#9E9E9E").fontSize(16).text("Orders", 20, 315);
	let itemTop = 335;
	doc
		.roundedRect(20, itemTop, 360, 50 * invoice.ITEMS.length, 4)
		.fillOpacity(0.4)
		.fillAndStroke("#D3DEDC", "#92A9BD")
		.fillOpacity(1);
	invoice.ITEMS.map((item, index) => {
		doc
			.fillColor("#000000")
			.fontSize(14)
			.text(item.name, 35, itemTop + 5)
			.fontSize(12)
			.text("size: " + item.size)
			.fontSize(10)
			.text("color: " + item.color)
			.fontSize(12)
			.text("Quantity:", 280, itemTop + 5)
			.text("Price:")
			.text(item.quantity, 330, itemTop + 5)
			.text(item.price + "x" + item.quantity);
		// generateHrDashed(doc, itemTop);
		itemTop += 50;
	});
	generateBill(doc, invoice, itemTop);
};
const generateBill = (doc, invoice, itemTop) => {
	itemTop += 10;
	generateHrDashed(doc, itemTop);
	itemTop += 10;
	const delivery = 30;
	doc
		.fontSize(14)
		.text("Total:", 30, itemTop)
		.text("Discount:")
		.text("Grand total:")
		.text(invoice.BILL.total, 320, itemTop, {
			align: "right",
			width: 50,
		})
		.text(invoice.BILL.discount, {
			align: "right",
			width: 50,
		})
		.text(invoice.BILL.grandTotal, {
			align: "right",
			width: 50,
		});
};

const generateBrief2 = (doc, invoice) => {
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
const generateOrders2 = (doc, invoice) => {
	doc.fillColor("#9E9E9E").fontSize(16).text("Orders", 20, 240);
	generateHr(doc, 260);
	let itemTop = 280;
	invoice.ITEMS.map((item, index) => {
		doc
			.roundedRect(30, itemTop, 340, 55, 4)
			.fillOpacity(0.4)
			.fillAndStroke("#D3DEDC", "#92A9BD")
			.fillOpacity(1)
			.fillColor("#000")
			.fontSize(16)
			.text(item.name, 35, itemTop + 5)
			.fontSize(14)
			.text("size: " + item.size)
			.fontSize(12)
			.text("color: " + item.color)
			.text("QNT", 300, itemTop + 10, { align: "center" })
			.text(item.quantity, { align: "center" })
			.text("Price:   " + item.price + " x " + item.quantity, 270, itemTop + 40, {
				align: "center",
			});
		itemTop += 50;
	});
	generateBill(doc, invoice, itemTop);
};

const createInvoice = (invoice, path) => {
	let doc = new PDFDocument({ size: [400, 440 + invoice.ITEMS.length * 55], margin: 20 });
	generateHeader(doc);
	generateBrief(doc, invoice);
	generateStall(doc, invoice);
	generateOrders(doc, invoice);
	doc.end();
	doc.pipe(fs.createWriteStream(path));
};

module.exports.createInvoice = createInvoice;
