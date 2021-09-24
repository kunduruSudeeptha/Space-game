var space,spaceImg
var rocket,rocketImg
var Play=1
var End=0
var gameState=Play
var gameOver
var starsCollection=0
var spaceSound

function preload(){
  spaceImg=loadImage("SPACE.jpg")
  rocketImg=loadImage("rocket.jpg")
  astroidsImg=loadImage("astroid.png")
  starImg=loadImage("star.png")
  gameOverImg=loadImage("gameOver.png")
  spaceSound=loadSound("space_sound.ogg")
}

function setup(){
  createCanvas(windowWidth,windowHeight)

  space=createSprite(300,300,10,3)
  space.addImage("space1",spaceImg)
  space.scale=0.7
  space.velocityY=2

  rocket=createSprite(100,500,50,50)
  rocket.addImage("rocket1",rocketImg)
  rocket.scale=0.3

  gameOver=createSprite(width/3,height/2-70);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.08;

  gameOver.visible=false;

  astroidsG=new Group()
  starsG=new Group()
}

function draw(){

  background("white")
  if (gameState===Play){

  if (space.y>400){
    space.y=300
  }

  spaceSound.play()

  if (keyDown("left_arrow")){
    rocket.x=rocket.x-3
  }
  if (keyDown("right_arrow")){
    rocket.x=rocket.x+3
  }
  if (keyDown("space")){
    rocket.velocityY=-5
  }
  if (starsG.isTouching(rocket)) {
    starsG.destroyEach();
    starsCollection=starsCollection+1
  }
  if(astroidsG.isTouching(rocket) || rocket.y>600){
  rocket.destroy();
    
   gameState=End
   }
  }
  else if(gameState===End){
    gameOver.visible=true
    
    astroidsG.destroyEach();
    starsG.destroyEach();

    space.velocityY=0

  }
  rocket.velocityY=rocket.velocityY+0.8

  drawSprites()
  spawnAstroids()
  spawnStars()
  textSize(25)
  fill(255)
  text("Stars: "+ starsCollection,10,30)
}

function spawnAstroids(){
  if (frameCount%150===0){
  var astroids=createSprite(200,-50)
  astroids.x=Math.round(random(120,600))
  astroids.addImage(astroidsImg)
  astroids.velocityY=2
  astroids.lifetime=800
  astroids.scale=0.1
  astroidsG.add(astroids)

  rocket.depth=astroids.depth
  astroids.depth+=1
  }
}

function  spawnStars(){
  if (frameCount%150===0){
  var stars=createSprite(200,10)
  stars.x=Math.round(random(20,400))
  stars.addImage(starImg)
  stars.velocityY=2
  stars.lifetime=800
  stars.scale=0.02
  starsG.add(stars)
  }
}