// Mines Gambling (Heavily Based on Mines by Stake)
// Mark Meng
// November 15th, 2024


// Extra for Experts:
// style.css styling (styled my buttons and UI backdrop), Arrow functions (pretty much local functions that are called through actions)
// Factorial multipliers - sourced (mathematical operations applied to non-negative integers), font styling (changes font of my text)
// some function (checks if at least one element meets a condition), round function (rounds math to certain decimal)
// Set/Clear Timeout function (Sets a 'break' or timeout in the code), null (basically sets a value to undefined so it can be redefined)
// toFixed function (returns value in a string value)




// ----- Game Variables -----

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
let sadBombPic, happyGambler;

let minimumBet = 1; 
let bombAmount = 1;
let topBet = money;
let currentBet = minimumBet;
let startButton, submitBetButton, cashOutButton;
let betSlider, bombSlider;
let chosenCells = [];
let font;
let bgMusic;
let gemSound, bombSound;

let hitBombCell;
let lossScreenTimeout;
let bombDisplayTimeout;
let doubleClickTimeout;

let gameState = "start";




// ----- Setup and Main Loop -----

// Preload Assets 
function preload() {
  gem = loadImage("diamond.png");
  bomb = loadImage("bomb.png");
  tileTexture = loadImage("tileTexture.png");
  sadBombPic = loadImage("sadbomb.png");
  happyGambler = loadImage("happyGambler.png");

  font = loadFont("font.ttf");
  bgMusic = loadSound("BackgroundMusic.mp3");
  gemSound = loadSound("coin.wav");
  bombSound = loadSound("bomb.wav");
}

function setup() {
  createCanvas(width, height);
  adjustVolume();
}

// Main Game Loop
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
  else if (gameState === "loss") {
    displayLoss();
  }
}




// ----- Game Logic and Functions -----

// Start Screen
function startScreen() {
  textAlign(CENTER, CENTER);
  textSize(75);
  fill("white");
  textFont(font);
  text("MINES GAMBLING", width / 2, height / 2 - 50);
  image(happyGambler, width/2 - 150, height/2 - 40);

  if (!startButton) {
    startButton = createButton("Start Game");
    startButton.position(width / 2 - startButton.width/2, height / 2 - startButton.width/2 + 100);

    startButton.mousePressed(() => {
      bgMusic.loop();
      bgMusic.setVolume(0.25); 

      startButton.remove();
  
      resetGame();
    });
  }
}

// Reset Game State
function resetGame() {
  gameState = "bet"; 
  chosenCells = [];
  hitBombCell = null;
  currentBet = minimumBet;

  if (cashOutButton) {
    cashOutButton.hide();
  }

  // remove so the max bet can be updated
  if (betSlider) {
    betSlider.remove();
  } 
  betSlider = null;
}

// Betting Screen
function betScreen() {
  money = Math.round(money * 100) / 100; // Round Money to 2 decimal places

  if(betSlider) {
    betSlider.show();
  }
  if(bombSlider) {
    bombSlider.show();
  }

  // Put sliders for betting and bombs
  if (!betSlider) {
    betSlider = createSlider(minimumBet, money, minimumBet, 1);
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
      placeBombs();
    });
  }

  if(submitBetButton) {
    submitBetButton.show();
  }
  if (!submitBetButton) {
    submitBetButton = createButton("Submit Bet");
    submitBetButton.position(width/2 - submitBetButton.width / 2, height/2 - submitBetButton.height / 2 + 30);

    submitBetButton.mousePressed(() => {
      gameState = "game";
      doubleClickTimeout = setTimeout(() => {
        // Prevent the submit bet button from being pressed from the bet screen
        clearTimeout(doubleClickTimeout);
        doubleClickTimeout = null;
      }, 300);
      

      bombSlider.hide();
      betSlider.hide();
      submitBetButton.hide();

      money -= currentBet;

      placeBombs();
    });
  }

  displayStats();
}

function adjustVolume() {
  bgMusic.amp(0.15);
  gemSound.amp(0.9);
  bombSound.amp(0.9);
}




// ----- Display and User Controls -----


// Display Money, Bet, and Multiplier (in Accordance to Bombs)  
function displayStats() {
  if (gameState === "bet") {
    textSize(35);
    fill("white");
    textAlign(CENTER);
    text("Money: $" + money, width/2, height/2 - 230);
    text("Bet: $" + currentBet, width/2, height/2 - 50);
    text("Multiplier: x" + calculatePayoutMultiplier(theGrid.xAmount * theGrid.yAmount, bombAmount, 1).toFixed(2), width/2, height/2 + 230);
  }
  else if (gameState === "game") {
    textSize(35);
    fill("white");
    textAlign(CENTER);
    
    text("Bet: $" + currentBet, width - 80, 30);
    text("Multiplier: x" + calculatePayoutMultiplier(theGrid.xAmount * theGrid.yAmount, bombAmount, chosenCells.length).toFixed(2), width - 150, height - 30);
  }
}


// Place Bombs Randomly on the Grid
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


// Draw Grid and Handle Tiles
function drawGrid() {
  if (!bombDisplayTimeout) {
    createCashOutButton();
  }

  for (let y = 0; y < theGrid.yAmount; y++) {
    for (let x = 0; x < theGrid.xAmount; x++) {
      if (chosenCells.some(cell => cell.x === x && cell.y === y) || hitBombCell && hitBombCell.x === x && hitBombCell.y === y) {
        let bombHit = bombs.some(b => b.x === x && b.y === y);
        if (bombHit || hitBombCell && hitBombCell.x === x && hitBombCell.y === y) {
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

  displayStats();
}


// Handle Mouse Clicks on the Grid
function mousePressed() {
  if (gameState === "game" && !doubleClickTimeout) {
    let xIndex = floor(mouseX / theGrid.cellSize);
    let yIndex = floor(mouseY / theGrid.cellSize);

    if (xIndex < theGrid.xAmount && yIndex < theGrid.yAmount) {
      if (chosenCells.some(cell => cell.x === xIndex && cell.y === yIndex)) {
        return;
      }

      let bombHit = bombs.some(b => b.x === xIndex && b.y === yIndex);
      if (bombHit) {
        hitBombCell = { x: xIndex, y: yIndex };

        if (!bombDisplayTimeout) {
          bombDisplayTimeout = setTimeout(() => {
            bombDisplayTimeout = null;
            gameState = "loss";
          }, 2000);
        }
    
        bombSound.play();
        
        cashOutButton.hide();
      } 
      else {
        if(bombDisplayTimeout) {
          return;
        } // Don't allow player to click on other cells after hitting a bomb

        chosenCells.push({ x: xIndex, y: yIndex });
        gemSound.play();
      }
    }
  }
}


// Display Loss Screen
function displayLoss() {
  background("#ff5e5e");
  fill("white");
  textAlign(CENTER);
  textSize(50);
  text("Bet Ended!", width / 2, height / 2 - 100);
  image(sadBombPic, width/2 - 130, height/2 - 75);


  if (cashOutButton) {
    cashOutButton.hide();
  }

  if (!lossScreenTimeout) {
    lossScreenTimeout = setTimeout(() => {
      hitBombCell = null; 
      lossScreenTimeout = null;
      resetGame();
    }, 3000);  
  }
  
}


// Handles Cash Out Action
function cashOut() {
  money += currentBet * calculatePayoutMultiplier(theGrid.xAmount * theGrid.yAmount, bombAmount, chosenCells.length);
  resetGame();
}


// Creates Cash Out Button
function createCashOutButton() {
  if (!cashOutButton) {
    cashOutButton = createButton("Cash Out");
    cashOutButton.position(650, height/2 - cashOutButton.height/2);
    cashOutButton.mousePressed(cashOut);
  }
  else {
    cashOutButton.show();
  }
}


// Calculate Pay Multiplier Based on Amount of Gems Clicked (ie 1/25 chance -> 1/24 chance should be increased multiplier)
function calculatePayoutMultiplier(numberOfTiles, numberOfMines, squaresRevealed) {
  // Based on Stake Mines Logic
  let safeTiles = numberOfTiles - numberOfMines;

  function factorial(num) {
    // Source https://www.freecodecamp.org/news/how-to-factorialize-a-number-in-javascript-9263c89a4b38/ 
    if (num === 0 || num === 1) {
      return 1;
    }
    for (let i = num - 1; i >= 1; i--) {
      num *= i;
    }
    return num;
  }

  function combination(n, d) {
    if (d > n) {
      return 0;
    }
    return factorial(n) / (factorial(d) * factorial(n - d));
  }

  let totalCombinations = combination(numberOfTiles, squaresRevealed);
  let safeCombinations = combination(safeTiles, squaresRevealed);
    
  let multiplier = 0.99 * (totalCombinations / safeCombinations);
    
  return multiplier; 
}