"use strict";
// BANKIST APP
// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};
const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};
const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};
const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};
const accounts = [account1, account2, account3, account4];
// ELEMENTS
const containerMovements = document.querySelector(".movements");
const labelBalance = document.querySelector(".balance_value");
const sumIn = document.querySelector(".summary__value--in");
const sumOut = document.querySelector(".summary__value--out");
const interestValue = document.querySelector(".summary__value--interest");
const inputUser = document.querySelector(".inputUser");
const inputPin = document.querySelector(".inputPin");
const loginBtn = document.querySelector(".loginBtn");
const welcomeMessage = document.querySelector(".welcome");
const content = document.querySelector(".content");
// DisplayMovements
const displayMovements = function (movements) {
  // Clear the container before displaying new movements
  containerMovements.innerHTML = "";
  movements.forEach(function (mov, i) {
    // Creating a row for each movement
    //  Using template literals for better readability
    //  Using insertAdjacentHTML to add the new row to the container
    //  Using a ternary operator to determine the type of movement
    //  Using a template literal to create the HTML for the row
    //  Using the index to display the movement number
    //  Using the movement value to display the amount

    const type = mov > 0 ? "deposit" : "withdraw";
    const html = `<div class="movements_row">
                    <div class="movements_details">
                        <div class="movements__type ${type}">${type} ${i + 1} 
                    </div>
                    <div class="movements_Start at">2025-01-01 - 00:00</div>
                    </div>
                    <div class="movements_value">${mov}$</div>
                  </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};
displayMovements(account1.movements);

// Computing usernames
const createUserNames = function (accs) {
  accs.forEach(function (acc) {
    acc.userName = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
createUserNames(accounts);

// Event handler
let currentAccount;
loginBtn.addEventListener("click", function (e) {
  e.preventDefault();
  currentAccount = accounts.find((acc) => acc.userName === inputUser.value);
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputPin.value)) {
    //  Display UI and message
    welcomeMessage.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    content.style.opacity = 1;
    // Display movements
    // Display balance
    // Display summary
  }
});

// calcDisplayBalance
const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${balance}€
`;
};
calcDisplayBalance(account1.movements);

// calcDisplaySummary
const calcDisplaySummary = function (movements) {
  // IN
  const incomes = movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  sumIn.textContent = `${incomes}€`;
  sumIn.style.color = "green";
  // OUT
  const out = movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  sumOut.textContent = `${Math.abs(out)}€`;
  sumOut.style.color = "red";
  // INTEREST
  // Calculate the total interest earned on deposits
  // Filter deposits (positive movements), calculate interest (1.2% of each deposit),
  // filter out interests below 1, and sum up the remaining interests
  const interest = movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * 1.2) / 100)
    .filter((int) => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  interestValue.textContent = `${interest}€`;
  interestValue.style.color = "green";
};
calcDisplaySummary(account1.movements);

// ------------------------*******--------------------------------
// ------------------------*******--------------------------------
// ------------------------*******--------------------------------
// filter
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const deposit = movements.filter(function (mov) {
  return mov > 0;
});
const withdraws = movements.filter((mov) => mov < 0);
// console.log(movements);
// console.log(deposit);
// console.log(withdraws);
// reduce
// accumulator -> SNOWBALL
const balance = movements.reduce(function (acc, cur, i, arr) {
  // console.log(`Iteration ${i}: ${acc}`);
  return acc + cur;
}, 0);
// console.log(balance);
// Maximum value
const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);
// console.log(max);

//
const eurToUsd = 1.1;
// PIPELINE
const totalDepositsUSD = movements
  .filter((mov) => mov > 0)
  .map((mov) => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);
// console.log(totalDepositsUSD);

// find
const firstWithDrawal = movements.find((mov) => mov < 0);
// console.log(movements);
// console.log(firstWithDrawal);

//
// console.log(accounts);
const account = accounts.find((acc) => acc.owner === "Jessica Davis");
// console.log(account);
