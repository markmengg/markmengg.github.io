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
  size: 110
};


function setup() {
  createCanvas(width, height);
}

function draw() {
  background(220);
  drawGrid();
}


function startScreen() {
  
}


function drawGrid() {
  for (let y = 0; y < theGrid.yAmount; y++) {
    for (let x = 0; x < theGrid.xAmount; x++){ 
      rect(x*theGrid.size, y*theGrid.size, theGrid.size, theGrid.size);
    }
  }
}
