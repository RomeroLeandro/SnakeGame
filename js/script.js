// INITIAL SETUP
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreE1 = document.getElementById("score");

// The size of each cell on the board
const box = 20;
const canvasSize = 400;

// STATE OF THE GAME
let snake;
let food;
let direction;
let game;
let score;

//GAME INITIALIZATION
function initializeGame() {
  snake = [{ x: 9 * box, y: 10 * box }];
  food = generateFood();
  direction = null;
  score = 0;
  scoreE1.innerText = score;
  if (game) clearInterval(game);
  game = setInterval(draw, 100);
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

function checkCollision(head, snake) {
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }
  return false;
}

//DRAWING FUNCTIONS
function draw() {
  ctx.fillStyle = "#010409";
  ctx.fillRect(0, 0, canvasSize, canvasSize);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "#00e676" : "#4caf50";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
    ctx.strokeStyle = "#010409";
    ctx.fillRect(food.x, food.y, box, box);
  }
  ctx.fillStyle = "#ff5252";
  ctx.fillRect(food.x, food.y, box, box);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  // Check if the snake has eaten the food
  if (snakeX == food.x && snakeY == food.y) {
    score++;
    scoreE1.innerText = score;
    food = generateFood();
  } else {
    if (direction) snake.pop();
  }

  if (direction) {
    if (direction == "LEFT") snakeX -= box;
    if (direction == "UP") snakeY -= box;
    if (direction == "RIGHT") snakeX += box;
    if (direction == "DOWN") snakeY += box;
    let newHead = { x: snakeX, y: snakeY };
    snake.unshift(newHead);
  }
}

document.addEventListener("keydown", setDirection);

function setDirection(event) {
  let key = event.keyCode;
  if (key == 37 && direction != "RIGHT") {
    direction = "LEFT";
  } else if (key == 38 && direction != "DOWN") {
    direction = "UP";
  } else if (key == 39 && direction != "LEfT") {
    direction = "RIGHT";
  } else if (key == 40 && direction != "UP") {
    direction = "DOWN";
  }
}

window.onload = initializeGame;
