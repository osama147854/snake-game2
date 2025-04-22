const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
let snake = [{ x: 9 * box, y: 9 * box }];
let direction = null;
let food = randomFood();
let score = 0;
let game = null;

document.addEventListener("keydown", event => {
  if (!game) game = setInterval(draw, 100);

  if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
});

function draw() {
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawScore();

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "#00ff00" : "#007700";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
    ctx.strokeStyle = "#222";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  if (direction === null) return;

  let head = { ...snake[0] };
  if (direction === "LEFT") head.x -= box;
  if (direction === "UP") head.y -= box;
  if (direction === "RIGHT") head.x += box;
  if (direction === "DOWN") head.y += box;

  if (
    head.x < 0 || head.x >= canvas.width ||
    head.y < 0 || head.y >= canvas.height ||
    snake.some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    clearInterval(game);
    setTimeout(() => alert("Game Over! نقاطك: " + score), 100);
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    food = randomFood();
  } else {
    snake.pop();
  }
}

function randomFood() {
  return {
    x: Math.floor(Math.random() * 19) * box,
    y: Math.floor(Math.random() * 19) * box
  };
}

function drawScore() {
  ctx.fillStyle = "#fff";
  ctx.font = "18px Arial";
  ctx.fillText("النقاط: " + score, 10, 20);
}
