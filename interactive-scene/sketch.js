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
let backgroundShade = 150;
let shadeChange = 15;
let brush;


// Setup and Draw

function setup() {
  // Makes it so that the size of the window is adjusted to / filled by the canvas
  createCanvas(windowWidth, windowHeight);
  background(backgroundShade);
  frameRate(60);
}



function draw() {
  PenDisplay();
  textDisplay();
}




function PenDisplay() {
  // shows pen
  cursor(CROSS, mouseX, mouseY);
}

function textDisplay() {
  // refreshes the display size indicator
  fill(backgroundShade, 200);
  noStroke();
  rect(0, 0, 200, 60);
  
  // display size/background shade indicator     
  fill("black");
  textSize(20);
  text(`Size: ${circleSize}`, 10, 30);

  fill("black");
  textSize(20);
  text(`Background Shade: ${backgroundShade}`, 10, 50);

  // display keyboard controls
  fill("black");
  textSize(12);
  text("1: Circle | 2: Square | 3: Triangle", 10, 70);
  text("E: Reset Stroke Size | Q: Clear Screen | O / P: Change Background Shade", 10, 90);
}

function mouseDragged(){
  if (mouseButton === LEFT){
    // changes color based on position of mouse
    let shapeColor = [map(mouseX, 0, width, 255, 0), 0, map(mouseY, 0, height, 255, 0)]; 
    fill(shapeColor);
    drawShape(); 
  }
  // Eraser
  if (mouseButton === RIGHT){
    fill(backgroundShade);
    drawShape();
  }
}

function drawShape() {
  noStroke();
  
  // Shape Select
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

// User Controls - Allows User to Manipulate Canvas
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
  else if (key === "p") {
    if (backgroundShade < 255) {
      backgroundShade = backgroundShade + shadeChange;
      setup();
    }
  }
  else if (key === "o") {
    if (backgroundShade > 0) {
      backgroundShade = backgroundShade - shadeChange;
      setup();
    }
  }
}
