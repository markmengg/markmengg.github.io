// Bloons TD6 Ripoff? some sort of tower/base defense game with pathways or snake
// Mark Meng
// a star algorithm
// October 8th, 2024

// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let direction = {x: 1, y: 0}
let width = 700;
let height = 600;
let snake = [{x: 8, y: 7}];
let apples = [];
let theGrid = {
  xAmount: 17,
  yAmount: 15,
  xSize: width/17,
  ySize: height/15,
};
let moveInterval = 150;
let lastMoveTime = 0


function setup() {
  createCanvas(width, height);
  spawnApple();
}

function draw() {
  background(255);
  drawGrid(); 
  if (millis() - lastMoveTime > moveInterval) { // Check if it's time to move the snake
    moveSnake();
    lastMoveTime = millis(); // Update last move time
  }
  checkCollisions();
  drawSnake(); 
  drawApples();
}

function drawGrid() {
  let isLightGreen = true;
  for (let y = 0; y < theGrid.yAmount; y++) {
    for (let x = 0; x < theGrid.xAmount; x++){ 
      if (isLightGreen) {
        fill (165, 235, 104);
      }
      else {
        fill(152, 219, 94);
      }
      noStroke();
      rect(x*theGrid.xSize, y*theGrid.ySize, theGrid.xSize, theGrid.ySize);
      isLightGreen = !isLightGreen;
    }
  }
}

function drawSnake() {
  fill(130, 159, 255);
  for (let i = 0; i < snake.length; i++) {
    rect(snake[i].x * theGrid.xSize, snake[i].y * theGrid.ySize, theGrid.xSize, theGrid.ySize);
  }
}

function moveSnake() {
  let newHead = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y,
  }
  snake.unshift(newHead);
  snake.pop();
}


function keyPressed() {
  if (keyCode === UP_ARROW || key === 'W') {
    direction = {x: 0, y: -1};
  } else if (keyCode === DOWN_ARROW || key === 'S') {
    direction = {x: 0, y: 1};
  } else if (keyCode === LEFT_ARROW || key === 'A') {
    direction = {x: -1, y: 0};
  } else if (keyCode === RIGHT_ARROW || key === 'D') {
    direction = {x: 1, y: 0};
  }
}

function drawApples() {
  fill(255, 0, 0);
  for (let i = 0; i < apples.length; i++) {
    rect(apples[i].x * theGrid.xSize, apples[i].y * theGrid.ySize, theGrid.xSize, theGrid.ySize);
  }
}

function spawnApple() {
  let apple = {
    x: floor(random(0, theGrid.xAmount)),
    y: floor(random(0, theGrid.yAmount)),
  };
  apples.push(apple);
}


function checkCollisions() {
  let head = snake[0];
  for (let i = 0; i < apples.length; i++) {
    if (head.x === apples[i].x && head.y === apples[i].y) {
      apples.splice(i, 1);
      spawnApple();
      snake.push({});
    }
  }
}