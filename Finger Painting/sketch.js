let starPoints = [];
let userPath = [];
let isTracingCorrect = true;
let accuracyTolerance = 30; 
let backBtnSize = 50;

function setup() {
  createCanvas(windowWidth, windowHeight);
  generateStarPoints(width / 2, height / 2 + 20, 5, 140, 60);
  
  document.body.addEventListener('touchmove', function(e) {
    e.preventDefault();
  }, { passive: false });
}

function draw() {
  background(178, 206, 163);

  drawHeader();
  drawStarOutline();
  drawUserTrace();
  drawBackButton();

  if (mouseIsPressed) {
    processPointerMove(mouseX, mouseY);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  generateStarPoints(width / 2, height / 2 + 20, 5, 140, 60);
}

function generateStarPoints(x, y, numPoints, outerRadius, innerRadius) {
  starPoints = [];
  let angle = TWO_PI / numPoints;
  let halfAngle = angle / 2.0;

  for (let a = -HALF_PI; a < TWO_PI - HALF_PI; a += angle) {
    let sx = x + cos(a) * outerRadius;
    let sy = y + sin(a) * outerRadius;
    starPoints.push(createVector(sx, sy));

    sx = x + cos(a + halfAngle) * innerRadius;
    sy = y + sin(a + halfAngle) * innerRadius;
    starPoints.push(createVector(sx, sy));
  }
}

function drawStarOutline() {
  push();
  stroke(100);
  strokeWeight(12);
  strokeJoin(ROUND);
  noFill();

  beginShape();
  for (let pt of starPoints) {
    vertex(pt.x, pt.y);
  }
  endShape(CLOSE);
  pop();
}

function processPointerMove(px, py) {
  if (py < 100 || (px < 80 && py < 80)) return;

  let currentPos = createVector(px, py);
  
  let distToStar = getMinDistanceToStar(currentPos);
  let isSegmentCorrect = distToStar <= accuracyTolerance;

  userPath.push({
    x: px,
    y: py,
    correct: isSegmentCorrect
  });

  if (!isSegmentCorrect) {
    isTracingCorrect = false;
  }
}

function getMinDistanceToStar(point) {
  let minD = Infinity;

  for (let i = 0; i < starPoints.length; i++) {
    let p1 = starPoints[i];
    let p2 = starPoints[(i + 1) % starPoints.length];
    
    let d = distToSegment(point, p1, p2);
    if (d < minD) minD = d;
  }

  return minD;
}

function distToSegment(p, v, w) {
  let l2 = distSq(v, w);
  if (l2 === 0) return dist(p.x, p.y, v.x, v.y);
  let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
  t = constrain(t, 0, 1);
  return dist(p.x, p.y, v.x + t * (w.x - v.x), v.y + t * (w.y - v.y));
}

function distSq(v, w) {
  return (v.x - w.x) ** 2 + (v.y - w.y) ** 2;
}

function drawUserTrace() {
  if (userPath.length < 2) return;

  push();
  strokeWeight(16);
  strokeCap(ROUND);
  strokeJoin(ROUND);
  noFill();

  for (let i = 1; i < userPath.length; i++) {
    let p1 = userPath[i - 1];
    let p2 = userPath[i];

    if (p2.correct) {
      stroke(46, 204, 113); 
    } else {
      stroke(231, 76, 60); 
    }

    line(p1.x, p1.y, p2.x, p2.y);
  }
  pop();
}

function drawHeader() {
  push();
  textAlign(CENTER, CENTER);
  fill(0);

  textStyle(BOLD);
  textSize(32);
  text("Finger Painting: Star Trace", width / 2, 40);

  textSize(16);
  textStyle(NORMAL);
  text("Trace inside the gray star line cleanly!", width / 2, 75);
  pop();
}

function drawBackButton() {
  push();
  rectMode(CORNER);

  let isHover = mouseX > 20 && mouseX < 20 + backBtnSize && mouseY > 20 && mouseY < 20 + backBtnSize;

  fill(isHover ? 185 : 255);
  stroke(0);
  strokeWeight(2);
  rect(20, 20, backBtnSize, backBtnSize, 10);

  // Left Arrow Icon
  stroke(0);
  strokeWeight(3);
  noFill();
  line(45, 45, 30, 45);
  line(30, 45, 38, 37);
  line(30, 45, 38, 53);
  pop();
}

function mousePressed() {
  if (mouseY > 100) {
    userPath = [];
    isTracingCorrect = true;
  }

  if (mouseX > 20 && mouseX < 20 + backBtnSize && mouseY > 20 && mouseY < 20 + backBtnSize) {
    window.location.href = "index.html";
  }
}