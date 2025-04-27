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
  containerMovements.innerHTML = "";
  movements.forEach(function (mov, i) {
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
  // console.log(currentAccount);
  if (currentAccount?.pin === Number(inputPin.value)) {
    //  Display UI and message
    welcomeMessage.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    content.style.opacity = 1;
    // Clear input fields
    inputPin.value = "";
    inputPin.blur();
    inputUser.value = "";

    // Display movements
    displayMovements(currentAccount.movements);
    // Display balance
    calcDisplayBalance(currentAccount.movements);
    // Display summary
    calcDisplaySummary(currentAccount);
  }
});

// calcDisplayBalance
const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${balance}€
`;
};

// calcDisplaySummary
const calcDisplaySummary = function (acc) {
  // IN
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  sumIn.textContent = `${incomes}€`;
  sumIn.style.color = "green";
  // OUT
  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  sumOut.textContent = `${Math.abs(out)}€`;
  sumOut.style.color = "red";
  // interest
  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int) => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  interestValue.textContent = `${interest}€`;
  interestValue.style.color = "green";
};
