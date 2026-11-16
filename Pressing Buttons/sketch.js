let btn1;
let btn2;
let btn3;

let pressedA = false;
let pressedB = false;
let pressedC = false; 

let stars = [];
let moreColorStars = [];
let goldStars = [];

let timeLimit = 10;
let timeRemaining = 10; 
let gameOver = false;
let gameWon = false; 

function setup() { 
  createCanvas(windowWidth, windowHeight);
  btn1 = createButton('Press A');
  btn1.position(60,200);
  btn1.size(150,50);
  btn1.style('font-family', 'Courier New');
  btn1.style('font-size', '18px');
  btn1.style('background-color', '#FFd700')
  btn2 = createButton('Press B');
  btn2.position(220, 200);
  btn2.size(150,50);
  btn2.style('font-family', 'Courier New');
  btn2.style('font-size','18px');
  btn2.style('background-color', '#FFd700')
  btn3 = createButton('Press C');
  btn3.position(380,200);
  btn3.size(150,50);
  btn3.style('font-family', 'Courier New');
  btn3.style('font-size', '18px');
  btn3.style('background-color', '#FFd700')
}

function draw() {
  background(135,206,235);

  if ((!gameOver) && (!gameWon)) {
    timeRemaining = timeLimit - (millis() / 1000);
    if (timeRemaining <= 0) {
      timeRemaining = 0; 
      gameOver = true;
      handleLoss();
    }
  }

  textAlign(CENTER, TOP);
  fill(0);
  noStroke();
  textFont('Courier New');
  textSize(30);

  
  
  
  if (pressedA && pressedB && pressedC && !gameOver) {
    gameWon = true; 
    triggerStars();
  }
  
  if (gameOver && !gameWon) {
    fill(255, 0, 0);
    text("Time's up, Try Again!", width / 2, 50);   
  }
  else if (gameWon) {
    fill(0, 140, 0);
    textStyle(BOLD);
    text("AMAZING! YOU WIN!", width / 2, 50); 
  }
  else {
    text("Time remaining: " + nf(timeRemaining, 1, 0), width / 2, 50);
  }
  
}

function keyPressed() {
  if ((key === 'A') || (key === 'a')) {
    while (!gameOver) {
      changeColorOfBtn1();
      btn1.html('Great job!');
      pressedA = true; 
    }
  }
  else if ((key === 'B') || (key === 'b')) {
    while (!gameOver) {
      changeColorOfBtn2();
      btn2.html('fantastic work!');
      pressedB = true; 
    }
  }
  else if ((key === 'C') || (key === 'c')) {
    while (!gameOver) {
      changeColorOfBtn3();
      btn3.html('Incredible!');
      pressedC = true; 
    }
  }
}

function handleLoss() {
  btn1.html('locked');
  btn2.html('locked');
  btn3.html('locked');
  btn1.style('background-color', '#D3D3D3');
  btn2.style('background-color', '#d3d3d3');
  btn3.style('background-color', '#d3d3d3');
}

function triggerStars() {
  for (let i = stars.length - 1; i >= 0; i--) {
    let s = stars[i];
    s.x += s.vx; 
    s.y += s.vy; 
    s.alpha -= 4; 
    
    
    fill(255, 255, 255, s.alpha);
    noStroke();
    ellipse(s.x, s.y, s.size, s.size);
    
  
    
    
    if (s.alpha <= 0) {
      stars.splice(i, 1);
    }
  }
  for (let j = moreColorStars.length - 1; j >= 0; j--) {
    let t = moreColorStars[j];
    t.x += t.vx; 
    t.y += t.vy; 
    t.alpha -= 4; 
    
    
    fill(255, 105, 180, t.alpha);
    noStroke();
    ellipse(t.x, t.y, t.size, t.size);
    
  
    
    
    if (t.alpha <= 0) {
      moreColorStars.splice(j, 1);
    }
  }
  for (let k = goldStars.length - 1; k >= 0; k--) {
    let u = goldStars[k];
    u.x += u.vx;
    u.y += u.vy;
    u.alpha -= -3;

    fill(255, 215, 0);
    noStroke(); 
    ellipse(u.x, u.y, u.size, u.size); 

    if (u.alpha <= 0) {
      goldStars.splice(k, 1); 
    }
  }
  
  for (let i = 0; i < 40; i++) {
    stars.push({
      x: random(width), 
      y: random(height),
      vx: random(-1, 0),
      vy: random(-1, 2),
      size: random(2, 9),
      alpha: 200
    });
  }
  for (let j = 0; j < 20; j++) {
    moreColorStars.push({
      x: random(width),
      y: random(height),
      vx: random(-1, 0),
      vy: random(-1, 2),
      size: random(2,9),
      alpha: 200
    });
  }
  for (let k = 0; k < 15; k++) {
    goldStars.push({
      x: random(width),
      y: random(height),
      vx: random(-1, 1),
      vy: random(-1, 3),
      size: random(2, 7),
      alpha: 200
    })
  }
  
  
}

function changeColorOfBtn1() {
  btn1.style('background-color', '#00ff00');
}

function changeColorOfBtn2() {
  btn2.style('background-color', '#00ff00');
}

function changeColorOfBtn3() {
  btn3.style('background-color', '#00ff00');
}
