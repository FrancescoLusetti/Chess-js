var Chess = function(T,C){
  this.type = T;
  this.color = C;
  //TYPE ki=king,q=queen,r=rook,b=bishop,kn=knight,p=pawn
  //COLOR w=white,b=black
  this.getType = function() {return this.type;}
  this.getColor = function() {return this.color;}

}

function Game(){
  this.turn = 'b';
  this.phase = false;
  //false=first click; false=second click
  //tabella 8*8

  this.tableButtonPLay = '<button style="{z_z_z}" onclick="clickButton({y_y_y})" ><img src="xy"></button>';
  this.HTMLelement = {
    row: "<tr>",
    rowE: "</tr>",
    col: "<td>",
    colE: "</td>",
  };
//ci vanno i source png in questa matrice
  this.png = {

  };

  this.getDim = function () {
    return 8;
  }

  this.init = function () {
    this.playGround = new Array(8);
    for(let i = 0; i < this.getDim(), i++) this.playGround[i] = new Array (8);
    this.iniRow(this.playGround[0], false, 'b');
    this.iniRow(this.playGround[1], true 'b');
    this.iniRow(this.playGround[6], true, 'w');
    this.iniRow(this.playGround[7], false, 'w');
    for(let i = 2; i < 6; i++) this.playGround[i].fill(NULL);
  }

  this.iniRow = function (row, T, C) {
    //T: true=row of pawn, false= row of every else;

    if(T){
      for(let i = 0 ; i < this.getDim() ; i++) row[i]= new Chess('p', C);
    }
    else{
      row[0] = new Chess(r,C);
      row[1] = new Chess(kn, C);
      row[2] = new Chess(b,C);
      row[3] = new Chess(q,C);
      row[4] = new Chess(ki,C);
      row[5] = new Chess(b,C);
      row[6] = new Chess(kn,C);
      row[7] = new Chess(r,C);
    }
  }
  this.createPlayGroundHtml{
    for(let i = 0; i < this.getDim; i++){

    }




  }





  this.ableGoing = function (X,Y){

  }


  this.play = function (X, Y) {
    if(this.phase){
      if(this.playGround[X][Y] == NULL) alert("Non c'é niente in questa casella");
      else{
        if(this.playGround[X][Y].getColor!=this.turn){
          if(this.turn='b') alert("É il turno dei neri");
          else alert("É il turno dei bianchi");
        }
        else{
          phase=true;
          
        }
      }
    }


  }


}

function startGame(){


}



a=0;




window.onload = startGame(false);
