// Bubble Object Notation Demo
// shows how to delete objects from the array



let theBubbles = [];
let deathLocations = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  for (let i = 0; i < 5; i++) {
    spawnBubble();
  }

  //create a new bubble every half second
  window.setInterval(spawnBubble, 500);
}

function draw() {
  background(220);
  // moveBubblesRandomly();
  moveBubblesWithNoise();
  displayBubbles();
  displayDeathSpots();
}

function mousePressed() {
  for (let bubble of theBubbles) {
    if (clickedInBubble(mouseX, mouseY, bubble)) {
      let theIndex = theBubbles.indexOf(bubble);
      theBubbles.splice(theIndex, 1);
      addDeath(mouseX, mouseY);
    }
  }
}

function displayDeathSpots() {
  for (let spot of deathLocations) {
    textAlign(CENTER, CENTER);
    fill("blue");
    textSize(30);
    text("pop", spot.x, spot.y);
  }
}

function addDeath(thex, they) {
  let deathSpot = {
    x: thex, 
    y: they,
  };
  deathLocations.push(deathSpot);
}

function clickedInBubble(x, y, theBubble) {
  let distanceAway = dist(x, y, theBubble.x, theBubble.y);
  return distanceAway < theBubble.radius;
}


function displayBubbles() {
  for (let bubble of theBubbles) {
    fill(bubble.r, bubble.g, bubble.b, bubble.alpha);
    circle(bubble.x, bubble.y, bubble.radius * 2);
  }
}

function moveBubblesWithNoise() {
  for (let bubble of theBubbles) {
    let x = noise(bubble.timeX) * width;
    let y = noise(bubble.timeY) * height;

    bubble.x = x;
    bubble.y = y;

    bubble.timeX += bubble.deltaTime;
    bubble.timeY += bubble.deltaTime;
  }
}

function moveBubblesRandomlys() {
  for (let bubble of theBubbles) {
    let choice = random(100);
    if (choice < 50) {
      //move up
      bubble.y -= bubble.speed;
    }
    else if (choice < 65) {
      //move down
      bubble.y += bubble.speed;
    }
    else if (choice < 80) {
      //move right
      bubble.x += bubble.speed;
    }
    else {
      //move left
      bubble.x -= bubble.speed;
    }
  }
}

function spawnBubble() {
  let someBubble = {
    x: random(width),
    y: height + random(0, 25),
    speed: random(2, 5),
    radius: random(20, 40),
    r: random(255),
    g: random(255),
    b: random(255),
    alpha: random(100, 255),
    timeX: random(10000000000),
    timeY: random(10000000000),
    deltaTime: 0.001,
  };
  theBubbles.push(someBubble);
}