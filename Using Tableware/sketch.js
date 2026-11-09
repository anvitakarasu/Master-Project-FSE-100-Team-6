
let img, img2, img3, imgSoupPiece;

let imgX = 200;
let imgY = 100;
let imgW = 100; 
let imgH = 100;

let timeLimit = 30;
let timeLeft;

let isDragging = false;
let currentTint = null;
let hasSoup = false;

async function setup() {
  createCanvas(640, 320);
  textSize(32);

  img = await loadImage("images/spoon.png");
  img2 = await loadImage("images/happygirl.png");
  img3 = await loadImage("images/soup.png");
  imgSoupPiece = await loadImage("images/piece.png"); 
  img2.resize(200, 200);
  img.resize(100, 100);
  img3.resize(100, 100);

  imgSoupPiece.resize(115, 115); 
}

function draw() {
  background(210, 150, 190);
  
  let elapsedSeconds = millis() / 1000;
  timeLeft = max(0, timeLimit - floor(elapsedSeconds));

  textSize(24);
  textFont('Courier New');
  fill(0);
  text("Using Tableware", 300, 50);
  textSize(18);
  text("Drag spoon to food", 300, 65);
  text("Time left: " + timeLeft, 300, 90);

  image(img2, 0, 0);   
  image(img3, 350, 100); 
  if (isDragging) {
    imgX = mouseX - imgW / 2;
    imgY = mouseY - imgH / 2;
  }
  
 
  push(); 
    if (currentTint) {
      tint(currentTint); 
    }
    image(img, imgX, imgY, imgW, imgH); 
  pop(); 

 
  if (hasSoup) {
    image(imgSoupPiece, imgX - 5, imgY - 20);
  } else {
    image(imgSoupPiece, 342, 92);
  }

  if (timeLeft <= 0) {
    textSize(32);
    fill(255, 0, 0);
    text("TIME'S UP!", width / 2 - 80, height / 2);
  }
}

function mousePressed() {
  if (mouseX >= imgX && mouseX <= imgX + imgW && mouseY >= imgY && mouseY <= imgY + imgH) {
    isDragging = true;
  }
}

function mouseReleased() {
  isDragging = false;
 
 
  if (imgX >= 300 && imgX < 450 && imgY >= 50 && imgY < 200) {
    hasSoup = true; 
    currentTint = color(0, 220, 0); 
  } 
 
  else if (imgX >= 50 && imgX < 200 && imgY >= 20 && imgY < 200) {
    if (hasSoup) {
      hasSoup = false; 
    }
    currentTint = color(0, 255, 0);
  }
}