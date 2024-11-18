// Fireworks OOP


class Particle {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.dx = random(-7, 7);
    this.dy = random(-7, 7);
    this.size = random(3, 10);
    this.r = random(0, 255);
    this.g = random(0, 255);
    this.b = random(0, 255);
    this.opacity = 255;
  }

  display() {
    noStroke();
    fill(this.r, this.g, this.b, this.opacity);
    circle(this.x, this.y, this.size);
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
    this.opacity-=4;
  }
  isDead() {
    return this.opacity <= 0;
  }
}


let theFireworks = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background("#2c3740");
  for (let firework of theFireworks) {
    if (firework.isDead()){
      let index = theFireworks.indexOf(firework);
      theFireworks.splice(index, 1);
    }
    else {
      firework.update();
      firework.display();
    }
  }
}

function mousePressed() {
  for (let i = 0; i < 150; i++) {
    let someParticle = new Particle(mouseX, mouseY);
    theFireworks.push(someParticle);
  }
}

