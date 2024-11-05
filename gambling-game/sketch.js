// Gambling Games
// Mark Meng
// October 28th, 2024
// Ideas: stake mines, currency feature, multiplier based on mines, good animations and particle effects. 5x5 grid
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let width = 1100;
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

function preload() {
  gem = loadImage("diamond.png");
  bomb = loadImage("bomb.png");
  tileTexture = loadImage("tileTexture.png");
}


function setup() {
  createCanvas(width, height);
  startScreen();
}

function draw() {
  background(220);
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
  textSize(50);
  fill("blue");
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
  placeBombs();
}


function drawGrid() {
  if (!slider){
    slider = createSlider(minimumBet, Math.min(money, 5000), minimumBet, 1);
    slider.position(1000, 50);
    slider.input(() => currentBet = slider.value());
  }

  for (let y = 0; y < theGrid.yAmount; y++) {
    for (let x = 0; x < theGrid.xAmount; x++){ 
      if (chosenCells.some(cell => cell.x === x && cell.y === y)) {
        image(gem, x * theGrid.cellSize, y * theGrid.cellSize, theGrid.cellSize, theGrid.cellSize);
      } 
      else {
        image(tileTexture, x * theGrid.cellSize, y * theGrid.cellSize, theGrid.cellSize, theGrid.cellSize);
      }
    }
  }
}


function displayStats() {
  textSize(24);
  fill(0);
  textAlign(LEFT);
  text("Money: $" + money, 900, 100);
  text("Bet: $" + currentBet, 900, 130);
  text("Multiplier: x" + multiplier.toFixed(2), 900, 160);
}

function placeBombs() {
  bombs = [];
  while (bombs.length < 5) {  // Adjust number of bombs based on difficulty
    let x = floor(random(theGrid.xAmount));
    let y = floor(random(theGrid.yAmount));
    
    if (!bombs.some(b => b.x === x && b.y === y)) {
      bombs.push({ x, y });
    }
  }
}

function mousePressed() {
  if (!isGameStarted) return;

  let xIndex = floor(mouseX / theGrid.cellSize);
  let yIndex = floor(mouseY / theGrid.cellSize);

  if (xIndex < theGrid.xAmount && yIndex < theGrid.yAmount) {
    if (chosenCells.some(cell => cell.x === xIndex && cell.y === yIndex)) {
      console.log("Cell already chosen.");
      return;
    }

    let bombHit = bombs.some(b => b.x === xIndex && b.y === yIndex);
    if (bombHit) {
      console.log("Bomb hit! Game over.");
      money -= currentBet;
      resetGame();
    } else {
      multiplier += 0.03;
      money += currentBet * multiplier;
      chosenCells.push({ x: xIndex, y: yIndex });
      console.log(`Gem found! Multiplier: ${multiplier}`);
    }
  }
}

function resetGame() {
  isGameStarted = false;
  if (startButton) startButton.show();
  clearSlidersAndButtons();
  multiplier = 1;
  chosenCells = [];
}

function clearSlidersAndButtons() {
  // Clear the sliders and end bet button
  const sliders = selectAll('input[type="range"]');
  sliders.forEach(slider => slider.remove());
  const buttons = selectAll('button');
  buttons.forEach(button => button.remove());
}