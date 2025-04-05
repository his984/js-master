"use strict";

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

// DisplayMovements

const displayMovements = function (movements) {
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
                    <div class="movements_date">2025-01-01 - 00:00</div>
                    </div>
                    <div class="movements_value">${mov}$</div>
                  </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

displayMovements(account1.movements);
