// Mark Meng
// Oct 22
// Grid Demo


// If hardcoding:
//    let grid = [
//   [1, 0, 1, 0],
//   [0, 0, 1, 1],
//   [1, 1, 1, 0],
//   [0, 1, 1, 0]];


let grid;
const GRID_SIZE = 10;
let cellSize;
let toggleNeighbors = true;

function setup() {
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth, windowWidth);
  }
  else {
    createCanvas(windowHeight, windowHeight);
  }
  cellSize = height/GRID_SIZE;
  grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
}

function draw() {
  background(220);
  displayGrid();
}


function displayGrid() {
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++){
      if (grid[y][x] === 1) {
        fill("black");
      }
      else if (grid[y][x] === 0) {
        fill("white");
      }
      square(x*cellSize, y*cellSize, cellSize);
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
        newGrid[y].push(1);
      }
      else {
        newGrid[y].push(0);
      }
    }
  }
  return newGrid;
}

function keyPressed() {
  if (key === "q" || key === "w" || key === "e" || key === "u"|| key === "i"|| key === "o") {
    grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  }
  if (key === "r") {
    grid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
  }
  if (key === "n") {
    toggleNeighbors = !toggleNeighbors;
  }
}

function generateEmptyGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      newGrid[y].push(0);
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
    if (grid[y][x] === 1){
      grid[y][x] = 0;
    }
    else {
      grid[y][x] = 1;
    }
  }
}