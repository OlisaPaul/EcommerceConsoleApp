// We use the below lines to import the properties which we export from other modules
import products from "./products.js";
import { mainQuestions } from "./questions.js";
import answer from "./answer.js";

// The index.js file s where the ochestration happens
// We import the key features from the other module in this application here
// with this we can use a module in more than one place, and it becomes the single source of truth

// This logs the Welcome message to the console
console.log(`Welcome to Olisa store, here are the list of products we have: `);

// The below line displays the list of products we have in our products module in a list format
products().map((a) => {
  console.log(`Product: ${a.name}`);
});

answer(mainQuestions);
