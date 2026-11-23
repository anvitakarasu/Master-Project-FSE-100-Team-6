let myImage;
let backBtnSize = 50;

// Virtual game resolution (keeps all coordinates scaled cleanly)
const BASE_W = 640;
const BASE_H = 360;

// Score Board variables
let clickPoints = 0;
let clickTime = -1000;

// Point Multiplier Variables
let pointUpgradeMultiplier = 2;
let totalPointsToAdd = 1;
let upgradeBoxClicked = false;
let upgradeBoxClickTime = 0;
let upgradeBoxScale = 1;
let pointMultiplierCost = 50;

// Auto Clicker Variables
let autoClickerAmount = 1;
let autoClickerCost = 100;
let autoClickerMultiplier = 2;
let upgradeBox1Clicked = false;
let upgradeBox1ClickTime = 0;
let upgradeBox1Scale = 1;
let lastAutoClickTime = 0;
let autoClickerActive = false;

// Feedback variables
let niceUpgradeFeedbackStartTime = -2000;
let showNiceUpgradeFeedback = false;
let showGreatClickingFeedback = false;
let greatClickingFeedbackStartTime = 0;
let cupcakeClicks = [];

async function setup() {
  createCanvas(windowWidth, windowHeight);
  background(235, 222, 52);

  // Load Cupcake Sprite
  myImage = await loadImage("cupcake (1).png");

  // Feedback Variables
  niceUpgradeFeedbackStartTime = millis();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  // 1. Back button click -> Navigate back to the homepage
  if (mouseX > 20 && mouseX < 20 + backBtnSize && mouseY > 20 && mouseY < 20 + backBtnSize) {
    window.location.href = "../(a)Home Page/index.html";
    return;
  }

  // 2. Convert screen mouse coordinates into 640x360 game coordinates
  let scaledX = mouseX / (width / BASE_W);
  let scaledY = mouseY / (height / BASE_H);

  // Check if cupcake was clicked
  if (
    scaledX >= 235 &&
    scaledX <= 385 &&
    scaledY >= 85 &&
    scaledY <= 235
  ) {
    clickPoints = clickPoints + totalPointsToAdd;
    clickTime = millis();

    // Record cupcake click time
    cupcakeClicks.push(millis());
  }

  // Check if Multiply Points upgrade box was clicked
  if (
    scaledX >= 550 &&
    scaledX <= 570 &&
    scaledY >= 65 &&
    scaledY <= 85 &&
    clickPoints >= pointMultiplierCost
  ) {
    upgradeBoxClicked = true;
    upgradeBoxClickTime = millis();
    upgradeBoxScale = 1.4;

    totalPointsToAdd = totalPointsToAdd * pointUpgradeMultiplier;
    pointUpgradeMultiplier = pointUpgradeMultiplier + 1;

    clickPoints = clickPoints - pointMultiplierCost;
    pointMultiplierCost = pointMultiplierCost * 3;

    niceUpgradeFeedbackStartTime = millis();
    showNiceUpgradeFeedback = true;
  }

  // Check if Auto Click Upgrade was clicked
  if (
    scaledX >= 573 &&
    scaledX <= 593 &&
    scaledY >= 100 &&
    scaledY <= 120 &&
    clickPoints >= autoClickerCost
  ) {
    upgradeBox1Clicked = true;
    upgradeBox1ClickTime = millis();
    upgradeBox1Scale = 1.3;

    autoClickerAmount = autoClickerAmount + 1;
    clickPoints = clickPoints - autoClickerCost;
    autoClickerCost = autoClickerCost * 2;

    autoClickerActive = true;
    lastAutoClickTime = millis();

    niceUpgradeFeedbackStartTime = millis();
    showNiceUpgradeFeedback = true;
  }
}

function draw() {
  background(235, 222, 52);

  push();
  scale(width / BASE_W, height / BASE_H);

  // Upgrade Box
  fill(50, 200, 30);
  rect(420, 55, 180, 275);

  // "Upgrade Box" Text
  fill(0);
  textSize(24);
  text("Upgrade Box", 439, 40);

  // Score Box Text
  fill(0);
  textSize(24);
  text("Points Scored!", 60, 265);
  
  fill(235, 222, 52);
  rect(50, 280, 180, 60);

  // Display ONE current score
  fill(0);
  textSize(20);
  text(clickPoints, 55, 285, 120, 45);

  // Cupcake animation - same position
  if (myImage) {
    if (millis() - clickTime < 50) {
      image(myImage, 225, 75, 170, 170);
    } else {
      image(myImage, 235, 85, 150, 150);
    }
  }

  // Multiply points upgrade text
  textSize(15);
  text(pointUpgradeMultiplier + "x Points (" + pointMultiplierCost + ") -", 430, 68, 110, 30);

  if (upgradeBoxClicked && millis() - upgradeBoxClickTime < 2000) {
    fill(255, 150, 0);
  } else {
    fill(33, 162, 194);
    upgradeBoxClicked = false;
  }

  rect(
    560 - (20 * upgradeBoxScale) / 2,
    75 - (20 * upgradeBoxScale) / 2,
    20 * upgradeBoxScale,
    20 * upgradeBoxScale
  );

  if (upgradeBoxScale > 1) {
    upgradeBoxScale = max(1, upgradeBoxScale - 0.03);
  }

  // Auto Clicker text and Click Box
  fill(0);
  text("+" + autoClickerAmount + " click per second ", 430, 95, 180, 30);
  text("(" + autoClickerCost + ") ", 480, 111, 180, 30);
  text("-", 561, 102, 180, 30);

  if (upgradeBox1Clicked && millis() - upgradeBox1ClickTime < 2000) {
    fill(255, 150, 0);
  } else {
    fill(33, 162, 194);
    upgradeBox1Clicked = false;
  }

  rect(
    583 - (20 * upgradeBox1Scale) / 2,
    110 - (20 * upgradeBox1Scale) / 2,
    20 * upgradeBox1Scale,
    20 * upgradeBox1Scale
  );

  if (upgradeBox1Scale > 1) {
    upgradeBox1Scale = max(1, upgradeBox1Scale - 0.03);
  }

  if (autoClickerActive && millis() - lastAutoClickTime >= 1000) {
    clickPoints = clickPoints + (autoClickerAmount - 1);
    lastAutoClickTime = millis();
  }

  // Remove clicks older than 5 seconds
  cupcakeClicks = cupcakeClicks.filter(time => millis() - time <= 5000);

  // Check if cupcake was clicked 10 or more times
  if (cupcakeClicks.length >= 10 && !showGreatClickingFeedback) {
    showGreatClickingFeedback = true;
    greatClickingFeedbackStartTime = millis();
    cupcakeClicks = [];
  }

  niceUpgradeFeedback();
  greatClickingFeedback();

  pop();

  // Draw Back Button unscaled in top-left corner
  drawBackButton();
}

function niceUpgradeFeedback() {
  if (showNiceUpgradeFeedback && millis() - niceUpgradeFeedbackStartTime < 1500) {
    fill(21, 230, 21);
    push();
    stroke(0, 0, 0);
    textSize(24);
    text("Nice Upgrade!", 50, 80, 200, 200);
    pop();
  } else {
    showNiceUpgradeFeedback = false;
  }
}

function greatClickingFeedback() {
  if (showGreatClickingFeedback && millis() - greatClickingFeedbackStartTime < 1500) {
    fill(21, 230, 21);
    push();
    stroke(0, 0, 0);
    textSize(24);
    // Positioned slightly lower so it doesn't overlap "Nice Upgrade!"
    text("Great Clicking!", 50, 120, 200, 200);
    pop();
  } else {
    showGreatClickingFeedback = false;
  }
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

