function setup() {
  createCanvas(windowWidth, windowHeight);
  setupButtons(); 
}

function draw() {
  background(178, 206, 163);

  drawHeader();
  drawCenterHomeIcon();
  drawGameButtons();      
  drawSettingsButton();   

  if (isSettingsOpen) {
    drawSettingsPanel();  
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setupButtons();
}

function drawHeader() {
  push();
  textAlign(CENTER, CENTER);
  fill(0);
  textStyle(BOLD);
  textSize(42);
  text("Welcome!", width / 2, 45);
  
  textStyle(ITALIC);
  textSize(18);
  text("Select a Game", width / 2, 85);
  pop();
}

function drawCenterHomeIcon() {
  push();
  rectMode(CENTER);
  stroke(0);
  strokeWeight(4);
  noFill();

  let cX = width / 2;
  let cY = height / 2;

  triangle(cX - 25, cY - 5, cX, cY - 30, cX + 25, cY - 5);
  rect(cX, cY + 12, 40, 35);
  rect(cX, cY + 20, 14, 20);
  pop();
}

function mousePressed() {

  let settingsClicked = checkSettingsClick();
  
  if (!settingsClicked && !isSettingsOpen) {
    checkGameButtonsClick();
  }
}