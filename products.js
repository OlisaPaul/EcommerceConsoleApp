// This shows the list of products

const products = [
  {
    name: "Nivea Roll-on",
    numberInStock: 7,
    id: 1,
    costInNaira: 1000,
  },
  { name: "Nivea Face Cream", numberInStock: 8, id: 2, costInNaira: 1800 },
  { name: "Nivea Lip Balm", numberInStock: 10, id: 3, costInNaira: 700 },
];

export default function productsFunc() {
  return products;
}
