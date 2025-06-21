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
let game;

//GAME INITIALIZATION
function initializeGame() {
  snake = [{ x: 9 * box, y: 10 * box }];
  food = generateFood();
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
  ctx.fillReact(0, 0, canvasSize, canvasSize);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "#00e676" : "#4caf50";
    ctx.fillReact(snake[i].x, snake[i].y, box, box);
    ctx.strokeStyle = "#010409";
    ctx.strokeReact(snake[i].x, snake[i].y, box, box);
  }
  ctx.fillStyle = "#ff5252";
  ctx.fillReact(food.x, food.y, box, box);
}

window.onload = initializeGame;
