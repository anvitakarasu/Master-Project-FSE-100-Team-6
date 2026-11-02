let isSettingsOpen = false;

function drawSettingsButton() {
  push();
  rectMode(CORNER);
  
  let btnSize = 65;
  let margin = 20;
  let btnX = width - btnSize - margin;
  let btnY = height - btnSize - margin;

  // Check hover state for gear button
  let isHover = mouseX > btnX && mouseX < btnX + btnSize && mouseY > btnY && mouseY < btnY + btnSize;

  // Button background styling
  if (isHover) {
    fill(140, 115, 195);
    cursor(HAND);
  } else {
    fill(150, 125, 205);
  }
  
  stroke(0);
  strokeWeight(3);
  rect(btnX, btnY, btnSize, btnSize, 12);

  // High-visibility white and black gear graphic
  translate(btnX + btnSize / 2, btnY + btnSize / 2);
  stroke(0);
  strokeWeight(3.5);
  fill(255);
  ellipse(0, 0, 32, 32);

  // Outer gear teeth
  for (let i = 0; i < 8; i++) {
    rotate(TWO_PI / 8);
    line(14, 0, 20, 0);
  }

  // Inner gear center
  fill(0);
  noStroke();
  ellipse(0, 0, 12, 12);
  pop();
}

function drawSettingsPanel() {
  push();
  // Semi-transparent backdrop
  fill(0, 120);
  rect(0, 0, width, height);

  // Side panel drawer
  fill(245);
  stroke(0);
  strokeWeight(2);
  rect(width - 280, 0, 280, height);

  // Panel Header
  fill(0);
  noStroke();
  textSize(24);
  textStyle(BOLD);
  text("Settings", width - 255, 45);

  textSize(13);
  textStyle(NORMAL);
  text("Click outside or gear to close", width - 255, 75);
  pop();
}

function checkSettingsClick() {
  let btnSize = 65;
  let margin = 20;
  let btnX = width - btnSize - margin;
  let btnY = height - btnSize - margin;

  // Click on Gear icon
  if (mouseX > btnX && mouseX < btnX + btnSize && mouseY > btnY && mouseY < btnY + btnSize) {
    isSettingsOpen = !isSettingsOpen;
    return true;
  }

  // Click outside panel to close
  if (isSettingsOpen && mouseX < width - 280) {
    isSettingsOpen = false;
    return true;
  }

  return false;
}