// Traffic Light Demo
// Mark Meng


let lightState = "green";
let lts = 0;
const GREEN_LIGHT_DURATION = 3000;
const YELLOW_LIGHT_DURATION = 1000;
const RED_LIGHT_DURATION = 4000;


function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255);
  drawOutlineOfLights();
  ssin();
  displayCorrectLight();
}



function displayCorrectLight(){
  if (lightState === "green") {
    fill("green");
    ellipse(width/2, height/2 + 65, 50, 50); //bottom
  }
  else if (lightState === "yellow") {
    fill("yellow");
    ellipse(width/2, height/2, 50, 50); //middle
  }
  else if (lightState === "red") {
    fill("red");
    ellipse(width/2, height/2 - 65, 50, 50); //top
  }
}

function ssin() {
  if (lightState === "green" && millis() > lts + GREEN_LIGHT_DURATION) {
    lightState = "yellow";
    lts = millis();
  }
  else if (lightState === "yellow" && millis() > lts + YELLOW_LIGHT_DURATION) {
    lightState = "red";
    lts = millis();
  }
  if (lightState === "red" && millis() > lts + RED_LIGHT_DURATION) {
    lightState = "green";
    lts = millis();
  }
}

function drawOutlineOfLights() {
  //box
  rectMode(CENTER);
  fill(0);
  rect(width/2, height/2, 75, 200, 10);

  //lights
  fill(255);
  ellipse(width/2, height/2 - 65, 50, 50); //top
  ellipse(width/2, height/2, 50, 50); //middle
  ellipse(width/2, height/2 + 65, 50, 50); //bottom
}