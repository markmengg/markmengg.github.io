// SNAKE GAME
// Mark Meng
// Mr. Schellenberg , Computer Science 30
// October 21th, 2024

// Extra for Experts:
// The most obvious demonstration of going "above and beyond" is my addition of classes. Classes encapsulate data that are specific to that within the class. In my code, I created a particle class that spawns upon collision between the snake and the apple, and slowly diminishes over time (lifespan)
// array manipulation: unshift (adds to start of an array) pop (removes last term from array) splice (removes term from specific index) push (adds to array)
// Addition of sliders, start buttons, and color pickers
// Direction changers based on key pressed control the movement of the snake



// START OF CODE


// ----- Constant and Variables -----

let direction = {x: 1, y: 0};
let width = 700;
let height = 600;
let snake = [{x: 8, y: 7}];
let apples = [];
let mines = [];
let particles = [];

const moveInterval = 150;
let lastMoveTime = 0;

let appleSound, dieSound, mineSound;
let appleImage, mineImage;
let bgMusic, endMusic;

let slider, startButton;

let gameOver = false;
let gameStarted = false;
let isGameOver = false;
let score = 0;

let theGrid = {
  xAmount: 17,
  yAmount: 15,
  xSize: width/17,
  ySize: height/15,
};



// ----- Setup and Main Loop -----

function preload() {
  appleSound = loadSound("pop.mp3");
  dieSound = loadSound("bomb.wav");
  mineSound = loadSound("laser.wav");
  bgMusic = loadSound("BackgroundTheme.mp3");
  endMusic = loadSound("Endtheme.mp3");
  appleImage = loadImage("apple.png");
  mineImage = loadImage("mine.png");
}


function setup() {
  createCanvas(width, height);
  createMenu();
  adjustVolume();
}


function draw() {
  background(255);
  runGame();
}



// ----- Game Logic and Functions -----


function startGame() { 
  // Game Started
  gameStarted = true;
  let numMines = slider.value();

  spawnApple();
  spawnMines(numMines);
  
  colorPicker.hide();
  slider.hide();
  startButton.hide();

  bgMusic.loop();
}


function drawGrid() {
  // Creates an alternating Grid
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


function createMenu(){
  // Creates Interactive Inputs Accessible to User
  slider = createSlider(0, 40, 0);
  slider.position(width / 2.5, height / 2 + 80);

  startButton = createButton("Start Game");
  startButton.position(slider.x + 20, slider.y - 40);
  startButton.mousePressed(startGame);

  colorPicker = createColorPicker("ff0000");
  colorPicker.position(slider.x + 40, slider.y + 40);
}


function adjustVolume(){
  // Adjusts Volume of Imported Sounds and Music
  appleSound.amp(1);
  dieSound.amp(1);
  mineSound.amp(0.9);
  bgMusic.amp(0.015);
  endMusic.amp(0.3);
}


function runGame() {
  // Start Screen
  if (!gameStarted && !gameOver) {
    drawStartScreen();
  }

  // End Screen
  else if (gameOver) {
    drawEndScreen();
  }

  // Game Screen/Loop
  else if (gameStarted) {
    drawGrid(); 
    if (millis() - lastMoveTime > moveInterval) { 
      moveSnake();
      lastMoveTime = millis(); 
    }
    checkCollisions();
    drawSnake(); 
    drawApples();
    drawMines();
  
    drawParticles();
  }
}


function drawStartScreen(){
  // Start Screen Display
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
  // End Screen Display
  clear();
  setup();
  background("red");
  textAlign(CENTER, CENTER);
  textSize(40);
  fill("white");
  text("GAME OVER", width / 2, height / 2 - 50);
  text("Score: " + score, width/2, height/2);

  bgMusic.stop();
  endMusic.loop();

  colorPicker.hide();
  slider.hide();
  startButton.hide();
}


function drawSnake() {
// Draws the Snake Color and Size

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
// Snake Eyes for Aesthetic Appeal (Follows Direction of Snake)
  fill(205);
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
  // Moves the Head of the Snake, The body follows along with it (Adding a head and removing a tail)
  let newHead = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y,
  };
  snake.unshift(newHead);
  snake.pop();
}


function keyPressed() {
  // User Controls for the Snake
  if (keyCode === UP_ARROW) {
    direction = {x: 0, y: -1};
  }
  else if (keyCode === DOWN_ARROW) {
    direction = {x: 0, y: 1};
  } 
  else if (keyCode === LEFT_ARROW) {
    direction = {x: -1, y: 0};
  } 
  else if (keyCode === RIGHT_ARROW) {
    direction = {x: 1, y: 0};
  }
}


function spawnApple() {
  // Creates Apples
  let apple = {
    x: floor(random(0, theGrid.xAmount)),
    y: floor(random(0, theGrid.yAmount)),
  };
  apples.push(apple);
}


function drawApples() {
  // Displays Apples
  for (let i = 0; i < apples.length; i++) {
    image(appleImage, apples[i].x * theGrid.xSize, apples[i].y * theGrid.ySize, theGrid.xSize, theGrid.ySize);
  }
}


function spawnMines(numMines) {
  // Creates Mines
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
  // Draws Mines 
  for (let i = 0; i < mines.length; i++) {
    image(mineImage, mines[i].x * theGrid.xSize, mines[i].y * theGrid.ySize, theGrid.xSize, theGrid.ySize);
  }
}


class Particle {
  // Defines Behaviour and Appearance of Particles
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.lifespan = 100;
  }

  update() {
    this.lifespan -= 3;
  }

  display() {
    fill(this.color.levels[0], this.color.levels[1], this.color.levels[2], this.lifespan);
    noStroke();
    ellipse(this.x, this.y, 10);
  }

  isDead() {
    return this.lifespan < 0;
  }
}


function spawnParticles(x, y, color) {
  // Creates Particles at Given Location
  for (let i = 0; i < 10; i++) {
    particles.push(new Particle(x * theGrid.xSize + theGrid.xSize / 2, y * theGrid.ySize + theGrid.ySize / 2, color));
  }
}


function drawParticles() {
  // Displays Particles
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();
    if (particles[i].isDead()) {
      particles.splice(i, 1);
    }
  }
}



// ----- Collision Detections -----

function checkCollisions() {

  let head = snake[0];

  // Apple-Snake Collisions
  for (let i = 0; i < apples.length; i++) {
    if (head.x === apples[i].x && head.y === apples[i].y) {
      apples.splice(i, 1);
      spawnApple();
      snake.push({});
      appleSound.play();
      score++;
      spawnParticles(head.x, head.y, color(255,0,0));
    }
  }

  // Snake-Wall Collisions
  if (head.x < 0  || head.x >= theGrid.xAmount  || head.y < 0  || head.y >= theGrid.yAmount ) {
    isGameOver = true;
    dieSound.play();
  }

  // Snake-Snake Collisions
  for (let i = 1; i < snake.length; i++){
    if (head.x === snake[i].x && head.y === snake[i].y) {
      isGameOver = true;
      dieSound.play();
    }
  }

  // Snake-Mines Collisions
  for (let i = 0; i < mines.length; i++) {
    if (head.x === mines[i].x && head.y === mines[i].y) {
      snake.pop();
      mineSound.play();
      isGameOver = true;
    }
  }

  // Game Over
  if (isGameOver === true) {
    gameOver = true;
    gameStarted = false;
  }
}