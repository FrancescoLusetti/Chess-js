var Chess = function(T,C,X,Y){
  this.type = T;
  this.color = C;
  this.pos = {
    x : X,
    y : Y
  };
  this.y = Y;
  this.getX = function(){return this.pos.x;}
  this.getY = function(){return this.pos.y;}
  this.setPos = function(nX,nY){this.pos.x = nX; this.pos.y = nY;}
}

function Game(){

  this.gameTable= new array;




  this.init





}

function startGame(){
}



a=0;

window.onload = startGame(false);
