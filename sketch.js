const PLAY=1, START=0,END=2;
const Engine = Matter.Engine,
 World = Matter.World,
 Events = Matter.Events,
 Bodies = Matter.Bodies;
 
var plinkos = [];
var divisions=[];
var particle, score=0;
var turn=0;

var gameState=START;

var divisionHeight=300;
var score =0;
var scores=[];


function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);


   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }


    for (var j = 75; j <=width; j=j+50) 
    {
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) 
    {
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) 
    {
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) 
    {
       plinkos.push(new Plinko(j,375));
    }
    for(var i=0; i<10;i++)
    {
      scores[i]=50*(Math.round(random(1,10)));
    }
}
 


function draw() {
  background("white");
  if(gameState===START){
   
    textSize(30);
    fill("blue");
    stroke("aqua");
    strokeWeight(3);
    textAlign(CENTER);
    text("Press S to begin  your Plinko game",width/2,height/2);
  }
  if(gameState===PLAY){
    background("black");
    Engine.update(engine);
    textAlign(LEFT);
    
    

    for(var i=20,j=0; i<560,j<10;i+=80,j++){
      text(scores[j],i,530);
    }
      for (var i = 0; i < plinkos.length; i++) {
        plinkos[i].display();
      }
      /* if(frameCount%60===0){
        particles.push(new Particle(random(width/2-30, width/2+30), 10,10));
        //score++;
      }
      
    textSize(30);
      fill("blue");
      stroke("aqua");
      strokeWeight(3);
      textAlign(CENTER);
      text(mouseX+","+mouseY,mouseX,mouseY);
      */
      fill("yellow");
      line(0,500,width,500);

      if(particle!==null && particle!==undefined){
            particle.display();
            if(particle.body.position.y>500)
            {
              for(var x=85; x<=805;x+=80){
              if(particle.body.position.x<x && particle.body.position.x>(x-80))
              {
                var j=(x-85)/80;
                score+=scores[j];
                  
              }
            }
            particle=null;
              if(turn===5)
              {
                gameState=END;
              }
            }
            
          
          }
          textSize(25);
          fill("white");
          stroke("gray");
          strokeWeight(2);
          text("Score : "+score,20,30);
      for (var k = 0; k < divisions.length; k++) {
        
        divisions[k].display();
      }
    
  }
  if(gameState===END)
  {
    textSize(30);
    fill("blue");
    stroke("aqua");
    strokeWeight(3);
    textAlign(CENTER);
    text("Your score is:"+score,width/2,height/2-50);
    text("Press R to restart  your Plinko game",width/2,height/2);
  }
  
}

function mousePressed()
{
  if(gameState!==END && gameState!==START)
  {
    turn++;
    particle=new Particle(mouseX, 10,10);
  }
}

function keyPressed()
{
  if(keyCode===83)
  {
    gameState=PLAY;
  }
  if(keyCode===82)
  {
    score=0;
    turn=0;
    gameState=START;
  }
}