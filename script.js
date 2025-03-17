const arr = ["a", "b", "c", "d"];
const zrr = ["e", "f", "g", "h", "i"];
const numbers = [2, 4, 6, 8, 10];

// Spread operator
console.log(...numbers);

// Full example for destructuring
const [first, second, ...rest] = arr;
console.log(first, second, rest);

// Spread operator
const total = [...arr, ...zrr];
console.log(total);

// for loop
for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i] + 2);
}
// for of
for (const number of numbers) {
  console.log(number + 2);
}
// for of with entries

for (const number of numbers.entries()) {
  console.log(`${number[0] + 1}: ${number[1]}`);
}
// for of with destructuring
for (const [i, element] of numbers.entries()) {
  console.log(`${i + 1}: ${element}`);
}


