// Bouncing Ball Demo
// Oct 3, 2024


let ballArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 100; i++) {
    spawnBall(width/2, height/2);
  }
}

function draw() {
  background(220);

  for (let someBall of ballArray) {
    someBall.x += someBall.dx;
    someBall.y += someBall.dy;

    // Bounce if Needed
    if (someBall.x > width - someBall.radius || someBall.x < 0 + someBall.radius) {
      someBall.dx *= -1;
    } 
    if (someBall.y > height - someBall.radius || someBall.y < 0 + someBall.radius) {
      someBall.dy *= -1;
    }

    // Display Ball
    fill(someBall.red, someBall.green, someBall.blue, someBall.alpha);
    noStroke();
    circle(someBall.x, someBall.y, someBall.radius*2);
  }
}

function mousePressed() {
  spawnBall(mouseX, mouseY);
}


function spawnBall(theX, theY) {
  let theBall = {
    x: theX,
    y: theY,
    radius: random(30,80),
    dx: random(-5, 5),
    dy: random(-5, 5),
    red: random(0, 255),
    green: random(0, 255),
    blue: random(0, 255),
    alpha: random(50, 255),
  };

  ballArray.push(theBall);
}
