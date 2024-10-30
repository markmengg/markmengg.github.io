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
let bomb;
let tileTexture;
let isGameStarted;


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
  startScreen();
  drawGrid();
}


function startScreen() {
  textAlign(CENTER, CENTER);
  textSize(50);
  fill("blue");
  text("MINES GAMBLING", width / 2, height / 2 - 50);

  startButton = createButton("Start Game");
  startButton.position(width/2, height/2);
  startButton.mousePressed(isGameStarted);

}


function startGame() {
  if (isGameStarted === true) {
    drawGrid();
    startButton.hide();

  }
}

function drawGrid() {
  for (let y = 0; y < theGrid.yAmount; y++) {
    for (let x = 0; x < theGrid.xAmount; x++){ 
      image(tileTexture, x * theGrid.cellSize, y * theGrid.cellSize, theGrid.cellSize, theGrid.cellSize);
    }
  }
}
