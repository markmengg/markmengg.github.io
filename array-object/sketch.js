// Bloons TD6 Ripoff? some sort of tower/base defense game with pathways or snake
// Mark Meng
// a star algorithm
// October 8th, 2024

// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let bg;
let width = 548;
let height = 483;


function setup() {
  createCanvas(width, height);
  bg = loadImage("snakeBG.jpg");
}

function draw() {
  background(bg);
  drawGrid();   
}

function drawGrid() {
  for (let y = 0; y < theGrid.yAmount; y++) {
    for (let x = 0; x < theGrid.xAmount; x++){     
      noStroke();
      rect(x*theGrid.xSize, y*theGrid.ySize, theGrid.xSize, theGrid.ySize);
    }
  }
}

let theGrid = {
  xAmount: 17,
  yAmount: 15,
  xSize: width/17,
  ySize: height/15,
};
