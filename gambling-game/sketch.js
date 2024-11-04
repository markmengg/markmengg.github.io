// Gambling Games
// Mark Meng
// October 28th, 2024
// Ideas: stake mines, currency feature, multiplier based on mines, good animations and particle effects. 5x5 grid
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let width = 1200;
let height = 550;
let money = 5000;
let theGrid = {
  xAmount: 5,
  yAmount: 5,
  cellSize: 110
};
let gem;
let bombs = [];
let tileTexture;
let isGameStarted = false;
let minimumBet = 1; 
let topBet = money;
let currentBet = minimumBet;


function preload() {
  gem = loadImage("diamond.png");
  bomb = loadImage("bomb.png");
  tileTexture = loadImage("tileTexture.png");
}


function setup() {
  createCanvas(width, height);
}

function draw() {
  background(220);
  if (!isGameStarted) {
    startScreen();
  }
  if (isGameStarted) {
    drawGrid();
  }
}


function startScreen() {
  textAlign(CENTER, CENTER);
  textSize(50);
  fill("blue");
  text("MINES GAMBLING", width / 2, height / 2 - 50);

  let startButton = createButton("Start Game");
  startButton.position(width / 2 - 50, height / 2);
  startButton.mousePressed(() => {
    startButton.hide();
    isGameStarted = true;
  });
}



function startGame() {
  startButton.hide();
  isGameStarted = true;
}


function drawGrid() {
  if (!slider){
    slider = createSlider(minimumBet, Math.min(money, 5000), minimumBet, 1);
    slider.position(width / 2.5, height / 2 + 80);
    slider.input(() => currentBet = slider.value());
  }

  for (let y = 0; y < theGrid.yAmount; y++) {
    for (let x = 0; x < theGrid.xAmount; x++){ 
      image(tileTexture, x * theGrid.cellSize, y * theGrid.cellSize, theGrid.cellSize, theGrid.cellSize);
    }
  }
}


function displayStats() {
  textSize(24);
  fill(0);
  textAlign(LEFT);
  text("Money: $" + money, 10, 30);
  text("Bet: $" + currentBet, 10, 60);
  text("Multiplier:" );
}

function placeBombs() {



}