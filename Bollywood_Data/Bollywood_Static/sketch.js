function preload(){
  data = loadJSON("dataA2.json")
  // data = loadJSON("dataA2_rand.json")
  // data = loadJSON("dataA2_Rating.json")
}

function setup() {
  createCanvas(1200, 1200);
  background(255);
  angleMode(DEGREES);
  textAlign(CENTER);
  textFont("Trebuchet MS");
  // console.log(textFont())
}


function draw() {
  // background(255);
  background(221,236,246);
  // strokeWeight(5);
  // noFill();  
  // rectMode(CORNER);
  // rect(10,10,width-10,height,10);

  
  const numSamples = Object.values(data).length;  
  
  /*-->> Legend <<--
  Number of petals determined by profit factor
  Diameter of the flower determined by budget
  Colour depicts the genre
  */  
  flowerDraw()
  credits();
  
  strokeWeight(2);
  noFill();  
  stroke(0)
  rectMode(CORNERS);
  rect(width*0.020,height*0.020, width-width*0.020,height-height*0.050);
  rect(width*0.028,height*0.028, width-width*0.028,height-height*0.058);

}

function flowerDraw(){
  const maxRadius = 0.060*height // flower radius limit  
  let origin_x = 0;
  let origin_y = height*0.180;
  for(let j=0; j<20; j++){
    if(j>0 && (j)%5==0){
      // console.log(j);
      origin_y = origin_y + height/6.5; //to move to next row
      if(j>=20){origin_y = origin_y + height*0.040;}
      origin_x = 0; //to reset to left side of the page
    }
    translate(width*0.140+origin_x*width/5.5, origin_y); //translate origin to center of current flower
    movie_num = j;
    // Getting the data from dataset
    PF = data[movie_num].PF;
    budget = data[movie_num].budget;
    genre = data[movie_num].genre;  
    
    
    
    ratingColor() //color of petal picked based on rating
    // for last 5 genre flowers, color of petal picked based on genre
    if(j>=20){
      genreColor()
    }    
    
    // determining number of petals based on profit factor
    numPetal = map(PF,-1,5,5,28);
    numPetal = floor(numPetal);
    angle = 360/numPetal
    
    // determining the size of flower based on budget
    radius = map(budget, 0,1500000000, height*0.020,maxRadius)
    petal_width = map(numPetal, 5,28, height*0.008,height*0.003);
    
    //draw background rectangle
    rectMode(RADIUS)
    noStroke();
    fill(247, 241, 212,120)
    if(j>=20){fill(112, 176, 216, 60)}
    rect(0,height*0.010,maxRadius+width*0.022,maxRadius+height*0.010)
    
    // Text below the flower
    stroke(0);
    strokeWeight(0.3);
    fill(0)
    textAlign(CENTER);
    textSize(height*0.014);
    text(data[movie_num].name, 0, maxRadius+height*0.010); // name of the movie
    if(j<20){
      textSize(height*0.012);
      text(data[movie_num].rating, maxRadius+width*0.010, -maxRadius+height*0.015); // rating of the movie      
    }

    

    for(let i=0; i<numPetal; i++){
      
      fill(nowColor);
      stroke(nowColorStroke)
      strokeWeight(1);
      //petal making
      if(j<20){
        beginShape();
        vertex(0,0);
        curveVertex(radius*3/4,petal_width);
        vertex(radius,0);
        curveVertex(radius*3/4,-petal_width);
        vertex(0,0);
        endShape(CLOSE);
      }
      else{
        beginShape();
        vertex(0,0);
        curveVertex(radius*1/2,petal_width/2);
        curveVertex(radius*5/8,petal_width);
        curveVertex(radius*7/8,petal_width*1.1);
        vertex(radius+10,0);
        curveVertex(radius*7/8,-petal_width*1.1);
        curveVertex(radius*5/8,-petal_width);
        curveVertex(radius*1/2,-petal_width/2);
        vertex(0,0);
        endShape(CLOSE);
      }
      rotate(angle); // rotates the coordinate system by said value
    }  
    fill(135,97,72,150)
    noStroke()
    ellipse(0,0,radius/5,radius/5)// center circle
    translate(-(width*0.140+origin_x*width/5.5), -origin_y); //reverting the translation
    origin_x++;
  }
  
  //Legend and information:
  textAlign(CENTER);
  fill(175, 66, 229,150);
  textStyle(BOLDITALIC);
  textSize(height*0.030);
  // rectMode(CORNERS);
  rect(width/2, height*0.07-12,width*0.200, height*0.025)
  stroke(0);
  strokeWeight(0.0);
  fill(0)
  text("Bollywood Profitability", width/2, height*0.07);
  
  origin_y = origin_y + height/6.5; //to move to next row
  origin_x = 0; //to reset to left side of the page
  translate(width*0.080+origin_x*width/5.5, origin_y);     
  textAlign(LEFT);
  textSize(height*0.022);
  text("Details", 0, 0);
  text("Nithish K Gnani", width/2+width*0.22, height*0.140);
  textStyle(NORMAL);
  textSize(height*0.018);
  text("Number of petals <-> Profit Ratio", 0, height*0.024);
  text("Size of Flower <-> budget of the movie", 0,2*height*0.024);
  text("Rating:", 0,3*height*0.024);
  rectMode(CORNER)
  fill(0)
  text(" Low", width*0.1,3*height*0.024);  
  text(" Med", width*0.2,3*height*0.024);  
  text(" High", width*0.3,3*height*0.024);   
  
  text("Row1: High budget and high profitability", width/2-width*0.06, height*0.024);
  text("Row2: Low budget yet high profitability", width/2-width*0.06,2*height*0.024);
  text("Row3: High budget but low profitability", width/2-width*0.06,3*height*0.024);
  text("Row4: High rating but low profitability", width/2-width*0.06,4*height*0.024);
  
  fill(255, 0, 0, 100)
  rect(width*0.1,3*height*0.024,-width*0.014, -height*0.014)
  fill(255, 255, 0, 100)
  rect(width*0.2,3*height*0.024,-width*0.014, -height*0.014)
  fill(0, 255, 0, 100)
  rect(width*0.3,3*height*0.024,-width*0.014, -height*0.014)
  
  translate(-(width*0.080+origin_x*width/5.5), -origin_y);
}

function ratingColor(){  
  let Color1 = color(255, 0, 0, 100); //red
  let Color2 = color(255, 255, 0, 100); //yellow
  let Color3 = color(0, 255, 0, 100); //green
  let Color1S = color(255, 0, 0, 125); //red
  let Color2S = color(0,0,0,50);
  let Color3S = color(0, 255, 0, 125); //green
  // // red to green
  // amount = map(data[movie_num].rating, 5.6,9.2, 0,1)
  // nowColor = lerpColor(Color1, Color3, amount)
  
  // red to yellow to green
  if(data[movie_num].rating<7){
    amount = map(data[movie_num].rating, 5.6,7, 0,1)
    nowColor = lerpColor(Color1, Color2, amount);
    nowColorStroke = lerpColor(Color1S, Color2S, amount);
  }
  else{
    amount = map(data[movie_num].rating, 7,9.2, 0,1)
    nowColor = lerpColor(Color2, Color3, amount);
    nowColorStroke = lerpColor(Color2S, Color3S, amount);
  }
}

function genreColor(){
  //color of petal picked based on genre  
  genreArray = 
      ["masala",
       "action",
       "rom__com",
       "love_story",
       "thriller",
       "comedy",
       "drama"
      ]
  if(genre == genreArray[0]){
    nowColor = color(255, 0, 0, 100);
    nowColorStroke = color(255, 0, 0, 200);
  }
  else if(genre == genreArray[1]){
    nowColor = color(255, 0, 255, 100);
    nowColorStroke = color(255, 0, 255, 200);
  }
  else if(genre == genreArray[2]){
    nowColor = color(0, 0, 255, 100);
    nowColorStroke = color(0, 0, 255, 200);
  }
  else if(genre == genreArray[3]){
    nowColor = color(0, 255, 0, 100);
    nowColorStroke = color(0, 255, 0, 200);
  }
  else if(genre == genreArray[4]){
    nowColor = color(255, 255, 0, 100);
    nowColorStroke = color(0,0,0,50);
  }
}

function credits() {
  noStroke();
  fill(0);
  textSize(height*0.014);
  textAlign(LEFT);
  text("Source of Data: India in Pixels", 20, height-height*0.030);
  // text("Created by Nithish K Gnani", 20, height-height*0.015);
}


