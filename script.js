"use strict";

// selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector(`#score--0`);
const score1El = document.querySelector(`#score--1`);
const current0El = document.querySelector(`#current--0`);
const current1El = document.querySelector(`#current--1`);
const diceEl = document.querySelector(".dice");
const newBtn = document.querySelector(".btn--new");
const rollBtn = document.querySelector(".btn--roll");
const holdBtn = document.querySelector(".btn--hold");

// Global variables
let score, currentScore, activePlayer, playing;

// Initial operations
const init = () => {
	score = [0, 0];
	currentScore = 0;
	activePlayer = 0;
	playing = true;
	score0El.textContent = 0;
	score1El.textContent = 0;
	current0El.textContent = 0;
	current1El.textContent = 0;
	diceEl.classList.add("hidden");
	player0El.classList.remove("player--winner");
	player1El.classList.remove("player--winner");
	player0El.classList.add("player--active");
	player1El.classList.remove("player--active");
};
init();

// Utility Function
const switchPlayer = () => {
	const currentScoreEl = document.querySelector(`#current--${activePlayer}`);
	currentScore = 0;
	currentScoreEl.textContent = 0;
	activePlayer = activePlayer ? 0 : 1;
	player0El.classList.toggle("player--active");
	player1El.classList.toggle("player--active");
};

// rolling dice functionality
rollBtn.addEventListener("click", () => {
	if (playing) {
		const currentScoreEl = document.querySelector(
			`#current--${activePlayer}`
		);

		// 1. Generating random dice roll
		const dice = Math.floor(Math.random() * 5) + 1;

		// 2. displaying dice
		diceEl.classList.remove("hidden");
		diceEl.src = `dice-${dice}.png`;

		// 3. check for rolled one
		if (dice !== 1) {
			// Add dice to current score
			currentScore += dice;
			currentScoreEl.textContent = currentScore;
		} else {
			// switch to next player
			switchPlayer();
		}
	}
});

holdBtn.addEventListener("click", () => {
	if (playing) {
		const scoreEl = document.querySelector(`#score--${activePlayer}`);

		// 1. Add current score to the active player score
		score[activePlayer] += currentScore;
		scoreEl.textContent = score[activePlayer];

		// 2. check if player score >= 100
		if (score[activePlayer] >= 100) {
			// Finish the game
			const playerEl = document.querySelector(`.player--${activePlayer}`);
			playerEl.classList.remove("player--active");
			playerEl.classList.add("player--winner");
			diceEl.classList.add("hidden");
			playing = false;
		} else {
			// Switch to the next player
			switchPlayer();
		}
	}
});

// Reset whole game
newBtn.addEventListener("click", init);
