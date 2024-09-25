// p5.js Interactive Scene Assignment
// Mark Meng
// Comp Sci 30, P4
// Mr. Schellenberg



// START OF CODE

// Stating Variables
let radius = 40;
let circleSize = radius;
const sizeChange = 3;
let shapeType = "circle"; // Default shape
let backgroundColor = 150;
let colorChange = 20;
let brush;


// Setup and Draw

function preload() {
  brush = loadImage("brush.png");
}

function setup() {
  // Makes it so that the size of the window is adjusted to / filled by the canvas
  createCanvas(windowWidth, windowHeight);
  background(backgroundColor);
  frameRate(60);
}

function draw() {
  cursor(CROSS, mouseX, mouseY);
}


function mouseDragged(){
  if (mouseButton === LEFT){
    // changes color based on position of mouse
    let shapeColor = [map(mouseX, 0, width, 255, 0), 0, map(mouseY, 0, height, 255, 0)]; 
    fill(shapeColor);
    drawShape(); 
  }
  if (mouseButton === RIGHT){
    fill(backgroundColor);
    drawShape();
  }
}

function drawShape() {
  noStroke();
  
  // Draw the selected shape
  if (shapeType === "circle") {
    circle(mouseX, mouseY, circleSize);
  }
  else if (shapeType === "square") {
    square(mouseX - circleSize / 2, mouseY - circleSize / 2, circleSize);
  }
  else if (shapeType === "triangle") {
    triangle(mouseX, mouseY - circleSize / 2, mouseX - circleSize / 2, mouseY + circleSize / 2, mouseX + circleSize / 2, mouseY + circleSize / 2);
  }
}

// Increases the size of the shape when the user scrolls the mouse wheel. (Scroll up = increase size, scroll down = decrease size)
function mouseWheel(event) {
  let direction = event.delta;
  
  if (direction > 0 && circleSize > 5) {
    circleSize -= sizeChange;
  }
  else {
    circleSize += sizeChange;
  }
}

// When user presses any key on the keyboard, it changes resets circleSize and shape to circle. If they press S, it turns into a square. If they press T, it turns into a triangle
function keyPressed() {
  if (key === "1") {
    shapeType = "circle"; // Change to circle
  } 
  else if (key === "2") {
    shapeType = "square"; // Change to square
  }
  else if (key === "3") {
    shapeType = "triangle"; // Default to triangle
  }
  else if (key === "e") {
    circleSize = radius; // Reset size
  }
  else if (key === "q") {
    clear();
    setup();
  }
  else if (key === "o") {
    backgroundColor = backgroundColor + colorChange;
    setup();
  }
  else if (key === "p") {
    backgroundColor = backgroundColor - colorChange;
    setup();
  }
}
