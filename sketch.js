var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup;
var score;
var survivalTime;
var Ground; 

function preload(){

  
  monkey_running =        loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,600);
  FoodGroup = new Group();
  obstacleGroup = new Group();
  
  monkey = createSprite(100, 400, 20, 50);
  monkey.addAnimation("RUNNING", monkey_running);
  monkey.scale = 0.2;
  

  
  Ground = createSprite(300, 500, 700, 150);
  Ground.velocityX = -4;
  Ground.x=Ground.width/2;
  console.log(Ground.x);
  
  stroke("white");
  textSize(20);
  fill("white");
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate);
  text("survivalTime: " + survivalTime, 100, 50);
  
  text("Score: "+ score, 500,50);
  score = 0;
}


function draw() {
  background("White");
  
  if (gameState === PLAY){
    if(Ground.velocityX<0){
      Ground.x=Ground.width/2;
  }
    score = score + Math.round(getFrameRate()/60);
  if(keyDown("space")&& monkey.y >= 100) {
      monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY + 0.4;
  
  monkey.collide(Ground);
  
  spawnBananas();
  spawnObstacles();
  
    if(FoodGroup.isTouching(monkey)){
       score = score+1;
       }
    if(obstacleGroup.isTouching(monkey)){
        //monkey.velocityY = -12;
        
        gameState = END;
        
  
    }
  }
  
  else if(gameState === END){
    
    Ground.velocityX = 0;
      monkey.velocityY = 0
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
     
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    
  }
  
  drawSprites();
}
function  spawnBananas(){
  if(frameCount % 60 === 0){
  bana = createSprite(500,270);
  bana.velocityX = -6 
  bana.addImage("banaImage", bananaImage);
  bana.scale = 0.1;
  bana.lifetime = 300;
  FoodGroup.add(bana);

}

}
 function spawnObstacles(){
   if(frameCount % 88 === 0 ){
  obst = createSprite(550,380);
  obst.velocityX = -4 
  obst.addImage("obstacle_Image", obstaceImage);
  obst.scale = 0.3;
  obst.lifetime = 300;
  obstacleGroup.add(obst);
  obst.setCollider("rectangle",0,0,400,350);
   
  }
}