const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const grid = 20;
const cw = canvas.width;
let snake = [{x: grid*5, y: grid*5}];
let dx = grid, dy = 0;
let food = randomFood();
let score = 0;
let gameOver = false;

ctx.font = '16px monospace';
ctx.textBaseline = 'top';

function draw() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, cw, cw);

  snake.forEach((segment, i) => {
    ctx.fillStyle = i === 0 ? '#a6d32d' : '#558b2f';
    ctx.fillRect(segment.x, segment.y, grid-1, grid-1);
  });

  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, grid-1, grid-1);

  ctx.fillStyle = '#d1f99d';
  ctx.fillText("Score: "+ score, 10, cw - 30);
}

function update() {
  if (gameOver) return;
  const head = {x: snake[0].x + dx, y: snake[0].y + dy};

  if (head.x < 0 || head.x >= cw || head.y < 0 || head.y >= cw) gameOver = true;

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    food = randomFood();
  } else {
    snake.pop();
  }

  for(let i = 1; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) gameOver = true;
  }
}

function randomFood() {
  const x = Math.floor(Math.random() * (cw / grid)) * grid;
  const y = Math.floor(Math.random() * (cw / grid)) * grid;
  return {x, y};
}

document.addEventListener('keydown', e => {
  if(e.key === 'ArrowLeft' && dx === 0) { dx = -grid; dy = 0; }
  if(e.key === 'ArrowUp' && dy === 0) { dx = 0; dy = -grid; }
  if(e.key === 'ArrowRight' && dx === 0) { dx = grid; dy = 0; }
  if(e.key === 'ArrowDown' && dy === 0) { dx = 0; dy = grid; }
});

function loop() {
  update();
  draw();

  if(gameOver) {
    alert('Game Over! Score: ' + score);
    endSnake();
  } else {
    setTimeout(loop, 100);
  }
}

function endSnake() {
  document.getElementById('snakeScreen').style.display = 'none';
  const main = document.getElementById('main');
  main.classList.remove('hidden');
}

document.getElementById('skipBtn').onclick = endSnake;

loop();