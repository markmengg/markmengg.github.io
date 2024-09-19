// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


// p5.js Interactive Scene Assignment
// Mark Meng
// Comp Sci 30, P4
// Mr. Schellenberg

// START OF CODE



// Stating Variables
let radius = 10;
let circleSize = radius;
let sizeChange = 3;
let shapeType = 'circle'; // Default shape


// Setup and Draw
function setup() {
  // Makes it so that the size of the window is adjusted to / filled by the canvas
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(200);
  drawShape();
}

function drawShape() {
  // changes color based on position of mouse & removes shape outline
  let shapeColor = [map(mouseX, 0, width, 0, 255), 0, map(mouseY, 0, height, 0, 255)];
  fill(shapeColor);
  noStroke();
  
  // Draw the selected shape
  if (shapeType === 'circle') {
    circle(mouseX, mouseY, circleSize);
  } else if (shapeType === 'square') {
    square(mouseX - circleSize / 2, mouseY - circleSize / 2, circleSize);
  } else if (shapeType === 'triangle') {
    triangle(mouseX, mouseY - circleSize / 2, mouseX - circleSize / 2, mouseY + circleSize / 2, mouseX + circleSize / 2, mouseY + circleSize / 2);
  }
}

// Increases the size of the shape when the user scrolls the mouse wheel. (Scroll up = decrease size, scroll down = increase size)

function mouseWheel(event) {
  let direction = event.delta;
  
  if (direction > 0 && circleSize > 3) {
    circleSize += sizeChange;
  } else {
    circleSize -= sizeChange;
  }
}

// When user presses any key on the keyboard, it changes resets circleSize and shape to circle. If they press S, it turns into a square. If they press T, it turns into a triangle

function keyPressed() {
  if (key === 's') {
    shapeType = 'square'; // Change to square
  } else if (key === 't') {
    shapeType = 'triangle'; // Change to triangle
  } else {
    shapeType = 'circle'; // Default to circle
    circleSize = radius; // Reset size
  }
}
