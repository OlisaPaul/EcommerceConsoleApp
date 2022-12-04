import products from "./products.js";

// What we have here is the list of inputs we require from the user
// We use inquirer module format to store these inputs
// The actual inputs the user sees is stored as the value of the message property

const mainQuestions = [
  {
    // The confirm type gives the user two options, yes or no (which are Boolean, Yes been true and no been false)
    // The users input is stored in an object called answers with the name property as the answers property.
    // The user input is stored as values of these property
    type: "confirm",
    name: "interest",
    message: "Would you like to buy from us?",
  },
  {
    type: "input",
    name: "name",
    message: "What's your name?",

    // with the the when method, we decide wether this question would be displayed or not
    // so if the answers.interest value is false, this question would be skipped
    when(answers) {
      return answers.interest;
    },
    validate(value) {
      const pass = value.match(/([a-zA-Z].*?){3}/);
      if (pass) {
        return true;
      }
      return "Please provide a name more than 3 characters";
    },
  },
  {
    type: "input",
    name: "email",
    message: `What's your email?`,
    when(answers) {
      // This Displays the users name based on the input that was input by the user
      console.log(`Hi ${answers.name}!`);
      return answers.interest;
    },
    validate(value) {
      // Here we set a validator to check if the user is input the right email format
      const pass = value.match(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/);
      if (pass) {
        return true;
      }

      // We get the below message when the user puts in the wrong format and they are asked to put in the right format

      return "Please enter a valid email address";
    },
  },
  {
    type: "input",
    name: "phone",
    message: "What's your phone number?",
    validate(value) {
      // Here we set a validator to check if the user is input the right number format
      const pass = value.match(
        /^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i
      );
      if (pass) {
        return true;
      }

      // We get the below message when the user puts in the wrong format and they are asked to put in the right format

      return "Please enter a valid phone number";
    },
    when(answers) {
      return answers.interest;
    },
  },
  {
    // We use the list type to display a list of options the users can select from,
    // So instead of manually typing the answers, the users selects the right answers from this list.
    type: "list",
    name: "products",
    message: "Which product would like to buy",
    // The "choices" property is where can give inquirer, the list of possible answers the user can select
    // It is set to either an array or a function
    // we use the products.map (which returns an array) to provide this list
    // the products array, is an array of objects which has a name property,
    // So we are picking just the name property from this array using the map method
    choices: products().map((a) => a.name),
    when(answers) {
      return answers.interest;
    },
    // We fiter property to decide what is actually stored in the answers object based on the user's input
    filter(value) {
      // the filter method that is used below is an aray method, not the same filter as the inquirer property
      // Remember the user's inputs in this case is property of one of the products element which is an object
      // So, we use the below filter method to convert this input to that element
      return products().filter((a) => a.name === value)[0];
    },
  },
  {
    type: "list",
    name: "amount",
    message: "How Many?",
    choices(answers) {
      // The below line dynamically produces an array between 1 and the number in stock of the particular item that was selected by the user
      const array = [];
      for (let i = 1; i <= answers.products.numberInStock; i++) {
        array.push(i);
      }
      return array;
    },
    when(answers) {
      return answers.interest;
    },
  },
  {
    type: "confirm",
    name: "moreItems",
    message: "Would you like to buy anything else?",
  },
  {
    type: "confirm",
    name: "viewCart",
    message: "Press enter to view cart",
    when(answers) {
      return !answers.moreItems;
    },
  },
];

const addMoreItemsQuestions = mainQuestions
  .slice(4, mainQuestions.length)
  .map((a) => {
    if (a.name !== "viewCart") delete a.when;
    return a;
  });

const confirmCartQuestions = [
  {
    type: "confirm",
    name: "checkout",
    message: "Please confirm your cart",
  },
];

export { mainQuestions, addMoreItemsQuestions, confirmCartQuestions };
