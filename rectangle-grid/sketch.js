// Rectangle Grid
// Mark Meng // Oct 28
// 2d Array Demo

const CELL_SIZE = 50;
let grid;
let rows;
let cols;
const CIRCULAR = 10;



function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = Math.floor(width / CELL_SIZE);
  rows = Math.floor(height / CELL_SIZE);
  grid = generateRandomGrid(cols, rows);
}

function draw() {
  background(255);
  displayGrid();
}


function displayGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === 1) {
        fill("black");
        noStroke();
      }
      else {
        fill("white");
      }
      square (x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CIRCULAR);
    }
  }
}

function generateRandomGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      if (random(100) < 50) {
        newGrid[y].push(0);
      }
      else {
        newGrid[y].push(1);
      }
    }
  }
    

  return newGrid;
}
