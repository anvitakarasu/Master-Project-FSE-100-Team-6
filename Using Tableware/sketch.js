let img, img2, img3, imgSoupPiece;

let imgX = 270;
let imgY = 180;
let imgW = 100; 
let imgH = 100;

let timeLimit = 30;
let timeLeft = 30;

let isDragging = false;
let currentTint = null;
let hasSoup = false;

let currentLevel = 0; 
let score = 0;
let highScore = 0;
let levelStartTime = 0;
let isLoaded = false; 

const BASE_W = 640;
const BASE_H = 320;
let offsetX = 0;
let offsetY = 0;

const levels = [
  {
    levelNum: 1,
    timeLimit: 30,
    foodX: 420,
    foodY: 140,
    mouthX: 20,
    mouthY: 40,
    spoonSize: 100,
    moveType: 'none',
    label: "Level 1: Easy Mode"
  },
  {
    levelNum: 2,
    timeLimit: 20,
    foodX: 480,
    foodY: 180,
    mouthX: 40,
    mouthY: 90,
    spoonSize: 85,
    moveType: 'none',
    label: "Level 2: Shorter Time!"
  },
  {
    levelNum: 3,
    timeLimit: 15,
    foodX: 420,
    foodY: 100,
    mouthX: 30,
    mouthY: 50,
    spoonSize: 75,
    moveType: 'vertical_bowl',
    label: "Level 3: Moving Bowl!"
  },
  {
    levelNum: 4,
    timeLimit: 14,
    foodX: 450,
    foodY: 120,
    mouthX: 50,
    mouthY: 40,
    spoonSize: 70,
    moveType: 'chaos',
    label: "Level 4: Gentle Chaos!"
  }
];

async function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1); 

  highScore = Number(localStorage.getItem("tablewareHighScore")) || 0;

  img = await loadImage("images/spoon.png");
  img2 = await loadImage("images/happygirl.png");
  img3 = await loadImage("images/soup.png");
  imgSoupPiece = await loadImage("images/piece.png"); 

  isLoaded = true;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function getVirtualMouse() {
  return {
    x: mouseX - offsetX,
    y: mouseY - offsetY
  };
}

function draw() {
  background(210, 150, 190);

  offsetX = max(0, (width - BASE_W) / 2);
  offsetY = max(0, (height - BASE_H) / 2);

  push();
  translate(offsetX, offsetY);

  if (!isLoaded) {
    fill(0);
    textFont('Courier New');
    textAlign(CENTER, CENTER);
    textSize(20);
    text("Loading Game Assets...", BASE_W / 2, BASE_H / 2);
    pop();
    return;
  }

  if (currentLevel === 0) {
    drawStartScreen();
  } else if (currentLevel <= levels.length) {
    playLevel(levels[currentLevel - 1]);
  } else {
    drawWinScreen();
  }

  pop();
}

function drawStartScreen() {
  fill(0);
  textFont('Courier New');
  textAlign(CENTER, CENTER);
  textSize(32);
  text("Using Tableware", BASE_W / 2, 100);
  textSize(18);
  text("Beat 4 Levels of Increasing Fun!", BASE_W / 2, 150);
  text("Click Anywhere to Start Level 1", BASE_W / 2, 210);
}

function playLevel(lvl) {
  textAlign(LEFT, BASELINE);
  let vMouse = getVirtualMouse();
  
  let elapsedSeconds = (millis() - levelStartTime) / 1000;
  timeLeft = max(0, lvl.timeLimit - floor(elapsedSeconds));

  let currentFoodX = lvl.foodX;
  let currentFoodY = lvl.foodY;
  let currentMouthX = lvl.mouthX;
  let currentMouthY = lvl.mouthY;

  if (lvl.moveType === 'vertical_bowl') {
    currentFoodY += sin(frameCount * 0.05) * 50;
  } else if (lvl.moveType === 'chaos') {
    currentFoodX += cos(frameCount * 0.04) * 30;
    currentFoodY += sin(frameCount * 0.04) * 30;
    currentMouthY += sin(frameCount * 0.03) * 25;
  }

  // HUD
  textSize(22);
  textFont('Courier New');
  fill(0);
  text(lvl.label, 250, 40);
  textSize(18);
  text("Time left: " + timeLeft + "s", 250, 70);
  text("Score: " + score, 250, 95);

 
  image(img2, currentMouthX, currentMouthY, 180, 180);   
  image(img3, currentFoodX, currentFoodY, 100, 100);  

  if (isDragging) {
    imgX = vMouse.x - lvl.spoonSize / 2;
    imgY = vMouse.y - lvl.spoonSize / 2;
  }
  
  push(); 
    if (currentTint) tint(currentTint); 
    image(img, imgX, imgY, lvl.spoonSize, lvl.spoonSize); 
  pop(); 

  if (hasSoup) {
    image(imgSoupPiece, imgX - 5, imgY - 20, lvl.spoonSize, lvl.spoonSize);
  } else {
    image(imgSoupPiece, currentFoodX + 8, currentFoodY + 8, 100, 100);
  }

  if (timeLeft <= 0) {
    textAlign(CENTER, CENTER);
    textSize(36);
    fill(255, 0, 0);
    text("TIME'S UP!", BASE_W / 2, BASE_H / 2 - 20);
    textSize(18);
    fill(0);
    text("Click to Retry Level " + currentLevel, BASE_W / 2, BASE_H / 2 + 30);
    noLoop();
  }
}

function drawWinScreen() {
  textAlign(CENTER, CENTER);
  fill(0, 120, 0);
  textFont('Courier New');
  textSize(34);
  text("YOU BEAT ALL 4 LEVELS!", BASE_W / 2, BASE_H / 2 - 45);
  fill(0);
  textSize(22);
  text("Final Score: " + score, BASE_W / 2, BASE_H / 2);
  textSize(16);
  text("High Score: " + highScore, BASE_W / 2, BASE_H / 2 + 30);
  text("Click anywhere to Restart Game", BASE_W / 2, BASE_H / 2 + 65);
}

function mousePressed() {
  if (!isLoaded) return;

  if (currentLevel === 0 || currentLevel > levels.length) {
    score = 0;
    startLevel(1);
    return;
  }
  
  if (timeLeft <= 0) {
    startLevel(currentLevel);
    return;
  }

  let lvl = levels[currentLevel - 1];
  let vMouse = getVirtualMouse();

  if (vMouse.x >= imgX && vMouse.x <= imgX + lvl.spoonSize && 
      vMouse.y >= imgY && vMouse.y <= imgY + lvl.spoonSize) {
    isDragging = true;
  }
}

function mouseReleased() {
  if (!isDragging || !isLoaded) return;
  isDragging = false;
  
  let lvl = levels[currentLevel - 1];

  let currentFoodX = lvl.foodX;
  let currentFoodY = lvl.foodY;
  let currentMouthX = lvl.mouthX;
  let currentMouthY = lvl.mouthY;

  if (lvl.moveType === 'vertical_bowl') {
    currentFoodY += sin(frameCount * 0.05) * 50;
  } else if (lvl.moveType === 'chaos') {
    currentFoodX += cos(frameCount * 0.04) * 30;
    currentFoodY += sin(frameCount * 0.04) * 30;
    currentMouthY += sin(frameCount * 0.03) * 25;
  }

  let scoopDist = (lvl.levelNum === 4) ? 85 : 70;
  if (dist(imgX, imgY, currentFoodX, currentFoodY) < scoopDist) {
    hasSoup = true; 
    currentTint = color(0, 220, 0); 
  } 
  else if (hasSoup && dist(imgX, imgY, currentMouthX, currentMouthY) < 95) {
    hasSoup = false; 
    currentTint = color(0, 255, 0);

    score += 100 + (timeLeft * 10);
    if (score > highScore) {
      highScore = score;
      localStorage.setItem("tablewareHighScore", highScore);
    }
    
    if (currentLevel < levels.length) {
      startLevel(currentLevel + 1);
    } else {
      currentLevel++; 
    }
  }
}

function startLevel(levelNum) {
  currentLevel = levelNum;
  levelStartTime = millis(); 
  
  let lvl = levels[currentLevel - 1];
  if (lvl) {
    imgW = lvl.spoonSize;
    imgH = lvl.spoonSize;
  }
  
  imgX = 270; 
  imgY = 160;
  hasSoup = false;
  currentTint = null;
  loop();
}