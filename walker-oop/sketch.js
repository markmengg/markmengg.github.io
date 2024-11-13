// Walker OOP demo


class Walker {
  constructor(x, y, theColor) {
    this.x = x;
    this.y = y;
    this.speed = 20;
    this.radius = 4;
    this.color = theColor;
  }

  display() {
    fill(this.color);
    circle(this.x, this.y, this.radius*2);
  }

  move(){
    let choice =random(100);
    if (choice < 25) {
      this.y -= this.speed;
    }
    else if (choice < 50) {
      this.y += this.speed;
    }
    else if (choice < 75) {
      this.x -= this.speed;
    }
    else {
      this.x += this.speed;
    }
  }

}
let luc;
let luc2;


function setup() {
  createCanvas(windowWidth, windowHeight);
  luc = new Walker(width/2, height/2, "red");
  luc2 = new Walker(width/2, height/2, "blue");
  luc3 = new Walker(width/2, height/2, "yellow");
  luc4 = new Walker(width/2, height/2, "green");
}

function draw() {
  luc2.move();
  luc.move();
  luc3.move();
  luc4.move();

  luc2.display();
  luc.display();
  luc4.display();
  luc3.display();
}
