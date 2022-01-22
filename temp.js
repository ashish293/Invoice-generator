let arr = [
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
];
let sum = 0;

for (let i = 0; i < arr.length; i++) {}

let sum = arr.reduce((accumulator, curElem) => {
	return { x: (accumulator.price += curElem.price) };
});
console.log(sum.x);
