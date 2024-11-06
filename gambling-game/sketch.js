// Gambling Game
// Mark Meng
// October 28th, 2024
// multiplier based on amount of mines (24 bombs = 25x, 1 bomb = 1.01x), good animations and particle effects, create re-bet and cash out option
// fix bomb appearance, when i click on a bomb it just immediately ends game instead of displaying bomb and showing "bet ended", make sure it deducts original amount of money
// 

// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let width = 870;
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
let startButton;
let slider;
let multiplier = 1;
let chosenCells = [];
let bombAmount;
let font;



function preload() {
  gem = loadImage("diamond.png");
  bomb = loadImage("bomb.png");
  tileTexture = loadImage("tileTexture.png");
  font = loadFont("font.ttf");
}


function setup() {
  createCanvas(width, height);
  startScreen();
}

function draw() {
  background("#406274");
  if (!isGameStarted) {
    startScreen();
  }
  else {
    drawGrid();
    displayStats();
  }
}


function startScreen() {
  textAlign(CENTER, CENTER);
  textSize(75);
  fill("white");
  textFont(font);
  text("MINES GAMBLING", width / 2, height / 2 - 50);
  if (!startButton) {
    startButton = createButton("Start Game");
    startButton.position(width / 2 - 50, height / 2);
    startButton.mousePressed(startGame);
  }
}



function startGame() {
  startButton.hide();
  isGameStarted = true;
  multiplier = 1;
  chosenCells = [];
  bombAmount = 7;
  placeBombs();
}


function drawGrid() {
  if (!slider){
    slider = createSlider(minimumBet, Math.min(money, 5000), minimumBet, 1);
    slider.position(625, 70);
    slider.input(() => currentBet = slider.value());
  }
  
  for (let y = 0; y < theGrid.yAmount; y++) {
    for (let x = 0; x < theGrid.xAmount; x++) {
      if (chosenCells.some(cell => cell.x === x && cell.y === y)) {
        let bombHit = bombs.some(b => b.x === x && b.y === y);
        if (bombHit) {
          image(bomb, x * theGrid.cellSize, y * theGrid.cellSize, theGrid.cellSize, theGrid.cellSize);
        }
        else {
          image(gem, x * theGrid.cellSize, y * theGrid.cellSize, theGrid.cellSize, theGrid.cellSize);
        }
      }
      else {
        image(tileTexture, x * theGrid.cellSize, y * theGrid.cellSize, theGrid.cellSize, theGrid.cellSize);
      }
    }
  }
}


function chooseRisk() {
  
}

function displayStats() {
  textSize(24);
  fill("white");
  textAlign(LEFT);
  text("Money: $" + money, 600, 120);
  text("Bet: $" + currentBet, 600, 150);
  text("Multiplier: x" + multiplier.toFixed(2), 600, 180);
}

function placeBombs() {
  bombs = [];
  while (bombs.length < bombAmount) { 
    let x = floor(random(theGrid.xAmount));
    let y = floor(random(theGrid.yAmount));
    
    if (!bombs.some(b => b.x === x && b.y === y)) {
      bombs.push({ x, y });
    }
  }
}

function mousePressed() {
  if (isGameStarted) {
    let xIndex = floor(mouseX / theGrid.cellSize);
    let yIndex = floor(mouseY / theGrid.cellSize);
  
    if (xIndex < theGrid.xAmount && yIndex < theGrid.yAmount) {
      if (chosenCells.some(cell => cell.x === xIndex && cell.y === yIndex)) {
        return;
      }
  
      let bombHit = bombs.some(b => b.x === xIndex && b.y === yIndex);
      if (bombHit) {
        money -= currentBet;
        chosenCells.push({ x: xIndex, y: yIndex });
        displayLoss();
      }
      else {
        multiplier += 0.03;
        money += currentBet * multiplier;
        chosenCells.push({ x: xIndex, y: yIndex });
      }
    }
  }
}

function resetGame() {
  isGameStarted = false;
  if (startButton) {
    startButton.show();
    multiplier = 1;
    chosenCells = [];
  }
}


function displayLoss() {
  clear();
  setup();
  text("Bomb Hit", width / 2, height / 2 - 50);
}