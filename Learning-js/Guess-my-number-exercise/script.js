'use strict';
//método disponível no document

// console.log(document.querySelector('.message').textContent);

// document.querySelector('.message').textContent = 'Correct number!!!!!!!!!';

// document.querySelector('.number').textContent = 13;
// document.querySelector('.score').textContent = 10;
// document.querySelector('.guess').value = 23;
const displayMessage = message => {
  document.querySelector('.message').textContent = message;
};
const randomNumber = () => {
  let o = 0;
  o = Math.trunc(Math.random() * 20) + 1;
  return o;
};
let SecretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  SecretNumber = randomNumber();
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  document.querySelector('.number').style.width = '15rem';
});

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess);

  if (!guess) {
    displayMessage('⛔ No number');
  } else if (guess === SecretNumber) {
    document.querySelector('.message').textContent = '✅ Correct number';
    document.querySelector('.number').textContent = SecretNumber;
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    if (highscore < score) {
      highscore = score;
      document.querySelector('.highscore').textContent = score;
    }
  } else if (guess !== SecretNumber) {
    if (score > 1) {
      document.querySelector('.message').textContent =
        guess > SecretNumber ? '📈 Too high!' : '📉 Too low!';
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.message').textContent = '💥 you lost the game';
      document.querySelector('.score').textContent = 0;
    }
  }
});
