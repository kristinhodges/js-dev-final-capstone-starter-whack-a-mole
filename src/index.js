const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('#start');
const score = document.querySelector('#score');
const timerDisplay = document.querySelector('#timer');
let time = 0;
let timer;
let lastHole = 0;
let points = 0;
let difficulty = "hard";



/**Generates a random integer within a range.*/

function randomInteger(min, max) {
return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**

Sets the time delay given a difficulty parameter.
*/
function setDelay(difficulty) { 

  if (difficulty === "easy") { 
  return 1500; 
  } else if (difficulty === "normal") { 
  return 1000; 
  } else if (difficulty === "hard") { 
  return randomInteger(600, 1200); 
  } 
}


/**

Chooses a random hole from a list of holes.
*/
function chooseHole(holes) {
const index = randomInteger(0, holes.length - 1);
const hole = holes[index];
if (hole === lastHole) {
return chooseHole(holes);
}
lastHole = hole;
return hole;
}

/**

Calls the showUp function if time > 0 and stops the game if time = 0.
*/
function gameOver() {
if (time > 0) {
return showUp();
} else {
return stopGame();
}
}

/**

Calls the showAndHide() function with a specific delay and a hole.
*/
function showUp() {
let delay = setDelay(difficulty);
const hole = chooseHole(holes);
return showAndHide(hole, delay);
}

/**

The purpose of this function is to show and hide the mole given
a delay time and the hole where the mole is hidden.
*/
function showAndHide(hole, delay) {
toggleVisibility(hole);
const timeoutID = setTimeout(() => {
toggleVisibility(hole);
gameOver();
}, delay);
return timeoutID;
}

/**

Adds or removes the 'show' class to a given hole.
/
/*

Adds or removes the 'show' class to a given hole.
*/
function toggleVisibility(hole) {
  if (hole){
hole.classList.toggle('show');
}
return hole;
}

/**

This function increments the points global variable and updates the scoreboard.
*/
function updateScore() {
points++;
score.textContent = points;
return points;
}

/**

This function clears the score by setting points = 0.
*/
function clearScore() {
points = 0;
score.textContent = points;
return points;
}

/**

Updates the control board with the timer if time > 0.
*/
function updateTimer() {
timerDisplay.textContent = time;
return time;
}

/**

Starts the timer using setInterval.
*/
function startTimer() {
timer = setInterval(() => {
if (time > 0) {
time--;
updateTimer();
}
}, 1000);
return timer;
}

/**

This is the event handler that gets called when a player clicks on a mole.



This is the event handler that gets called when a player clicks on a mole.
*/
function whack(event) {
  document.getElementById('moles');
  updateScore();
  return points;
}

/**

Adds the 'click' event listeners to the moles.
*/
function setEventListeners() {
for (const mole of moles) {
mole.addEventListener('click', whack);
}
return moles;
}

/**

This function sets the duration of the game.
*/
function setDuration(duration) {
time = duration;
return time;
}

/**

This function is called when the game is stopped.
*/
function stopGame() {
clearInterval(timer);
return "game stopped";
}

/**

This is the function that starts the game when the startButton is clicked.
*/
function startGame() {
setDuration(10);
clearScore();
startTimer();
showUp();
setEventListeners(); // Call setEventListeners() to add event listeners to moles
return "game started";
}

startButton.addEventListener("click", startGame);

// Please do not modify the code below.
// Used for testing purposes.
window.randomInteger = randomInteger;
window.chooseHole = chooseHole;
window.setDelay = setDelay;
window.startGame = startGame;
window.gameOver = gameOver;
window.showUp = showUp;
window.holes = holes;
window.moles = moles;
window.showAndHide = showAndHide;
window.points = points;
window.updateScore = updateScore;
window.clearScore = clearScore;
window.whack = whack;
window.time = time;
window.setDuration = setDuration;
window.toggleVisibility = toggleVisibility;
window.setEventListeners = setEventListeners;