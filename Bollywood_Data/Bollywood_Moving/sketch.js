function preload(){
  // data = loadJSON("dataC.json")
  // data = loadJSON("dataC_smooth.json")
  data = loadJSON("dataC_smoother.json")
}

function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
  genreArray = 
    ["action",
     "comedy",
     "drama",
     "love_story",
     "rom__com",
     "thriller",
    ]
}
let x = 0;
let yearTracker = 0;

function draw() {
  background(221,236,246);
  credits();

  
  
  // limits
  minRadius = width*0.04;
  maxRadius = width*0.14;
  minPetals = 4;
  maxPetals = 30;  
  minPetalWidth = height*0.006;
  maxPetalWidth = height*0.010;
  minPF = -0.65;
  maxPF = 1.2;
  LtoPnum = floor(minPetals+(0-minPF)/(maxPF-minPF)*(maxPetals-minPetals)) //numPetal where it is transitions from loss to profit
  minBudget = 220000000;
  maxBudget = 8908500000;
  smoothness = 61; // Use 11 for dataC_smooth and 61 for dataC_smoother
  numGenres = 6
  j1 = floor(x)
  j = j1+yearTracker*smoothness*numGenres;
  // console.log(j1,j)
  
    
  ////SunPetals(numPetal,radius,angle,petal_width,nowColor,origin_x,origin_y)
  ////values=[rating, radius, numPetal, petalWidth, angle, genre]  
  
  rectMode(RADIUS);
  //genre 1 action
  origin_x = width*0.20;
  origin_y = height*0.25;
  nowColor1 = color(255, 0, 0, 100); //red
  values = getValues(smoothness*0);
  SunPetals(values[2],values[1],values[4],values[3],nowColor1,origin_x,origin_y,"sword");
  // SunPetals(maxPetals,maxRadius,360/maxPetals,minPetalWidth,nowColor1,origin_x,origin_y); // max size -testing

  //genre 2 comedy
  origin_x = width*0.50;
  origin_y = height*0.25;
  nowColor2 = color(255,255,0,100); //yellow
  values = getValues(smoothness*1);
  SunPetals(values[2],values[1],values[4],values[3],nowColor2,origin_x,origin_y);
  
  //genre 3 drama
  origin_x = width*0.80;
  origin_y = height*0.25;
  nowColor3 = color(0, 255, 0, 100); //green
  values = getValues(smoothness*2);
  SunPetals(values[2],values[1],values[4],values[3],nowColor3,origin_x,origin_y);
  
  //genre 4 love_story
  origin_x = width*0.20;
  origin_y = height*0.63;
  nowColor4 = color(219, 35, 164, 100); //pink
  values = getValuesHeart(smoothness*3);
  SunPetals(values[2],values[1],values[4],values[3],nowColor4,origin_x,origin_y,"heart");
  
  //genre 5 rom__com
  origin_x = width*0.50;
  origin_y = height*0.63;
  nowColor5 = color(29, 247, 247, 100); //bluish
  values = getValuesHeart(smoothness*4);
  SunPetals(values[2],values[1],values[4],values[3],nowColor5,origin_x,origin_y,"heart");
  // SunPetals(maxPetals,maxRadius,360/maxPetals,minPetalWidth,nowColor5,origin_x,origin_y,"heart"); //max size
  
  //genre 6 thriller
  origin_x = width*0.80;
  origin_y = height*0.63;
  nowColor6 = color(239, 151, 19,100); //orange
  values = getValues(smoothness*5);
  SunPetals(values[2],values[1],values[4],values[3],nowColor6,origin_x,origin_y,"chakra");
  // SunPetals(maxPetals,maxRadius,360/maxPetals,minPetalWidth,nowColor1,origin_x,origin_y,"sword"); //max size
  
  
  timeInfo()
  details();
  
  x = x + 0.75;
  if(x>smoothness-1){
    x=0;
    if(yearTracker<=11){
      yearTracker++;  
    }
    else{yearTracker=0;}  
  }
  // testText();
}



function getValues(k){
  PF = data[j+k].PF;
  budget = data[j+k].budget;
  genre = data[j+k].genre;  
  rating = data[j+k].rating
  radius = map(budget,minBudget,maxBudget,minRadius,maxRadius);
  numPetal = map(PF,minPF,maxPF,minPetals,maxPetals);
  numPetal = floor(numPetal);  
  angle = 360/numPetal;
  petalWidth = map(numPetal, minPetals,maxPetals, maxPetalWidth,minPetalWidth);
  return [rating, radius, numPetal, petalWidth, angle, genre];
}

function getValuesHeart(k){
  PF = data[j+k].PF;
  budget = data[j+k].budget;
  genre = data[j+k].genre;  
  rating = data[j+k].rating
  radius = map(budget,minBudget,maxBudget,minRadius,maxRadius);
  numPetal = map(PF,minPF,maxPF,minPetals,maxPetals);
  numPetal = floor(numPetal);  
  angle = 360/numPetal;
  petalWidth = map(numPetal, minPetals,maxPetals, maxPetalWidth,minPetalWidth);
  return [rating, radius, numPetal, petalWidth, angle, genre];
}

function SunPetals(numPetal,radius,angle,petal_width,nowColor,origin_x,origin_y,petalType){
//sunflower like petals to indicate profitability and budget
  translate(origin_x,origin_y)
  fill(255)
  stroke(0)
  strokeWeight(2)
  rect(0,0,maxRadius,maxRadius)
  rect(0,height*0.16,maxRadius,height*0.16-maxRadius)
  fill(nowColor)
  rect(0,height*0.16,maxRadius,height*0.16-maxRadius)
  for(let i=0; i<numPetal; i++){  
    petalColor = nowColor;
    grey = color(130, 123, 123,200);
    grey2 = color(130, 123, 123,50);
    greyAmt = map(numPetal,minPetals,LtoPnum,1,0) // <=LtoPnum petals means it was a loss. So make it greyish
    if(numPetal<=LtoPnum){
      petalColor = lerpColor(nowColor, grey, greyAmt*1.5);
      petalColor = lerpColor(petalColor, grey2, greyAmt*1.5);
    }
    petalstrokeColor = lerpColor(petalColor, color(0,0,0,150), 0.5);
    fill(petalColor);      
    // fill(255, 255, 0, 200);
    stroke(petalstrokeColor);
    strokeWeight(1.5);
    //petal making   
    if(petalType=="sword"){
      beginShape();
      vertex(0,0);
      vertex(radius*3/4,petal_width);
      vertex(radius,0);
      vertex(0,0);
      endShape(CLOSE);     
      beginShape();
      fill(255, 102, 0, 100)
      vertex(0,0);
      vertex(radius,0);
      vertex(radius*3/4,-petal_width);
      vertex(0,0);
      endShape(CLOSE);       
    }
    else if(petalType=="heart"){
      // beginShape(); // hearts - look like hearts but doesn't look good
      // size = 0.85*radius //correction for maximum radius
      // xx=0
      // yy=-size      
      // vertex(xx, yy);
      // bezierVertex(xx - size/2, yy - size/2, xx - size, yy + size/3, xx, yy + size);
      // bezierVertex(xx + size, yy + size/3, xx + size/2, yy - size/2, xx, yy);
      // endShape(CLOSE);   
      
      beginShape();
      vertex(0,0);
      curveVertex(radius*3/4,petal_width);
      vertex(radius,0);
      vertex(0,0);
      endShape(CLOSE);     
      beginShape();
      fill(lerpColor(nowColor,color(255, 255, 0,75),0.3))
      vertex(0,0);
      vertex(radius,0);
      curveVertex(radius*3/4,-petal_width);
      vertex(0,0);
      endShape(CLOSE);        
    }
    else if(petalType=="chakra"){
      beginShape(); //reverse heart - looks awesome lika a chakra
      size = 1.0*radius //correction for maximum radius
      xx=0
      yy=-size *0     
      vertex(xx, yy);
      bezierVertex(xx - size/2, yy - size/2, xx - size, yy + size/3, xx, yy + size);
      // bezierVertex(xx + size, yy + size/3, xx + size/2, yy - size/2, xx, yy); //uncomment for heart but will not look cool
      endShape(CLOSE);                
    }    
    else{
      beginShape();
      vertex(0,0);
      curveVertex(radius*3/4,petal_width);
      vertex(radius,0);
      curveVertex(radius*3/4,-petal_width);
      vertex(0,0);
      endShape(CLOSE);   
      line(0,0,radius*0.8,0)
    }

    rotate(angle); // rotates the coordinate system by said value
  }  
  // central bud using hear shaped petals
  numHeartPetals = 12;
  for(let i=0; i<numHeartPetals; i++){
    petal_width = height*0.003
    brown = color(75, 50, 28, 150);
    //making bud petals brownish
    petalColor = lerpColor(nowColor, brown, 0.8);
    grey = color(130, 123, 123,150);
    grey2 = color(130, 123, 123,50);
    greyAmt = map(numPetal,minPetals,LtoPnum,1,0) // <=LtoPnum petals means it was a loss. So make it greyish
    if(numPetal<=LtoPnum){
      petalColor = lerpColor(petalColor, grey, greyAmt*1.0);
      petalColor = lerpColor(petalColor, grey2, greyAmt*1.0);
    }    
    petalstrokeColor = lerpColor(petalColor, color(0,0,0,50), 0.5);
    fill(petalColor);
    stroke(petalstrokeColor)
    strokeWeight(1);      
    beginShape();
    size = 0.3*radius
    size = map(radius, minRadius, maxRadius, minRadius*0.4, maxRadius*0.2)
    xx=0
    yy=-size      
    vertex(xx, yy);
    bezierVertex(xx - size/2, yy - size/2, xx - size, yy + size/3, xx, yy + size);
    bezierVertex(xx + size, yy + size/3, xx + size/2, yy - size/2, xx, yy);
    endShape(CLOSE);        
    rotate(360/numHeartPetals); // rotates the coordinate system by said value
  }   
  translate(-origin_x,-origin_y)
  //text below flower
  stroke(0);
  strokeWeight(0.0); 
  textAlign(CENTER);
  textSize(height*0.022);
  fill(0) 
  text(values[5],origin_x,origin_y+height*0.17);  
}  

function timeInfo(){
  // year value
  stroke(0);
  strokeWeight(1.0);
  fill(0)  
  textAlign(CENTER);
  textStyle(BOLD);
  textSize(height*0.026);
  curYear = yearTracker+2005;
  // text(curYear, width*0.80, height*0.85);   
  // year slider
  sliderPosX = map(curYear+x/(smoothness-1),2005,2017,width*0.5-width*0.4,width*0.5+width*0.4,true);
  sliderPosY = height*0.458
  rectMode(RADIUS);
  fill(211, 203, 203, 255)
  rect(width*0.50,height*0.453,width*0.40,height*0.003) // slider rail
  rect(width*0.50,height*0.463,width*0.40,height*0.003) // slider rail
  fill(235, 244, 150, 200)
  noStroke();
  rect(sliderPosX,sliderPosY,width*0.040,height*0.015); //slider
  fill(0);
  text(curYear, sliderPosX,sliderPosY+height*0.012);   
  
}

function details(){
  //Legend and information:
  textAlign(CENTER);
  fill(175, 66, 229,150);
  textStyle(BOLDITALIC);
  textSize(height*0.030);
  rectMode(CORNERS);
  stroke(0);
  strokeWeight(2.0);
  rect(width*0.028,height*0.028, width-width*0.028,height*0.09);

  fill(0)
  noStroke();
  text("Bollywood Films Profitability Over The Years", width/2, height*0.07);
  
  origin_y = height*0.86; 
  origin_x = 0; //to reset to left side of the page  
  translate(width*0.08+origin_x*width/5.5, origin_y);   
  fill(255);
  stroke(0);
  strokeWeight(1.0);
  rect(-width*0.02,-height*0.03,width*0.60,height*0.105);
  textAlign(LEFT);
  fill(0)
  noStroke();
  textSize(height*0.022);
  text("Details", 0, 0);
  textSize(height*0.016);
  text("created by", width*0.62, height*0.06);
  textSize(height*0.028);
  text("Nithish K Gnani", width*0.62, height*0.09);
  textStyle(NORMAL);
  textSize(height*0.018);
  text("More & colorful petals --> profit ; Less & discolored petals --> loss", 0, height*0.024);
  text("Bigger Flower --> Higher budget", 0,2*height*0.024);

  text("Genre:", 0,3*height*0.024);
  fill(0)
  text(genreArray[0], width*0.102,3*height*0.024);  
  text(genreArray[1], width*0.252,3*height*0.024);  
  text(genreArray[2], width*0.402,3*height*0.024);   
  text(genreArray[3], width*0.102,4*height*0.024);  
  text(genreArray[4], width*0.252,4*height*0.024);  
  text(genreArray[5], width*0.402,4*height*0.024);      
  // genre color rectangles
  rectMode(CORNER)  
  stroke(0);
  strokeWeight(0.5);
  //1 action
  fill(nowColor1)
  rect(width*0.10,3*height*0.024,-width*0.007, -height*0.014)
  fill(255, 102, 0, 100,75)
  rect(width*0.10-width*0.007,3*height*0.024,-width*0.007, -height*0.014)  
  //2 comedy
  fill(nowColor2)
  rect(width*0.25,3*height*0.024,-width*0.014, -height*0.014)
  //3 drama
  fill(nowColor3)
  rect(width*0.40,3*height*0.024,-width*0.014, -height*0.014)
  //4 love_story
  fill(nowColor4)
  // rect(width*0.10,4*height*0.024,-width*0.014, -height*0.014)
      beginShape();
      size = 0.4*minRadius
      xx=width*0.09
      yy=4*height*0.021      
      vertex(xx, yy);
      bezierVertex(xx - size/2, yy - size/2, xx - size, yy + size/3, xx, yy + size);
      bezierVertex(xx + size, yy + size/3, xx + size/2, yy - size/2, xx, yy);
      endShape(CLOSE);   
  //5 rom__com
  fill(nowColor5)
  // rect(width*0.25,4*height*0.024,-width*0.014, -height*0.014)
      beginShape();
      size = 0.4*minRadius
      xx=width*0.24
      yy=4*height*0.021      
      vertex(xx, yy);
      bezierVertex(xx - size/2, yy - size/2, xx - size, yy + size/3, xx, yy + size);
      bezierVertex(xx + size, yy + size/3, xx + size/2, yy - size/2, xx, yy);
      endShape(CLOSE);    
  //6 thriller
  fill(nowColor6)
  rect(width*0.40,4*height*0.024,-width*0.014, -height*0.014) 
  // fill(50,50,50,75)
  // rect(width*0.40-width*0.007,4*height*0.024,-width*0.007, -height*0.014)  
  
  translate(-(width*0.080+origin_x*width/5.5), -origin_y);
}

function credits() {
  strokeWeight(2);
  noFill();  
  stroke(0)
  rectMode(CORNERS);
  rect(width*0.020,height*0.020, width-width*0.020,height-height*0.020);
  rect(width*0.028,height*0.028, width-width*0.028,height-height*0.028);
  noStroke();
  fill(0);
  textSize(height*0.014);
  textAlign(LEFT);
  text("Source of Data: India in Pixels", 20, height-height*0.005);
  // text("Created by Nithish K Gnani", 20, height-height*0.015);
}

function testText(){
  //Legend and information:
  textAlign(CENTER);
  textStyle(BOLDITALIC);
  textSize(height*0.030);
  stroke(0);
  strokeWeight(0.0);
  fill(0)
  text(2005+yearTracker, width/2, height*0.9);
}