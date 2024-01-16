'use strict';

// console.log(document.querySelector('.message').textContent);
// document.querySelector('.message').textContent = 'correct number';

// document.querySelector('.number').textContent = 10;
// document.querySelector('.score').textContent = 25;

// document.querySelector('.guess').value = 23;
// console.log(document.querySelector('.guess').value);

//Event listener

let number = Math.trunc(Math.random() * 20) + 1;

let score = 20;

let highScore = 0;

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  number = Math.trunc(Math.random() * 20) + 1;
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#0e0e0e';
  document.querySelector('.number').style.width = '15rem';
});

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  //no input
  if (!guess) {
    // document.querySelector('.message').textContent = 'no number!';
    displayMessage('no number!');
    //when player wins
  } else if (guess === number) {
    // document.querySelector('.message').textContent = 'Correct number!';
    displayMessage('Correct number!');
    document.querySelector('body').style.backgroundColor = 'green';
    document.querySelector('.number').style.width = '30rem';
    document.querySelector('.number').textContent = number;
    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }

    //when guess is wrong
  } else if (guess !== number) {
    if (score > 1) {
      // document.querySelector('.message').textContent =
      //   guess > number ? 'Number is too High!' : 'Number is too Low!';
      displayMessage(
        guess > number ? 'Number is too High!' : 'Number is too Low!'
      );
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      // document.querySelector('.message').textContent = 'You Lost the game!';
      displayMessage('You Lost the game!');
      document.querySelector('.score').textContent = 0;
    }
    //when too high
  } //else if (guess > number) {
  //   if (score > 1) {
  //     document.querySelector('.message').textContent = 'Number is too High!';
  //     score--;
  //     document.querySelector('.score').textContent = score;
  //   } else {
  //     document.querySelector('.message').textContent = 'You Lost the game!';
  //     document.querySelector('.score').textContent = 0;
  //   }

  //   //when too low
  // } else if (guess < number)
  //   if (score > 1) {
  //     document.querySelector('.message').textContent = 'Number is too Low!';
  //     score--;
  //     document.querySelector('.score').textContent = score;
  //   } else {
  //     document.querySelector('.message').textContent = 'You Lost the game!';
  //     document.querySelector('.score').textContent = 0;
  //   }
});
