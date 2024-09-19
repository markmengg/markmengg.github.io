// Square Moving Around Screen
// Sept 19, 2024



let x = 0;
let y = 0;
let speed = 5;
let state = "right";
let squareSize = 50;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  moveSquare();
  displaySquare();
}


function moveSquare() {
  if (state === "right"){
    x += speed
    if (x >= width - squareSize){
      state = "down";
    }
  }
  
  if (state === "down"){
    y += speed;
    if (y >= height - squareSize){
      state = "left";
    }
  }
  
  if (state === "left"){
  x -= speed
    if (x <= 0){
      state = "up";
    }
  }
  
  if (state === "up"){
    y -= speed;
    if (y <= 0){
      state = "right";
    }
  }
}

function displaySquare() {
  fill("beige")
  square(x, y, squareSize)
}