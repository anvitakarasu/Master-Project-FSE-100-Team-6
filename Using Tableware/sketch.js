let img;
let imgX = 200;
let imgY = 100;
let imgW = 150;
let imgH = 150;
let img2;
let img2X = 50;
let img2Y = 50;
let img2W = 50;
let img2H = 50;
let isDragging = false;
async function setup() {
  createCanvas(640, 320);
  
  
  img = await loadImage("images/spoon.png");
  img2 = await loadImage("images/happygirl.png");
  //img3= await loadImage("images")
  
  image(img, 0, 0);
  
}



function draw() {
background(210,150,190);
  textSize(24);
  text("Using Tableware",300,50);
  textFont('Courier New');
  textSize(18);
  text("Drag spoon to food",300,65);
 
  
  image(img2, 0, 0);
  img2.resize(200,200);
  img.resize(100,100);
 if (isDragging) {
    imgX = mouseX - imgW / 2;
    imgY = mouseY - imgH / 2;
  }
  
  image(img, imgX, imgY, imgW, imgH);
}

function mousePressed() {
  
  if (
    mouseX >= imgX &&
    mouseX <= imgX + imgW &&
    mouseY >= imgY &&
    mouseY <= imgY + imgH
  ) {
    isDragging = true;
  }
}
function mouseReleased() {
  isDragging = false;
  if(imgX>=50&&imgY>=50) {
    tint(0,255,0);
  }
}


