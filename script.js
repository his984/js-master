"use strict";

const cla = ["a", "b", "c"];
const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const obj = {
  name: "John",
  age: 30,
  // cla: cla,
  // es6 enhanced object literals syntax
  cla,
  // method
  greet() {
    console.log("Hello");
  },
  // Computed property names
  [weekdays[3]]: "Thursday",
  // Short hand syntax
  weekdays, // weekdays: weekdays
};
console.log(obj);
// Optional chaining operator (?.)

const obj2 = {
  name: "John",
  age: 30,
  cla: cla,
  greet() {
    console.log("Hello");
  },
  weekdays: weekdays,
  address: {
    street: "123 Main St",
    city: "New York",
    country: "USA",
  },
};
console.log(obj2.address?.country);




