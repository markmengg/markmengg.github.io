// Image Demo
// Sept 23, 2024

let patrick;

function preload() {
  patrick = loadImage("patrick.png");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  image(patrick, mouseX, mouseY, patrick.width * 0.5, patrick.height * 0.5)
}
