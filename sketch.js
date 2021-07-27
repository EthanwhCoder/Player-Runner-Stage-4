var bgImage,Bground;
var ground;
var player,playerImage;
var coin,coinImage;
var fire, fireImage;
var mango, mangoImage;
var gameState = "play";
var mangosGroup, firesGroup;
var player_collided;
var score = 0;
var restart, restartImg;
var gameOver, gameOverImg;

function preload(){
bgImage = loadImage("BG.jpeg")
playerImage = loadAnimation("Run-1.png","Run-2.png","Run-3.png")
coinImage = loadImage("Golden-Coin.png");
fireImage = loadImage("FIRE-101.png")
mangoImage = loadImage("Maaango.png")
player_collided = loadAnimation("collide.png");
gameOverImg = loadImage("Game_Over.png");
restartImg = loadImage("Restart-1.png");
}

function setup(){
  createCanvas(800, 600);

  Bground = createSprite(500,300);
  Bground.addImage("ground",bgImage);
  Bground.velocityX = -2;

  ground = createSprite(400,590,800,20);
  ground.shapeColor = rgb(109,54,54);
  ground.debug= false;
  
  player = createSprite(50,545,40,20);
  player.addAnimation("Boy",playerImage);
  player.addAnimation("collided",player_collided);
  player.scale= 1.3;
  player.debug= false;
  player.setCollider("rectangle", 0,0,80,100);

  gameOver = createSprite(400,300);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.2;
  
  
  restart = createSprite(400,360);
  restart.addImage(restartImg);
  restart.scale = 0.2;
  
  coinsGroup = new Group();
  mangosGroup = new Group();
  firesGroup = new Group();


}

function draw(){
  background(0)
  //console.log(Bground.x)
  fill("black");
  if(gameState === "play"){

    gameOver.visible = false
    restart.visible = false

    if(Bground.x<300){
      Bground.x=500;
    }     
    
    if(keyDown("space")) {
      player.velocityY = -12;
    }
  
    player.velocityY = player.velocityY + 0.8
  
    if(player.isTouching(mangosGroup)){
      player.scale = 2; 
      //mangosGroup.destroyEach();
    }


    if(player.isTouching(coinsGroup)){
      score = score +1;
      
    }


    if(player.isTouching(firesGroup)){
      gameState = "end";
      player.scale = 1.3;
    }

    spawnCoins();    
    spawnFires();
    spawnMangos();
 

    
  }
 
  else if(gameState === "end"){

    Bground.velocityX = 0;
    player.velocityY = 0;
    mangosGroup.setVelocityXEach(0);
    firesGroup.setVelocityXEach(0);
    
    //change the trex animation
    player.changeAnimation("collided",player_collided);
    
    gameOver.visible = true
    restart.visible = true
    
    if(mousePressedOver(restart)) {
      reset();
    }

  }
  player.collide(ground)
  drawSprites();
  textSize(20)
  text("SCORE IS : " + score, 600,50);

}



function spawnCoins() {
  //write code here to spawn the clouds
  if (frameCount % 200 === 0) {
    coin = createSprite(600,400,40,10);
    coin.y = Math.round(random(200,450));
    coin.addImage(coinImage);
    coin.scale = 0.18;
    coin.velocityX = -3;
    coin.debug= false;
     //assign lifetime to the variable
    coin.lifetime = 200;
    
    //adjust the depth
    //coin.depth = trex.depth;
    //trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    coinsGroup.add(coin);
  }
  
}


function spawnMangos() {
  //write code here to spawn the clouds
  if (frameCount % 400 === 0) {
    mango = createSprite(600,400,40,10);
    mango.y = Math.round(random(400,500));
    mango.addImage(mangoImage);
    mango.scale = 0.08;
    mango.velocityX = -3;
    mango.debug= false;
    
    
     //assign lifetime to the variable
    mango.lifetime = 200;
    
    //adjust the depth
    //coin.depth = trex.depth;
    //trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    mangosGroup.add(mango);
  }
  
}


function spawnFires() {
  //write code here to spawn the clouds
  if (frameCount % 300 === 0) {
    fire = createSprite(600,525,40,10);
    fire.addImage(fireImage);
    fire.scale = 0.3;
    fire.velocityX = -3;
    fire.debug= false;
     //assign lifetime to the variable
    fire.lifetime = 200;
    
    //adjust the depth
    //coin.depth = trex.depth;
    //trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    firesGroup.add(fire);
  }
  
}

function reset(){
  gameState = "play";
  gameOver.visible = false;
  restart.visible = false;
  
  coinsGroup.destroyEach();
  mangosGroup.destroyEach();
  firesGroup.destroyEach();
  
  player.changeAnimation("Boy",playerImage);
   
  score = 0;
  
}

