// Bloons TD6 Ripoff? some sort of tower/base defense game with pathways or snake
// Mark Meng
// a star algorithm
// October 8th, 2024

// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let width = 700;
let height = 600;
let snake = [];
let apples = [];

function setup() {
  createCanvas(width, height);
}

function draw() {
  background(255);
  drawGrid();   
}

function drawGrid() {
  let isLightGreen = true;
  for (let y = 0; y < theGrid.yAmount; y++) {
    for (let x = 0; x < theGrid.xAmount; x++){ 
      if (isLightGreen) {
        fill (165, 235, 104);
      }
      else {
        fill(152, 219, 94);
      }
      noStroke();
      rect(x*theGrid.xSize, y*theGrid.ySize, theGrid.xSize, theGrid.ySize);
      isLightGreen = !isLightGreen;
    }
  }
}

let theGrid = {
  xAmount: 17,
  yAmount: 15,
  xSize: width/17,
  ySize: height/15,
};
