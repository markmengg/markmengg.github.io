// Collide Demo

let hit = false;
const poly = []; // stores the vertices for our polygon.

function setup() {
  createCanvas(800, 600);
  collideDebug(true); // enable debug mode

  // Set x,y positions as vecs:
  poly[0] = createVector(323, 431);
  poly[1] = createVector(210, 311);
  poly[2] = createVector(220, 223);
  poly[3] = createVector(590, 233);
}

function draw() {
  background(255);

  // Draw the polygon by iterating over the 4 created vectors{x, y} stored in poly[]:
  beginShape();
  for (const { x, y } of poly){
    vertex(x, y);
  }
    
  endShape(CLOSE);

  rect(mouseX, mouseY, 45, 100);

  hit = collideRectPoly(mouseX, mouseY, 45, 100, poly);

  // Enable the hit detection if the rectangle is wholly inside the polygon:
  // hit = collideRectPoly(mouseX, mouseY, 45, 100, poly, true);

  // Use vectors as input:
  // const mouse     = createVector(mouseX, mouseY);
  // const rect_size = createVector(45, 100);

  // hit = collideRectPolyVector(mouse, rect_size, poly);
  // Or:
  // hit = collideRectPolyVector(mouse, rect_size, poly, true);
  if (hit) {
    stroke("red");
    fill("red");
  }
  else {
    stroke("black");
    noFill();
  }
  console.log('colliding?', hit);
}