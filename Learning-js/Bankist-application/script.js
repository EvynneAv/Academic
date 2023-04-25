'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `

        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${type} ${
      i + 1
    }</div>
          <div class="movements__value">${mov}€</div>
    </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
displayMovements(account1.movements);

const calcDisplayBalance = function (acc) {
  const balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  acc.balance = balance;
  labelBalance.textContent = `${acc.balance} €`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const outcomes = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)}`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${Math.abs(interest)}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  //Display movements
  displayMovements(acc.movements);
  //Display ballance
  calcDisplayBalance(acc);
  //Display summary
  calcDisplaySummary(acc);
};

//Event handler
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  //prevent from submiting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    //Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    //updateUI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc.username !== currentAccount
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount / 100)) {
    //add movement
    currentAccount.movements.push(amount);
    //update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  // if(inputCloseUsername) inputClosePin
  //clear fields

  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    //Delete account
    accounts.splice(index, 1);

    //hideUI
    containerApp.style.opacity = 0;
  }
  inputClosePin.value = inputCloseUsername.value = '';
});

let sorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
}); /////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
//tools
//let arr = ['a', 'b', 'c', 'd', 'e'];
//SLICE dont mutate
/*

console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));

console.log(arr.slice());
*/
//SPLICE mutate
/*
// console.log(arr.splice(2));
arr.splice(-1);
console.log(arr);
arr.splice(1, 2);
console.log(arr);
*/
//REVERSE mutate
/*
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);
*/
//CONCAT doesnt mutate
/*
const arr2 = ['j', 'i', 'h', 'g', 'f'];
const letters = arr.concat(arr2.reverse());
console.log(letters);

//JOIN doesnt mutate
console.log(letters.join(' - '));
console.log(letters);
*/
///THE NEW ARRAY METHOD
/*
const arr = [23, 11, 64];
//AT
console.log(arr[0]);
console.log(arr.at(0));
//getting last array element
console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1));
console.log('Evynne'.at(0));
*/
//FOREACH
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}

console.log('----- FOREACH -----');
movements.forEach(function (movement, index, array) {
  if (movement > 0) {
    console.log(`Movement ${index + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${index + 1}: You withdrew ${Math.abs(movement)}`);
  }
});
*/
//FOREACH WITH A MAP
/*
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});
*/
//FOREACH WITH SET
/*
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
//"_" unessessary variable
currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value} : ${value}`);
});
*/

//CODING CHALLENGE 1
//Test Data
/*
const julia1 = [3, 5, 2, 12, 7];
const kate1 = [4, 1, 15, 8, 3];

const julia2 = [9, 16, 6, 8, 3];
const kate2 = [10, 5, 6, 1, 4];

const checkDogs = function (dogsJulia, dogsKate) {
  const scJulia = dogsJulia.slice(1, 3);
  const allDogs = scJulia.concat(dogsKate);
  console.log(allDogs);
  allDogs.forEach(function (dog, i) {
    if (dog > 3) {
      console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`);
    } else {
      console.log(`Dog number ${i + 1} is still a puppy 🐶`);
    }
  });
};
checkDogs(julia1, kate1);
checkDogs(julia2, kate2);
*/
/*
//MAP METHOD
const euroToUsd = 1.1;
const movementsUSD = movements.map(
  mov => mov * euroToUsd

  //   function (mov) {
  //   return mov * euroToUsd;
  // }
);
console.log(movements);
console.log(movementsUSD);

const movementUSDfor = [];
for (const mov of movements) {
  movementUSDfor.push(mov * euroToUsd);
}
console.log(movementUSDfor);

const movementsDescription = movements.map(
  (mov, i, arr) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);
console.log(movementsDescription);
*/
//FILTER METHOD
/*
const deposits = movements.filter(mov => mov > 0);
console.log(deposits);

// const depositsFor = [];
// for (const mov of movements) if (mov > 0) depositsFor.push(mov);
// console.log(depositsFor);
const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);
*/

//REDUCE METHOD
/*
// const balance = movements.reduce(function (acumulator, mov, i, arr) {
//   console.log(`Iteration number ${i}: ${acumulator}`);
//   return acumulator + mov;
// }, 0);
const balance = movements.reduce((acumulator, mov, i) => acumulator + mov, 0);
console.log(balance);

let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);

//Maximum value with reduce

const maxMovement = movements.reduce(
  (acc, mov) => (acc < mov ? (acc = mov) : acc),
  movements[0]
);
console.log(maxMovement);
*/
//CHALLENGE 2
/*
const calcAverageHumanAge = function (ages) {
  const hAges = ages
    .map(function (dAge) {
      if (dAge <= 2) {
        return 2 * dAge;
      } else if (dAge > 2) {
        return 16 + dAge * 4;
      }
    })
    .filter(cAge => cAge >= 18);
  return hAges.reduce((acc, fAge) => (acc = acc + fAge), 0) / hAges.length;
};
console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));
// .reduce((acc,fAge)=>acc = acc+fAge ,0)
*/
//CHAINING METHODS
/*
const eurToUsd = 1.1;
const totalDepositUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositUSD);
*/
//CHALLENGE #3
/*
const calcAverageHumanAge = ages =>
  ages
    .map(dAge => (dAge <= 2 ? 2 * dAge : 16 + dAge * 4))
    .filter(cAge => cAge >= 18)
    .reduce((acc, fAge, i, arr) => (acc = acc + fAge / arr.length), 0);
console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));
*/
//FIND
/*
const firstWithdrawal = movements.find(mov => mov < 0);

console.log(movements);
console.log(firstWithdrawal);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');

console.log(account);

let accountFor = '';
for (const acc of accounts) {
  if (acc.owner === 'Jessica Davis') accountFor = acc;
}

console.log(accountFor);
*/
//SOME AND EVERY METHODS
/*
//Some
//Equality
console.log(movements);
console.log(movements.includes(-130));
//Condition
const anyDeposits = movements.some(mov => mov > 5000);
console.log(anyDeposits);
//Every
const everyDeposits = movements.some(mov => mov > 5000);
console.log(everyDeposits);
console.log(account4.movements.every(mov => mov > 0));

//separated callback
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
*/
//FLAT AND FLATMAP
//Flat
// const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
// console.log(arr.flat());

// const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
// console.log(arrDeep.flat(2));

// const accountMovements = accounts.map(acc => acc.movements);
// console.log(accountMovements);
// const allMovements = accountMovements.flat();
// console.log(allMovements);

// const overAllBalance = allMovements.reduce((acc, mov) => (acc += mov), 0);
// console.log(overAllBalance);
//flat
// const overAllBalanceChain = accounts
//   .map(acc => acc.movements)
//   .flat()
//   .reduce((acc, mov) => (acc += mov), 0);
// console.log(overAllBalanceChain);
// //flatMap
// const overAllBalanceChainWFlatMap = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((acc, mov) => (acc += mov), 0);
// console.log(overAllBalanceChainWFlatMap);

// Sorting arrays
// strings
// const owners = ['Jonas', 'zack', 'Adam', 'Marta'];
// console.log(owners.sort());
// Numbers
// console.log(movements);
// movements.sort((a, b) => {
//   //Ordem crescente
//   //Switch order
//   if (a > b) return 1;
//   //Keep the order
//   if (b > a) return -1;
// });

// console.log(movements);
// movements.sort((a, b) => {
//   //Ordem decrescente
//   if (a > b) return -1;
//   if (b > a) return 1;
// });

// console.log(movements);

// //best way
// movements.sort((a, b) => a - b);
// console.log(movements);
// //best way
// movements.sort((a, b) => b - a);
// console.log(movements);

//other ways to create a new array
// const arr = [1, 2, 3, 4, 5, 6, 7];
// console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// //empty arrays + fill method
// const x = new Array(7);
// console.log(x);
// x.fill(1, 3, 5);
// console.log(x);
// arr.fill(23, 2, 6);
// console.log(arr);

// //Array.from
// const y = Array.from({ length: 7 }, () => 1);
// console.log(y);

// const z = Array.from({ length: 7 }, (_, i) => i + 1);
// console.log(z);

// const dice = Array.from({ length: 100 }, () => {
//   const o = Math.trunc(Math.random() * 6) + 1;
//   return o;
// });
// console.log(dice);

// const movementsUI = Array.from(document.querySelectorAll('.movements__value'));

// labelBalance.addEventListener('click', function () {
//   const movementsUI = Array.from(
//     document.querySelectorAll('.movements__value'),
//     el => el.textContent.replace('€', '')
//   );

//   console.log(movementsUI);
// });

//practice
//All the bank deposits
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, cur) => sum + cur, 0);

console.log(bankDepositSum);
//How many deposits there have been in the bank with at least 1000$
const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, cur) => (cur >= 1000 ? count++ : count), 0);

// .filter(mov => mov >= 1000).length;

console.log(numDeposits1000);
