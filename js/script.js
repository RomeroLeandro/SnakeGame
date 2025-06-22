// INITIAL SETUP
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreE1 = document.getElementById("score");
const finalScoreE1 = document.getElementById("finalScore");
const gameOverModal = document.getElementById("gameOverModal");
const restartButton = document.getElementById("restartButton");

// The size of each cell on the board
const box = 20;
const canvasSize = 400;

// STATE OF THE GAME
let snake;
let food;
let direction;
let game;
let score;
let gameIsOver;
let gameLoop;

//GAME INITIALIZATION
function initializeGame() {
  // Initial position of the snake
  snake = [{ x: 9 * box, y: 10 * box }];
  food = generateFood();

  // Initial state
  direction = null;
  score = 0;
  gameIsOver = false;

  // Update UI
  gameOverModal.classList.add("hidden");
  scoreE1.innerText = score;

  // Start the game loop
  if (gameLoop) clearInterval(gameLoop);
  draw();
}

//DRAWING FUNCTIONS
function draw() {
  // Draw the background
  ctx.fillStyle = "#010409";
  ctx.fillRect(0, 0, canvasSize, canvasSize);

  // Draw the snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "#00e676" : "#4caf50";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
    ctx.strokeStyle = "#010409";
    ctx.fillRect(food.x, food.y, box, box);
  }

  // Draw the food
  ctx.fillStyle = "#ff5252";
  ctx.fillRect(food.x, food.y, box, box);
}

// Start the game loop
function gameSteep() {
  if (gameIsOver) return;

  // Save the current head position
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  // Move your head according to the direction
  if (direction) {
    if (direction == "LEFT") snakeX -= box;
    if (direction == "UP") snakeY -= box;
    if (direction == "RIGHT") snakeX += box;
    if (direction == "DOWN") snakeY += box;
  }

  // Create the new head
  let newHead = { x: snakeX, y: snakeY };

  if (
    snakeX < 0 ||
    snakeX >= canvasSize ||
    snakeY < 0 ||
    snakeY >= canvasSize ||
    checkCollision(newHead, snake)
  ) {
    gameOver();
    return;
  }
  snake.unshift(newHead);

  if (snakeX === food.x && snakeY === food.y) {
    score++;
    scoreEl.innerText = score;
    food = generateFood();
  } else {
    snake.pop();
  }

  draw();
}

//Generate a new position for food
function generateFood() {
  let newFood;
  do {
    newFood = {
      x: Math.floor(Math.random() * (canvasSize / box)) * box,
      y: Math.floor(Math.random() * (canvasSize / box)) * box,
    };
  } while (checkCollision(newFood, snake));
  return newFood;
}

// Check if the head collides with the body
function checkCollision(head, snake) {
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }
  return false;
}

// End the game
function gameOver() {
  clearInterval(game);
  gameIsOver = true;
  finalScoreE1.innerText = score;
  gameOverModal.classList.remove("hidden");
}

document.addEventListener("keydown", setDirection);

// --- INPUT HANDLING (KEYBOARD AND BUTTONS) ---
function setDirection(event) {
  let key = event.keyCode;
  if ((key == 37 || key == 65) && direction != "RIGHT") {
    direction = "LEFT";
  } else if ((key == 38 || key == 87) && direction != "DOWN") {
    direction = "UP";
  } else if ((key == 39 || key == 68) && direction != "LEFT") {
    direction = "RIGHT";
  } else if ((key == 40 || key == 83) && direction != "UP") {
    direction = "DOWN";
  }
}

// Mobile controls
document.getElementById("up-btn").addEventListener("click", () => {
  if (direction != "DOWN") direction = "UP";
});
document.getElementById("down-btn").addEventListener("click", () => {
  if (direction != "UP") direction = "DOWN";
});
document.getElementById("left-btn").addEventListener("click", () => {
  if (direction != "RIGHT") direction = "LEFT";
});
document.getElementById("right-btn").addEventListener("click", () => {
  if (direction != "LEFT") direction = "RIGHT";
});

restartButton.addEventListener("click", initializeGame);

window.onload = initializeGame;
