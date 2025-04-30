const bankAccounts = [
  {
    owner: "Jonas Schmedtmann",
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2,
    pin: 1111,
  },
  {
    owner: "Jessica Davis",
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
  },
  {
    owner: "Steven Thomas Williams",
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
  },
  {
    owner: "Sarah Smith",
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
  },
];
console.log(bankAccounts);
console.log(bankAccounts[0].movements);

// filter
const deposit = bankAccounts[0].movements.filter(function (mov) {
  return mov > 0;
});
// const withdraws = bankAccounts.movements.filter((mov) => mov < 0);
console.log(deposit);

// reduce
const balance = bankAccounts[0].movements.reduce(function (acc, cur) {
  return acc + cur;
}, 0);
console.log(balance);

// Maximum value
const max = bankAccounts[1].movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, bankAccounts[1].movements);

// PIPELINE
const eurToUsd = 1.1;
const totalDepositsUSD = bankAccounts[0].movements
  .filter((mov) => mov > 0)
  .map((mov) => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD);

// find
const firstWithDrawal = bankAccounts[0].movements.find((mov) => mov < 0);
console.log(firstWithDrawal);
const bankAccount = bankAccounts.find((acc) => acc.owner === "Jessica Davis");
console.log(bankAccount);

// findIndex
// findLast
console.log("------------------------");
console.log(accounts[0].movements);
const lastWithdrawal = accounts[0].movements.findLast((mov) => mov < 0);
console.log(lastWithdrawal);

// flat
const arr = [[5, 1, 54, 4], [1, 5, 6, 78], 2, 5, 6];
console.log(arr.flat());
// const accountsMovements = bankAccounts.map((acc) => acc.movements);
// console.log(accountsMovements);
// const allMovements = accountsMovements.flat();
// console.log(allMovements);
// const overallBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
// console.log(overallBalance);
const overallBalance = bankAccounts
  .map((acc) => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance);

// flatMap
const overallBalance2 = bankAccounts
  .flatMap((acc) => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance2);

// sorting arrays
// Strings
const users = ["Adam", "Hisham", "Oscar", "Wissam"];
console.log(users.sort());
// Numbers
// return < 0, if a is less than b (keep order)
// return > 0, if a is greater than b (switch order)
const numbers = [200, 450, -400, 3000, -650, -130, 70, 1300];
numbers.sort(function (a, b) {
  // if (a > b) return 1;
  // if (a < b) return -1;
  // return 0;
  return a - b; // ascending order
  // return b - a; // descending order
});
console.log(numbers);
