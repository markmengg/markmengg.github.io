// Gambling Game
// Mark Meng
// October 28th, 2024
// multiplier based on amount of mines (24 bombs = 25x, 1 bomb = 1.01x), good animations and particle effects, create re-bet and cash out option
// fix bomb appearance, when i click on a bomb it just immediately ends game instead of displaying bomb and showing "bet ended", make sure it deducts original amount of money + gained money
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
let betSlider;
let bombSlider;
let multiplier = 1;
let chosenCells = [];
let bombAmount = 1;
let font;
let bgMusic;
let gemSound, bombSound;
let isGameOver = false;
let hitBombCell = null;
let totalGained = 0;
let cashOutButton;
let lossScreenTimeout = null;
let bombDisplayTimeout = null;




function preload() {
  gem = loadImage("diamond.png");
  bomb = loadImage("bomb.png");
  tileTexture = loadImage("tileTexture.png");
  font = loadFont("font.ttf");
  bgMusic = loadSound("BackgroundMusic.mp3");
  gemSound = loadSound("coin.wav");
  bombSound = loadSound("bomb.wav");
}


function setup() {
  createCanvas(width, height);
  money = isNaN(money) ? 5000 : money;
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
  bgMusic.loop();
  startButton.hide();
  isGameStarted = true;
  multiplier = 1;
  chosenCells = [];
  bombAmount = bombSlider.value();
  totalGained = 0;
  multiplier = calculateMultiplier(bombAmount);
  placeBombs();
  createCashOutButton();
}


function drawGrid() {
  if (!betSlider) {
    betSlider = createSlider(minimumBet, Math.min(money || 5000, 5000), minimumBet, 1);
    betSlider.position(625, 70);
    betSlider.input(() => currentBet = betSlider.value());
  }

  if (!bombSlider) {
    bombSlider = createSlider(1, 24, 1, 1);
    bombSlider.position(625, 500);
    bombSlider.input(() => {
      bombAmount = bombSlider.value();
      multiplier = calculateMultiplier(bombAmount);
      placeBombs();
    });
  }

  for (let y = 0; y < theGrid.yAmount; y++) {
    for (let x = 0; x < theGrid.xAmount; x++) {
      if (chosenCells.some(cell => cell.x === x && cell.y === y) || (hitBombCell && hitBombCell.x === x && hitBombCell.y === y)) {
        let bombHit = bombs.some(b => b.x === x && b.y === y);
        if (bombHit || (hitBombCell && hitBombCell.x === x && hitBombCell.y === y)) {
          image(bomb, x * theGrid.cellSize, y * theGrid.cellSize, theGrid.cellSize, theGrid.cellSize);
          bombSound.play();
        } else {
          image(gem, x * theGrid.cellSize, y * theGrid.cellSize, theGrid.cellSize, theGrid.cellSize);
          gemSound.play();
        }
      } else {
        image(tileTexture, x * theGrid.cellSize, y * theGrid.cellSize, theGrid.cellSize, theGrid.cellSize);
      }
    }
  }
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
  if (isGameStarted && !isGameOver) {
    let xIndex = floor(mouseX / theGrid.cellSize);
    let yIndex = floor(mouseY / theGrid.cellSize);

    if (xIndex < theGrid.xAmount && yIndex < theGrid.yAmount) {
      if (chosenCells.some(cell => cell.x === xIndex && cell.y === yIndex)) {
        return;
      }

      let bombHit = bombs.some(b => b.x === xIndex && b.y === yIndex);
      if (bombHit) {
        money -= (currentBet + totalGained);
        totalGained = 0;
        hitBombCell = { x: xIndex, y: yIndex };
        displayLoss();
      } 
      else {
        multiplier += 0.03;
        let gainedAmount = currentBet * multiplier;
        totalGained += gainedAmount;
        money += gainedAmount;
        chosenCells.push({ x: xIndex, y: yIndex });
      }
    }
  }
}

function resetGame() {
  isGameStarted = true;
  isGameOver = false;
  multiplier = 1;
  chosenCells = [];
  hitBombCell = null;
  currentBet = minimumBet;
  totalGained = 0;
  placeBombs();

  if (cashOutButton) cashOutButton.show();
}


function displayLoss() {
  background("#ff3333");
  fill("white");
  textAlign(CENTER);
  textSize(50);
  text("Bet Ended!", width / 2, height / 2);

  if (hitBombCell) {
    image(bomb, hitBombCell.x * theGrid.cellSize, hitBombCell.y * theGrid.cellSize, theGrid.cellSize, theGrid.cellSize);
    bombSound.play();
  }

  if (cashOutButton) cashOutButton.hide();

  if (bombDisplayTimeout) clearTimeout(bombDisplayTimeout);
  bombDisplayTimeout = setTimeout(() => {
    hitBombCell = null; 
  }, 1000);

  if (lossScreenTimeout) clearTimeout(lossScreenTimeout);
  lossScreenTimeout = setTimeout(() => {
    resetGame();
  }, 2000);
}



function calculateMultiplier(bombCount) {
  return bombCount === 1 ? 1.01 : 1 + (bombCount / 24) * 24;
}

function cashOut() {
  money += totalGained;
  totalGained = 0;
  resetGame();
}

function createCashOutButton() {
  if (!cashOutButton) {
    cashOutButton = createButton("Cash Out");
    cashOutButton.position(625, 200);
    cashOutButton.mousePressed(cashOut);
  } else {
    cashOutButton.show();
  }
}