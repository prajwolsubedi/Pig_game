'use strict';

const diceElement = document.querySelector('.dice');
const score0Element = document.getElementById('score--0');
const score1Element = document.getElementById('score--1');
const newGameElement = document.querySelector('.btn--new');
const rollDiceElement = document.querySelector('.btn--roll');
const holdDiceElement = document.querySelector('.btn--hold');
const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

let scores, currentScore, activePlayer, playing;
//Starting condition
const init = function(){
    playing = true;
    scores = [0,0];
    currentScore = 0;
    activePlayer = 0;

    score0Element.textContent = 0;
    score1Element.textContent = 0;
    currentScore0.textContent = 0;
    currentScore1.textContent = 0;
    diceElement.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
};

init();

rollDiceElement.addEventListener('click', function () {
  //1)Generate a random dice.
  if (playing) {
    const dice = Math.trunc(Math.random() * 6 + 1);
    console.log(dice);

    //2) Display the dice.

    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${dice}.png`;

    //3) check if it is 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switch to next player
      switchPlayer();
    }
  }
});

holdDiceElement.addEventListener('click', function () {
    if(playing){
  //1. Add current score to the global score;
  scores[activePlayer] += currentScore;
  //scores[1] = scores[1] + currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  //2. if score >=100 finish the game
  if (scores[activePlayer] >= 20) {
    playing = false;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
  } else {
    //switch
    switchPlayer();
  }
}
});

newGameElement.addEventListener('click', init);

diceElement.classList.add('hidden');
score0Element.textContent = 0;
score1Element.textContent = 0;
