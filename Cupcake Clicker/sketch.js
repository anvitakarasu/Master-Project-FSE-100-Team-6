
let myImage;

// Score Board variables
let clickPoints = 0;
let clickTime = -1000;

//Point Muiltiplier Variables

let pointUpgradeMultiplier = 2;
let totalPointsToAdd = 1;
let upgradeBoxClicked = false;
let upgradeBoxClickTime = 0;
let upgradeBoxScale = 1;
let pointMultiplierCost = 200;

//Auto Clicker Variables

let autoClickerAmount = 1;
let autoClickerCost = 200
let autoClickerMultiplier = 2
let upgradeBox1Clicked = false;
let upgradeBox1ClickTime = 0;
let upgradeBox1Scale = 1;
let lastAutoClickTime = 0;
let autoClickerActive = false;

//feedback variables
let niceUpgradeFeedbackStartTime = -2000;
let showNiceUpgradeFeedback = false;
  
async function setup() {
  createCanvas(640, 360);
  background(235, 222, 52);
  
  // Load Cupcake Sprite
  myImage = await loadImage("cupcake (1).png");

 //Feedback Variables 
  niceUpgradeFeedbackStartTime = millis();
}

//mouse pressed function (Made with chatgpt)
function mousePressed() {

  // Check if cupcake was clicked
  if (
    mouseX >= 235 &&
    mouseX <= 385 &&
    mouseY >= 85 &&
    mouseY <= 235
  ) {
    clickPoints = clickPoints + totalPointsToAdd;
    clickTime = millis();
  }

  // Check if Multiply Points upgrade box was clicked
  if (
    mouseX >= 550 &&
    mouseX <= 570 &&
    mouseY >= 65 &&
    mouseY <= 85 &&
    clickPoints >= pointMultiplierCost
  ) {

    // Start the animation
    upgradeBoxClicked = true;
    upgradeBoxClickTime = millis();
    upgradeBoxScale = 1.4;


    // Multiply points using the CURRENT multiplier
    totalPointsToAdd = totalPointsToAdd * pointUpgradeMultiplier;

    // Increase multiplier AFTER multiplying
    pointUpgradeMultiplier = pointUpgradeMultiplier + 1;

    //take points from score after 
    clickPoints = clickPoints - pointMultiplierCost;
    pointMultiplierCost = pointMultiplierCost * 4;

    //play nice upgrade feedback
    niceUpgradeFeedbackStartTime = millis();
showNiceUpgradeFeedback = true;
  }

    // Check if Auto Click Upgrade was clicked
// Check if box1 was clicked
if (
  mouseX >= 573 &&
  mouseX <= 593 &&
  mouseY >= 100 &&
  mouseY <= 120 &&
  clickPoints >= autoClickerCost
) {
  upgradeBox1Clicked = true;
  upgradeBox1ClickTime = millis();
  upgradeBox1Scale = 1.3;

  //add the result of the upgrade next class here
  autoClickerAmount = autoClickerAmount + 1;
  clickPoints = clickPoints - autoClickerCost;
  autoClickerCost = autoClickerCost * 2;
  
//Every 1 second that passes add points to score 
    autoClickerActive = true;
  lastAutoClickTime = millis();


  //play nice upgrade feedback
  niceUpgradeFeedbackStartTime = millis();
showNiceUpgradeFeedback = true;
}

}  


function draw() {
  background(235, 222, 52);
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
  // Redraw Score Box to erase old score text
  fill(235, 222, 52);
  rect(50, 280, 180, 60);

  // Display ONE current score
  fill(0);
  textSize(20);
  text(clickPoints, 55, 285, 120, 45);

  // Cupcake animation - same position
  if (millis() - clickTime < 50) {
    image(myImage, 225, 75, 170, 170);
  } else {
    image(myImage, 235, 85, 150, 150);
  }

    // Multiply points upgrade text
  textSize(15);
  text(pointUpgradeMultiplier + "x Points (" + pointMultiplierCost + ") -" , 430, 68, 110, 30);

  // Multiply points upgrade box (Made with chatgpt)

// Check if the box was clicked within the last 2 seconds
if (upgradeBoxClicked && millis() - upgradeBoxClickTime < 2000) {
  fill(255, 150, 0); // Temporary orange color
} else {
  fill(33, 162, 194); // Original color
  upgradeBoxClicked = false;
}

// Draw the box with its current size
rect(560 - (20 * upgradeBoxScale) / 2,
     75 - (20 * upgradeBoxScale) / 2,
     20 * upgradeBoxScale,
     20 * upgradeBoxScale);

// Make the box grow briefly after clicking
if (upgradeBoxScale > 1) {
  upgradeBoxScale = max(1, upgradeBoxScale - 0.03);
}

  //Auto Clicker text and Click Box
  fill(0);
    text("+" + autoClickerAmount + " click per second " , 430, 95, 180, 30);
  text("(" + autoClickerCost + ") " , 480, 111, 180, 30);
  text("-" , 561, 102, 180, 30);

// Check if box1 was clicked within the last 2 seconds
if (upgradeBox1Clicked && millis() - upgradeBox1ClickTime < 2000) {
  fill(255, 150, 0);
} else {
  fill(33, 162, 194);
  upgradeBox1Clicked = false;
}

// Draw box1 with its current size
rect(583 - (20 * upgradeBox1Scale) / 2,
     110 - (20 * upgradeBox1Scale) / 2,
     20 * upgradeBox1Scale,
     20 * upgradeBox1Scale);

// Make box1 grow briefly after clicking
if (upgradeBox1Scale > 1) {
  upgradeBox1Scale = max(1, upgradeBox1Scale - 0.03);
}
if (autoClickerActive && millis() - lastAutoClickTime >= 1000) {
  clickPoints = clickPoints + (autoClickerAmount - 1);
  lastAutoClickTime = millis();
}

function niceUpgradeFeedback() {
  if (showNiceUpgradeFeedback && millis() - niceUpgradeFeedbackStartTime < 1500) {
    fill(21, 230, 21);
    push();
    stroke(0, 0, 0);
    textSize(24);
    text("Nice Upgrade!", 50, 80, 200, 200);
    pop();
  }
  else {
    showNiceUpgradeFeedback = false;
  }
}
  niceUpgradeFeedback();



}
