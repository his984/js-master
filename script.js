"use strict";
// BANKIST APP
//  Data
const accounts = [
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

// #region Elements
const containerMovements = document.querySelector(".movements");
const sumBalance = document.querySelector(".balance_value");
const sumIn = document.querySelector(".summary__value--in");
const sumOut = document.querySelector(".summary__value--out");
const interestValue = document.querySelector(".summary__value--interest");
const inputUser = document.querySelector(".inputUser");
const inputPin = document.querySelector(".inputPin");
const loginBtn = document.querySelector(".loginBtn");
const welcomeMessage = document.querySelector(".welcome");
const app = document.querySelector(".app");
const formInputTo = document.querySelector(".transferTo");
const formInputAmount = document.querySelector(".amount");
const btnTransform = document.querySelector(".transferBtn");
const closeAccBtn = document.querySelector(".closeAccBtn");
const confirmUser = document.querySelector(".confirm-user");
const confirmPIN = document.querySelector(".confirm-pin");
const sortBtn = document.querySelector(".sortBtn");
// #endregion

// DisplayMovements
const displayMovements = function (movements) {
  containerMovements.innerHTML = "";
  movements.forEach(function (mov) {
    const type = mov > 0 ? "deposit" : "withdraw";
    const html = `<div class="movements_row">
                    <div class="movements_details">
                      <div class="movements__type ${type}">${type}</div>
                      <div>2025-01-01</div>
                    </div>
                    <div class="movements_value">${mov}</div>
                  </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};
// -------------------------------------------------------
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
// -------------------------------------------------------
// calcDisplayBalance
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  sumBalance.textContent = `${acc.balance}€`;
};
// -------------------------------------------------------
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
// -------------------------------------------------------
// Update UI
const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);
  // Display balance
  calcDisplayBalance(acc);
  //  Display summary
  calcDisplaySummary(acc);
};
// -------------------------------------------------------

// Event handler (Login)
let currentAccount;
loginBtn.addEventListener("click", function (e) {
  e.preventDefault();
  currentAccount = accounts.find(function (acc) {
    return acc.userName === inputUser.value;
  });
  if (currentAccount?.pin === Number(inputPin.value)) {
    //  Display UI and message
    welcomeMessage.textContent = `Welcome, ${
      currentAccount.owner.split(" ")[0]
    }`;
    // Clear input fields
    inputPin.value = "";
    inputPin.blur();
    inputUser.value = "";
    // Display account details
    app.style.opacity = 100;
    // Update UI
    updateUI(currentAccount);
  }
});
// -------------------------------------------------------
// Transfer Money
btnTransform.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(formInputAmount.value);
  const receiverAccount = accounts.find(
    (acc) => acc.userName === formInputTo.value
  );
  // console.log(amount, receiverAccount);
  formInputAmount.value = formInputTo.value = "";
  if (
    amount > 0 &&
    receiverAccount &&
    currentAccount.balance >= amount &&
    receiverAccount?.userName !== currentAccount.userName
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);
    // Update UI
    updateUI(currentAccount);
  }
});
// -------------------------------------------------------
// Close account
closeAccBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    confirmUser.value === currentAccount.userName &&
    Number(confirmPIN.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.userName === currentAccount.userName
    );
    // console.log(index);
    accounts.splice(index, 1);
    // Hide account details - RESET- UI
    app.style.opacity = 0;
    welcomeMessage.textContent = "Log in to get started";
  }
  confirmPIN.value = confirmUser.value = "";
});
// -------------------------------------------------------
// Sort movements
let sorted = false;
sortBtn.addEventListener("click", function (e) {
  e.preventDefault();

  const sortedMovs = sorted
    ? currentAccount.movements
    : currentAccount.movements.slice().sort((a, b) => a - b);

  displayMovements(sortedMovs);
  sorted = !sorted;
});
// -------------------------------------------------------
