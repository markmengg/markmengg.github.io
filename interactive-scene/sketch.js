// p5.js Interactive Scene Assignment
// Mark Meng
// Comp Sci 30, P4
// Mr. Schellenberg



// START OF CODE

// Stating Variables
let gameState = "start";
let startButton;
let radius = 40;
let circleSize = radius;
const sizeChange = 3;
let shapeType = "circle"; // Default shape
let backgroundShade = 150;
let shadeChange = 15;
let useColorPicker = false;
let colorPicker;
let canvasSnapshots = [];
let isDrawing = false;


function setup() {
  // Only create canvas when gameState is "drawing"
  if (gameState === "start") {
    // Start screen setup
    createCanvas(windowWidth, windowHeight);
    background(200);
    
    // Create a start button
    startButton = createButton('Start Drawing');
    startButton.position(windowWidth / 2 - 50, windowHeight / 2 + 20);
    startButton.mousePressed(startDrawing);
  } 
  else if (gameState === "drawing") {
    createCanvas(windowWidth, windowHeight);
    background(backgroundShade);
    frameRate(60);

    colorPicker = createColorPicker('ff0000');
    colorPicker.position(10, 150);
  }
}

function startDrawing() {
  gameState = "drawing";
  startButton.remove();
  clear();
  setup(); 
}

function startGame() {
  if (gameState === "start") {
    // Show the start screen
    showTitleScreen();
  } 
  else if (gameState === "drawing") {
    // Show the drawing canvas
    PenDisplay();
    textDisplay();
  }
}

function showTitleScreen() {
  background(200);  // Set background for the start screen
  textAlign(CENTER);
  textSize(50);
  fill("black");
  text("Free Draw", windowWidth / 2, windowHeight / 2 - 50);  // Title text
}

function draw() {
  startGame();
}


function PenDisplay() {
  // shows pen
  cursor(CROSS, mouseX, mouseY);
}

function textDisplay() {
  fill(backgroundShade, 200);
  noStroke();
  rect(0, 0, width, 140); // Adjust width to full canvas width

  // Set text color based on background shade
  let textColor = backgroundShade < 128 ? "white" : "black";
  fill(textColor);
  textAlign(CENTER); // Center the text

  // Display size/background shade indicator
  textSize(20);
  text(`Size: ${circleSize}`, width / 2, 30); // Centering horizontally
  text(`Background Shade: ${backgroundShade}`, width / 2, 50); // Centering horizontally

  // Display keyboard controls
  textSize(12);
  text("1: Circle | 2: Square | 3: Triangle", width / 2, 70); // Centering horizontally
  text("E: Reset Stroke Size | Q: Clear Screen | O / P: Change Background Shade", width / 2, 90); // Centering horizontally
  text("Z: Undo", width / 2, 110); // Centering horizontally

  // Clear the area before updating the color picker mode
  fill(backgroundShade, 200);
  noStroke();
  rect(0, 120, width, 20); // Adjust width to full canvas width

  // Update the color picker mode
  fill(textColor); // Use the same text color logic
  text(`Color Picker Mode: ${useColorPicker ? "ON" : "OFF"}`, width / 2, 130); // Centering horizontally
}

function mousePressed() {
  if (mouseButton === LEFT) {
    saveCanvasState();
    isDrawing = true;
  }
}

function mouseReleased() {
  isDrawing = false;
}


function mouseDragged() {

  if (isDrawing) {
    let shapeColor;
    if (useColorPicker) {
      shapeColor = colorPicker.color(); // Use color picker
    } else {
      shapeColor = [map(mouseX, 0, width, 255, 0), 0, map(mouseY, 0, height, 255, 0)];
    }
    fill(shapeColor);
    drawShape();
  }

  // Eraser
  if (mouseButton === RIGHT) {
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


function saveCanvasState() {
  // Save current canvas state as an image
  canvasSnapshots.push(get());
}

function undoLastAction() {
  if (canvasSnapshots.length > 0) {
    let previousCanvas = canvasSnapshots.pop(); // Get the last saved state
    clear(); // Clear the canvas
    image(previousCanvas, 0, 0); // Restore the previous state
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
  else if (key === "z") {
    undoLastAction();
  }
  else if (key === "c") {
    useColorPicker = !useColorPicker;
  }
}
