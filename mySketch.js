//Created by kusakari
//https://twitter.com/kusakarism

let _minW;
let _maxW;
let startpalette =  ["CED3DC"];
let _palette0;
let _count;
let _aryRing = [];
let _aryRotate = [];
let selectedColor;


let customFont;




// Add an event listener to detect changes in the color picker
colorPicker.addEventListener("change", function () {
    selectedColor = color(colorPicker.value); // Store the selected color
    let selectedColorHex =
      
      red(selectedColor).toString(16).padStart(2, "0") +
      green(selectedColor).toString(16).padStart(2, "0") +
      blue(selectedColor).toString(16).padStart(2, "0"); // change selectedColor to Hex Format
    
    if (_palette0[0] == "CED3DC") {
    _palette0[0] = selectedColorHex;
    }
    else {
    _palette0.push(selectedColorHex);
    console.log("Palette updated:", _palette0);
    }
    
   
    
    
    for (let i = 0; i < _aryRing.length; i++) {
    _aryRing[i].palette = _palette0;
    //console.log(_aryRing[i].palette);
    _aryRing[i].aryCol = [];
      for (let j = 0; j < _aryRing[i].palette.length; j++) {
      _aryRing[i].aryCol[j] = color("#" + _aryRing[i].palette[j]);
      
    }
    /*
    _aryRing[i].setPalette(_palette0);
    _aryRing[i].setAryCol();
    _aryRing[i].setNumCol();*/
    
    }
    
    for (let i = 0; i < _aryRing.length; i++) {
      _aryRing[i].selectedColor = selectedColor;
    }
 
    
    })
    
    

function setup() {
  createCanvas(400, 200);
  textFont("sans-serif");
  // Set the loaded font as the default font
  textSize(32);
  text("How is your mood today?", 100, 100);
  
  createCanvas(windowWidth, windowHeight, WEBGL);
   
  setObject();
  
}
 
  
function setObject() {
  _count = 0;
  _minW = min(width, height) * 1;
  _maxW = max(width, height);
  rectMode(CENTER);
  ellipseMode(RADIUS);
  noFill();
  stroke(0, 60, 90);
  strokeWeight(_minW / 600 * pixelDensity());//600 * pixelDensity());
  
  _palette0 = startpalette;
  
  let numRing = 600;
  let posR = _minW / 2.9;//3.1;//3.5;
  let posAngNoiseInit_0 = [random(10000), random(10000), random(10000)];
  let rNoiseInit_0 = [random(10000), random(10000), random(10000)];
  let posRNoiseInit_0 = [random(10000), random(10000), random(10000)];
  let posAngNoiseThetaInit = random(2*PI);
  let rNoiseThetaInit = random(2*PI);
  let posRNoiseThetaInit = random(2*PI);
  let posAngNoiseStep = 0.15;
  let rNoiseStep = 0.3;//0.2;
  let posRNoiseStep = 0.3;//0.2;
  let posAngNoiseSpeed = 0.004 * random([-1, 1]);
  let rNoiseSpeed = 0.004 * random([-1, 1]);
  let posRNoiseSpeed = 0.004 * random([-1, 1]);
  shuffle(_palette0, true);
  _aryRing = [];
  for (let i = 0; i < numRing; i++) {
    let posAngInit = 2*PI / numRing * i;
    let posAngNoiseInit = [posAngNoiseInit_0[0] + posAngNoiseStep * cos(posAngInit), posAngNoiseInit_0[1] + posAngNoiseStep * sin(posAngInit), posAngNoiseInit_0[2]];
    let rNoiseInit = [rNoiseInit_0[0] + rNoiseStep * cos(posAngInit), rNoiseInit_0[1] + rNoiseStep * sin(posAngInit), rNoiseInit_0[2]];
    let posRNoiseInit = [posRNoiseInit_0[0] + posRNoiseStep * cos(posAngInit), posRNoiseInit_0[1] + posRNoiseStep * sin(posAngInit), posRNoiseInit_0[2]];
    
    

    _aryRing[i] = new Ring(posR, posAngInit, posAngNoiseInit, posAngNoiseThetaInit, posAngNoiseSpeed, rNoiseInit, rNoiseThetaInit, rNoiseSpeed, posRNoiseInit, posRNoiseThetaInit, posRNoiseSpeed, _palette0);
  }

  _aryRotate = [[random(2*PI), random(0.01)], [random(2*PI), random(0.01)], [random(2*PI), random(0.01)]];
}

class Ring {

setAryCol() {
    this.aryCol = [];
    for (let i = 0; i < this.palette.length; i++) {
      this.aryCol[i] = color("#" + this.palette[i]);
      
    }
  }
  
setNumCol() {
    this.NumCol = this.palette.length;
}
  
setPalette(palette) {
    this.palette = palette;
  }
  
  constructor(posR, posAngInit, posAngNoiseInit, posAngNoiseThetaInit, posAngNoiseSpeed, rNoiseInit, rNoiseThetaInit, rNoiseSpeed, posRNoiseInit, posRNoiseThetaInit, posRNoiseSpeed, palette) {
    this.test = 10;
    
    this.posR = posR;
    this.posAngInit = posAngInit;
    this.posAngNoiseInit = posAngNoiseInit;
    this.posAngNoiseThetaInit = posAngNoiseThetaInit;
    this.rNoiseInit = rNoiseInit;
    this.rNoiseThetaInit = rNoiseThetaInit;
    this.posRNoiseInit = posRNoiseInit;
    this.posRNoiseThetaInit = posRNoiseThetaInit;
    
    this.posAngNoiseSpeed = posAngNoiseSpeed;
    this.posAngMax = 2*PI / 8/1.65;
    this.posAngMin = -this.posAngMax;
    this.posAngGap = this.posAngMax - this.posAngMin;
    this.posAngNoiseFreq = 4;
    
    this.rNoiseSpeed = rNoiseSpeed;
    this.rMax = this.posR / 2;
    this.rMin = this.rMax / 10;
    this.rGap = this.rMax - this.rMin;
    this.rNoiseFreq = 4;

    this.posRNoiseSpeed = posRNoiseSpeed;
    this.posRMax = this.posR;
    this.posRMin = this.posRMax * 0.75;//0.5;
    this.posRGap = this.posRMax - this.posRMin;
    this.posRNoiseFreq = 4;

    this.colNoiseFreq = 3;

    this.rotZ = random(2*PI);

    this.palette = palette;
    
    this.aryCol = [];
    for (let i = 0; i < this.palette.length; i++) {
      this.aryCol[i] = color("#" + this.palette[i]);
    }

    //this.numCol = 5;
    this.numCol = this.palette.length;
    
    this.selectedColor = this.aryCol[0];

    this.count = 0;
  }

  draw() {
    let posAngNoiseVal = sin(this.posAngNoiseThetaInit + 2*PI * this.posAngNoiseFreq * 
      noise(this.posAngNoiseInit[0], this.posAngNoiseInit[1] + this.posAngNoiseSpeed * this.count, this.posAngNoiseInit[2] + this.posAngNoiseSpeed * this.count)) * 0.5 + 0.5;
    let posAng = this.posAngInit + this.posAngMin + this.posAngGap * posAngNoiseVal;

    let rNoiseVal = sin(this.rNoiseThetaInit + 2*PI * this.rNoiseFreq * 
      noise(this.rNoiseInit[0], this.rNoiseInit[1] + this.rNoiseSpeed * this.count, this.rNoiseInit[2] + this.rNoiseSpeed * this.count)) * 0.5 + 0.5;
    let r = this.rMin + this.rGap * rNoiseVal;

    let posRNoiseVal = sin(this.posRNoiseThetaInit + 2*PI * this.posRNoiseFreq * 
      noise(this.posRNoiseInit[0], this.posRNoiseInit[1] + this.posRNoiseSpeed * this.count, this.posRNoiseInit[2] + this.posRNoiseSpeed * this.count)) * 0.5 + 0.5;
    let posRNew = this.posRMin + this.posRGap * posRNoiseVal;

    let colNoiseVal = sin(this.posRNoiseThetaInit + 2*PI * this.colNoiseFreq * 
      noise(this.posRNoiseInit[0] + 1000, this.posRNoiseInit[1] + this.posRNoiseSpeed * this.count + 1000, this.posRNoiseInit[2] + this.posRNoiseSpeed * this.count) + 1000) * 0.5 + 0.5;
      
    let palette2 = ["e32400","CED3DC","1E3223","42644A","533220","9A917C", "7EBC89"];
    
    
    //this.palette = _palette0;
    //this.palette = ["e32400","CED3DC","1E3223","42644A"];
    this.aryCol = [];
    for (let i = 0; i < this.palette.length; i++) {
      this.aryCol[i] = color("#" + this.palette[i]);}
      
    this.numCol = this.palette.length;
    let col_i1 = int(colNoiseVal * this.numCol);
    let col_i2 = (col_i1 + 1) % this.numCol;
    let colAmp = (colNoiseVal - col_i1 / this.numCol) * this.numCol;
    
    //let col = this.aryCol[2];
    //let col = lerpColor(this.aryCol[col_i1], this.aryCol[col_i2], colAmp);
    /*
    let randomIndex = Math.floor(Math.random() * this.aryCol.length);
    let col_i1 = randomIndex;
    randomIndex = Math.floor(Math.random() * this.aryCol.length);
    let colAmp = (colNoiseVal - col_i1 / this.numCol) * this.numCol;
    //console.log(randomInt);
    let col_i2 = randomIndex;*/
    
    
    let col = lerpColor(this.aryCol[col_i1],this.aryCol[col_i2], colAmp);

    push();
    stroke(col);
    rotateX(PI/2);
    rotateY(posAng);
    translate(posRNew, 0, 0);
    rotateZ(this.rotZ);
    ellipse(0, 0, r, r, 36);
    pop();

    this.count++;
    
    push();
    fill(this.selectedColor); // Red fill color
    noStroke();
    translate(0,0); // Position the circle at the top-left c  orner
    sphere(10); // Draw a red circle
    pop();
  }
}



function draw() {


  ortho(-width/2, width/2, -height/2, height/2, -_maxW*2, _maxW*4);
  background(90 / 100 * 255);

  rotateX(_aryRotate[0][0] + _aryRotate[0][1] * frameCount);
  rotateY(_aryRotate[1][0] + _aryRotate[1][1] * frameCount);
  rotateZ(_aryRotate[2][0] + _aryRotate[2][1] * frameCount);
  
  rotateX(PI/4);
  

  for (let i = 0; i < _aryRing.length; i++) {
    _aryRing[i].draw();
  }
  
  
}

