// Sound effects demo
// Mark Meng Oct 16
let music;

function preload() {
  music = loadSound("Soliloquy.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  music.amp(0.3);
}

function draw() {
  background(220);
}

function keyPressed(){
  if (!music.isPlaying()){
    music.loop();
  }
}