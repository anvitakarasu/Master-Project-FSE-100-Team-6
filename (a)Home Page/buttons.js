let gameButtons = [
  { label: "Cupcake\nClicker", x: 0, y: 0, url: "Cupcake Clicker/index.html" },
  { label: "Finger\nPainting", x: 0, y: 0, url: "Finger Painting/index.html" },
  { label: "Using\nTableware", x: 0, y: 0, url: "Using Tableware/index.html" },
  { label: "Pressing\nButtons", x: 0, y: 0, url: "Pressing Buttons/index.html" }
];

let btnWidth = 150;
let btnHeight = 75;

function setupButtons() {
  let cX = width / 2;
  let cY = height / 2;
  let offset = 210; 

  
  gameButtons[0].x = cX - offset; gameButtons[0].y = cY;         
  gameButtons[1].x = cX;          gameButtons[1].y = cY - 110;   
  gameButtons[2].x = cX;          gameButtons[2].y = cY + 110;   
  gameButtons[3].x = cX + offset; gameButtons[3].y = cY;        
}

function drawGameButtons() {
  push();
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  textSize(16);
  textStyle(BOLD);

  for (let btn of gameButtons) {
    let isHover = abs(mouseX - btn.x) < btnWidth / 2 && abs(mouseY - btn.y) < btnHeight / 2;

    if (isHover) {
      fill(185, 165, 230);
      cursor(HAND);
    } else {
      fill(170, 150, 218);
    }

    stroke(0);
    strokeWeight(2);
    rect(btn.x, btn.y, btnWidth, btnHeight, 8);

    fill(0);
    noStroke();
    text(btn.label, btn.x, btn.y);
  }
  pop();
}

function checkGameButtonsClick() {
  for (let btn of gameButtons) {
    let isInside = abs(mouseX - btn.x) < btnWidth / 2 && abs(mouseY - btn.y) < btnHeight / 2;
    if (isInside) {
      console.log("Navigating to: " + btn.url);
      window.location.href = btn.url;
    }
  }
}