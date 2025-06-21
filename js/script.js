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

//GAME INITIALIZATION
function initializeGame() {
  snake = [{ x: 9 * box, y: 10 * box }];
  food = generateFood();
  direction = null;
  if (game) clearInterval(game);
  game = setInterval(draw, 100);
}

//Generate a new position for food
function generateFood() {
  return {
    x: Math.floor(Math.random() * (canvasSize / box)) * box,
    y: Math.floor(Math.random() * (canvasSize / box)) * box,
  };
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

  if (direction) {
    if (direction == "LEFT") snakeX -= box;
    if (direction == "UP") snakeY -= box;
    if (direction == "RIGHT") snakeX += box;
    if (direction == "DOWN") snakeY += box;

    let newHead = { x: snakeX, y: snakeY };
    snake.unshift(newHead);
    snake.pop();
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
