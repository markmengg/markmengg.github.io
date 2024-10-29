// Mark Meng
// Oct 22
// Character In Grid Demo



let grid;
const GRID_SIZE = 10;
let cellSize;
let toggleNeighbors = false;
const OPENTILE = 0;
const CLOSEDTILE = 1;
const PLAYER_TILE = 9;
let grass;
let pavement;
let player = {
  x: 0,
  y: 0,
};


function preload() {
  grass = loadImage("grass1.jpg");
  pavement = loadImage("rock01.jpg");
}


function setup() {
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth, windowWidth);
  }
  else {
    createCanvas(windowHeight, windowHeight);
  }
  cellSize = height/GRID_SIZE;
  grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);

  grid[player.y][player.x] = PLAYER_TILE;
}

function draw() {
  background(220);
  displayGrid();
}


function displayGrid() {
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++){
      if (grid[y][x] === CLOSEDTILE) {
        image(grass, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[y][x] === OPENTILE) {
        image(pavement, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[y][x] === PLAYER_TILE) {
        fill ("red");
        square(x*cellSize, y*cellSize, cellSize);
      }
    }
  }
}

function generateRandomGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      // choose either 0 or 1 

      if (random(100) < 50) {
        newGrid[y].push(CLOSEDTILE);
      }
      else {
        newGrid[y].push(OPENTILE);
      }
    }
  }
  return newGrid;
}

function keyPressed() {
  if (key === "e") {
    grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  }
  if (key === "r") {
    grid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
  }
  if (key === "n") {
    toggleNeighbors = !toggleNeighbors;
  }
  if (key === "w"|| key === UP_ARROW) {
    movePlayer(player.x, player.y - 1);
  }
  if (key === "a" || key === LEFT_ARROW) {
    movePlayer(player.x - 1, player.y);
  }
  if (key === "d" || key === RIGHT_ARROW) {
    movePlayer(player.x + 1, player.y);
  }
  if (key === "s"|| key === DOWN_ARROW) {
    movePlayer(player.x, player.y + 1);
  }
}

function generateEmptyGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      newGrid[y].push(OPENTILE);
    }
  }
  return newGrid;
}


function mousePressed() {
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);

  toggleCell(x, y);

  if (toggleNeighbors){
    toggleCell(x + 1, y);
    toggleCell(x -1, y);
    toggleCell(x, y +1);
    toggleCell(x, y-1);
  }
}

function windowResized() {
  if (windowWidth < windowHeight) {
    resizeCanvas(windowWidth, windowWidth);
  }
  else {
    resizeCanvas(windowHeight, windowHeight);
  }
  cellSize = height/GRID_SIZE;
}

function toggleCell(x, y) {
  if (x>= 0 && y >= 0 && x < GRID_SIZE && y < GRID_SIZE){
    if (grid[y][x] === CLOSEDTILE){
      grid[y][x] = OPENTILE;
    }
    else {
      grid[y][x] = CLOSEDTILE;
    }
  }
}

function movePlayer(x,y) {

  if (x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE && grid[y][x] === OPENTILE){
    grid[player.y][player.x] = OPENTILE;
    player.x = x;
    player.y = y;
  
    grid[player.y][player.x] = PLAYER_TILE;
  }
}