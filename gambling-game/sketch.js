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

let minimumBet = 1; 
let topBet = money;
let currentBet = minimumBet;
let startButton;
let submitBetButton;
let betSlider;
let bombSlider;
let multiplier = 1.01;
let chosenCells = [];
let bombAmount = 1;
let font;
let bgMusic;
let gemSound, bombSound;

let hitBombCell;
let totalGained = 0;
let cashOutButton;
let lossScreenTimeout;
let bombDisplayTimeout;

let gameState = "start";




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
  if (gameState === "start") {
    startScreen();
  }
  else if (gameState === "game") {
    drawGrid();
  }
  else if (gameState === "bet") {
    betScreen(); 
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
  
  resetGame();
}

function resetGame() {
  gameState = "bet"; 
  multiplier = 1;
  chosenCells = [];
  hitBombCell = null;
  currentBet = minimumBet;
  totalGained = 0;
}



function betScreen() {
  if(betSlider) {
    betSlider.show();
  }
  if(bombSlider) {
    bombSlider.show();
  }

  // Put sliders for betting and bombs
  if (!betSlider) {
    betSlider = createSlider(minimumBet, Math.min(money || 5000, 5000), minimumBet, 1);
    betSlider.position(width/2 - 65, height/2 - 20);
    betSlider.input(() => {
      currentBet = betSlider.value();
    }
    );
  }

  if (!bombSlider) {
    bombSlider = createSlider(1.00, 24, 1.01, 1);
    bombSlider.position(width/2 - 65, height/2 + 190);
    bombSlider.input(() => {
      bombAmount = bombSlider.value();
      multiplier = calculateMultiplier(bombAmount);
      placeBombs();

      console.log(bombAmount);
    });
  }

  if(submitBetButton) {
    submitBetButton.show();
  }
  if (!submitBetButton) {
    submitBetButton = createButton("Submit Bet");
    submitBetButton.position(width/2 - 40, height/2 + 5);
    submitBetButton.mousePressed(() => {
      gameState = "game";
      bombSlider.hide();
      betSlider.hide();
      submitBetButton.hide();

      money -= currentBet;

      placeBombs();
    });

    return; // Return as we don't need to see the stats
  }

  displayStats();
}




function displayStats() {
  textSize(35);
  fill("white");
  textAlign(CENTER);
  text("Money: $" + money, width/2, height/2 - 230);
  text("Bet: $" + currentBet, width/2, height/2 - 50);
  text("Multiplier: x" + multiplier.toFixed(2), width/2, height/2 + 230);
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


function drawGrid() {
  for (let y = 0; y < theGrid.yAmount; y++) {
    for (let x = 0; x < theGrid.xAmount; x++) {
      if (chosenCells.some(cell => cell.x === x && cell.y === y) || hitBombCell && hitBombCell.x === x && hitBombCell.y === y) {
        let bombHit = bombs.some(b => b.x === x && b.y === y);
        if (bombHit || hitBombCell && hitBombCell.x === x && hitBombCell.y === y) {
          image(bomb, x * theGrid.cellSize, y * theGrid.cellSize, theGrid.cellSize, theGrid.cellSize);
          bombSound.play();
        }
        else {
          image(gem, x * theGrid.cellSize, y * theGrid.cellSize, theGrid.cellSize, theGrid.cellSize);
          gemSound.play();
        }
      }
      else {
        image(tileTexture, x * theGrid.cellSize, y * theGrid.cellSize, theGrid.cellSize, theGrid.cellSize);
      }
    }
  }
}

function mousePressed() {
  if (gameState === "game") {
    let xIndex = floor(mouseX / theGrid.cellSize);
    let yIndex = floor(mouseY / theGrid.cellSize);

    if (xIndex < theGrid.xAmount && yIndex < theGrid.yAmount) {
      if (chosenCells.some(cell => cell.x === xIndex && cell.y === yIndex)) {
        return;
      }

      let bombHit = bombs.some(b => b.x === xIndex && b.y === yIndex);
      if (bombHit) {
        money -= currentBet + totalGained;
        totalGained = 0;
        hitBombCell = { x: xIndex, y: yIndex };
        displayLoss();
      } 
      else {
        multiplier += 0.03;
        let gainedAmount = currentBet * multiplier;
        totalGained += gainedAmount;
        chosenCells.push({ x: xIndex, y: yIndex });
      }
    }
  }
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

  if (cashOutButton) {
    cashOutButton.hide();
  }

  if (bombDisplayTimeout) {
    clearTimeout(bombDisplayTimeout);
  }
  bombDisplayTimeout = setTimeout(() => {
    hitBombCell = null; 
  }, 500);

  if (lossScreenTimeout) {
    clearTimeout(lossScreenTimeout);
  }
  lossScreenTimeout = setTimeout(() => {
    resetGame();
  }, 1000);
}



function calculateMultiplier(bombCount) {
  return bombCount === 1 ? 1.01 : 1 + bombCount / 24 * 24;
}

function cashOut() {
  money += currentBet;
  money += totalGained;
  totalGained = 0;
  resetGame();
}

function createCashOutButton() {
  if (!cashOutButton) {
    cashOutButton = createButton("Cash Out");
    cashOutButton.position(625, 200);
    cashOutButton.mousePressed(cashOut);
  }
  else {
    cashOutButton.show();
  }
}