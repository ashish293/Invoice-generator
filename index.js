const { createInvoice } = require("./generateInvoice");

const trainingData = {
	_id: "dd04ce4e-b6c7-4312-8468-2a0a037b7d77",
	PARTNER_ID: "113672954398562159078",
	BILL: {
		grandTotal: 0.8,
		total: 2,
		discount: 1.2,
	},
	UUID: "dd04ce4e-b6c7-4312-8468-2a0a037b7d77",
	ORDER_TYPE: 1,
	COMMISSION: {
		amount: 0.09600000000000002,
		percent: 12,
		payable: 0.7040000000000001,
	},
	DISTANCE: "0 m",
	MERCHANT_ID: "113672954398562159078",
	LOCATION: {
		google_id: "ChIJRcbZaklDXz4RYlEphFBu5r0",
		name: "Dubai",
		longitude: 55.2707828,
		latitude: 25.204849300000003,
		address: "Dubai - United Arab Emirates",
	},
	APP_VERSION: "2.0.0-cp:v00",
	RECEIVED_ON: "Sun Mar 22 2020 01:24:49 GMT+0000 (UTC)",
	PHONE_NUMBER: "+919833189399",
	RECEIVED_ON_KEY: "20200322",
	STALL_ID: "76753826-9948-4e93-ab0a-b69ac38571e6",
	STATUS: "DELIVERED",
	DELIVERY_TYPE: "REG",
	NUMBER: "JX8R2082",
	TOTAL: 0.8,
	CUSTOMER_ID: "113672954398562159078",
	ITEMS: [
		{
			productId: "8f27990b-4a93-4f51-86dc-4b5bd03eeaf1",
			name: "Bbgg",
			quantity: 1,
			variantId: 0,
			size: "N",
			color: null,
			material: null,
			price: 2,
			imageId: "8f27990b-4a93-4f51-86dc-4b5bd03eeaf1/0.4434882365167141.jpg",
		},
	],
	PAYMENT_MODE: "COD",
	RECEIVED_DATE: {
		$date: "2020-03-22T01:24:49.000Z",
	},
	STALL: {
		UUID: "76753826-9948-4e93-ab0a-b69ac38571e6",
		NAME: "FRESH FRUITS SHOP",
		TYPE: "FRUITS SHOP",
		MIN_DELIVERY_HOURS: "30-45 min.",
		PHONE_NUMBER: "7061468801",
		MERCHANT_ID: "113672954398562159078",
		PARTNER_ID: "100211879481717104473",
		ENABLE_CHAT: true,
		ADDRESS: "Jamshedpur",
		IMAGE_ID: "80b19877-6be8-4c0c-ad16-edd4ce4c6f24",
	},
	ADDRESS: "VIVANT G 1003",
	CUSTOMER: {
		UUID: "113672954398562159078",
		FIRST_NAME: "Shrida",
		LAST_NAME: "Jaiswal",
		PHONE_NUMBER: "+919833189399",
		PHOTO_URL:
			"https://lh3.googleusercontent.com/a-/AAuE7mDZ8rWTJLKx89v4DiwwgkYujwjwT4tVOsi-lXi2RzU",
		CREATED_AT: "Sun Mar 22 2020 01:23:07 GMT+0000 (UTC)",
	},
	PARTNER: {
		UUID: "113672954398562159078",
		FIRST_NAME: "Shrida",
		LAST_NAME: "Jaiswal",
		PHONE_NUMBER: "+919833189399",
		PHOTO_URL:
			"https://lh3.googleusercontent.com/a-/AAuE7mDZ8rWTJLKx89v4DiwwgkYujwjwT4tVOsi-lXi2RzU",
		CREATED_AT: "Sun Mar 22 2020 01:23:07 GMT+0000 (UTC)",
	},
};

createInvoice(trainingData, "invoice.pdf");