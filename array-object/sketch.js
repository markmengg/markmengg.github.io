// Bloons TD6 Ripoff? some sort of tower/base defense game with pathways or snake
// Mark Meng
// a star algorithm
// October 8th, 2024

// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// To do list: Create end screen and music, foolproof self collisions, could change music depending on difficulty levels (Easy diff = peaceful music)
//restart option, user cuztomizable soundfx volume, visual feedback upon mine or wall collision
// Particle effects? Scoring system with highscore. Speed of snake upon difficulty (Maybe create mine diff and speed diff)


let direction = {x: 1, y: 0};
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
let lastMoveTime = 0;
// let isGameOver = false
let mines = [];
let appleSound, dieSound, mineSound;
let bgMusic, endMusic;
let gameStarted = false;
let slider, startButton;
let appleImage, mineImage;
let gameOver = false;
let score = 0;
let isGameOver = false;






function preload() {
  appleSound = loadSound("pop.mp3");
  dieSound = loadSound("bomb.wav");
  mineSound = loadSound("laser.wav");
  bgMusic = loadSound("BackgroundTheme.mp3");
  endMusic = loadSound("Sadness.ogg");
  appleImage = loadImage("apple.png");
  mineImage = loadImage("mine.png");
}


function setup() {
  createCanvas(width, height);

  slider = createSlider(0, 40, 0);
  slider.position(width / 2.5, height / 2 + 80);

  startButton = createButton("Start Game");
  startButton.position(slider.x + 20, slider.y - 40);
  startButton.mousePressed(startGame);

  colorPicker = createColorPicker("ff0000");
  colorPicker.position(slider.x + 40, slider.y + 40);

  appleSound.amp(1);
  dieSound.amp(1);
  mineSound.amp(0.9);
  bgMusic.amp(0.015);
  endMusic.amp(0.4);
}

function draw() {

  background(255);

  if (!gameStarted && !gameOver) {
    drawStartScreen();
    return;
  }

  if (gameOver) {
    drawEndScreen();
    return;
  }

  drawGrid(); 
  if (millis() - lastMoveTime > moveInterval) { // Check if it's time to move the snake
    moveSnake();
    lastMoveTime = millis(); // Update last move time
  }
  checkCollisions();
  drawSnake(); 
  drawApples();
  drawMines();
}


function startGame() { 

  let numMines = slider.value();

  spawnApple();
  spawnMines(numMines);
  
  colorPicker.hide();
  slider.hide();
  startButton.hide();
  
  gameStarted = true;

  bgMusic.loop();
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

  let snakeColor;
  snakeColor = colorPicker.color();

  for (let i = 0; i < snake.length; i++) {

    fill(snakeColor);
    rect(snake[i].x * theGrid.xSize, snake[i].y * theGrid.ySize, theGrid.xSize, theGrid.ySize);

   
    if (i === 0) {
      drawEyes(snake[i].x, snake[i].y);
    }
  }
}

function drawEyes(x, y) {
  fill(245);
  let eyeSize = theGrid.xSize / 4;
  let offsetX = theGrid.xSize / 3;
  let offsetY = theGrid.ySize / 3;

 
  if (direction.x === 1) { 
    ellipse((x + 1) * theGrid.xSize - offsetX, y * theGrid.ySize + offsetY, eyeSize, eyeSize);
    ellipse((x + 1) * theGrid.xSize - offsetX, (y + 1) * theGrid.ySize - offsetY, eyeSize, eyeSize);
  }
  else if (direction.x === -1) {
    ellipse(x * theGrid.xSize + offsetX, y * theGrid.ySize + offsetY, eyeSize, eyeSize);
    ellipse(x * theGrid.xSize + offsetX, (y + 1) * theGrid.ySize - offsetY, eyeSize, eyeSize);
  } 
  else if (direction.y === 1) {
    ellipse(x * theGrid.xSize + offsetX, (y + 1) * theGrid.ySize - offsetY, eyeSize, eyeSize);
    ellipse((x + 1) * theGrid.xSize - offsetX, (y + 1) * theGrid.ySize - offsetY, eyeSize, eyeSize);
  } 
  else if (direction.y === -1) { 
    ellipse(x * theGrid.xSize + offsetX, y * theGrid.ySize + offsetY, eyeSize, eyeSize);
    ellipse((x + 1) * theGrid.xSize - offsetX, y * theGrid.ySize + offsetY, eyeSize, eyeSize);
  }
}

function moveSnake() {
  let newHead = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y,
  };
  snake.unshift(newHead);
  snake.pop();
}


function keyPressed() {
  if (keyCode === UP_ARROW || key === 'W') {
    direction = {x: 0, y: -1};
  }
  else if (keyCode === DOWN_ARROW || key === 'S') {
    direction = {x: 0, y: 1};
  } 
  else if (keyCode === LEFT_ARROW || key === 'A') {
    direction = {x: -1, y: 0};
  } 
  else if (keyCode === RIGHT_ARROW || key === 'D') {
    direction = {x: 1, y: 0};
  }
}

function drawApples() {
  for (let i = 0; i < apples.length; i++) {
    image(appleImage, apples[i].x * theGrid.xSize, apples[i].y * theGrid.ySize, theGrid.xSize, theGrid.ySize);
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
      appleSound.play();
      score++;
    }
  }
  if (head.x < 0  || head.x >= theGrid.xAmount  || head.y < 0  || head.y >= theGrid.yAmount ) {
    isGameOver = true;
    dieSound.play();
  }

  for (let i = 1; i < snake.length; i++){
    if (head.x === snake[i].x && head.y === snake[i].y) {
      isGameOver = true;
      dieSound.play();
    }
  }


  for (let i = 0; i < mines.length; i++) {
    if (head.x === mines[i].x && head.y === mines[i].y) {
      snake.pop();
      mineSound.play();
      isGameOver = true;
    }
  }

  
  if (isGameOver === true) {
    gameOver = true;
    gameStarted = false;
  }
}


function spawnMines(numMines) {
  mines = [];
  for (let i = 0; i < numMines; i++) {
    let mine = {
      x: floor(random(0, theGrid.xAmount)),
      y: floor(random(0, theGrid.yAmount))
    };
    mines.push(mine);
  }
}

function drawMines() {
  for (let i = 0; i < mines.length; i++) {
    image(mineImage, mines[i].x * theGrid.xSize, mines[i].y * theGrid.ySize, theGrid.xSize, theGrid.ySize);
  }
}


function drawStartScreen(){
  textAlign(CENTER, CENTER);
  textSize(15);
  fill(0);
  text("Select Difficulty and Press Start", width / 2, height / 2 + 10);

  textAlign(CENTER, CENTER);
  textSize(50);
  fill("green");
  text("SNAKE", width / 2, height / 2 - 50);
  return;
}

function drawEndScreen(){
  clear();
  setup();
  background("red");
  textAlign(CENTER, CENTER);
  textSize(40);
  fill("white");
  text("GAME OVER", width / 2, height / 2 - 50);
  text("Score: " + score, width/2, height/2);

  bgMusic.stop();
  endMusic.play();

  colorPicker.hide();
  slider.hide();
  startButton.hide();
  
  return;
}