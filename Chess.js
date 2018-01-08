var Chess = function(T,C,I){
  this.type = T;
  this.color = C;
  this.img = I;
  //TYPE ki=king,q=queen,r=rook,b=bishop,kn=knight,p=pawn
  //COLOR w=white,b=black
  this.getType = function() {return this.type;}
  this.getColor = function() {return this.color;}
  this.getImg = function () {return this.img;}
}

var Game = function(){
  this.turn = 'b';
  this.phase = false;
  //false=first click; false=second click
  this.tableId = "TableGame";

  this.remPos = new Array(-1, -1);
  //tabella 8*8

  this.tableButtonPLay = '<input type="image" id="{z_z_z}" src="{x_x_x}" alt="{t_t_t}" onclick="{y_y_y}" width="50" height="50">';
  this.HTMLelement = {
    row: "<tr>",
    rowE: "</tr>",
    col: '<td class="{z_z_z}">',
    colE: "</td>",
  };
//ci vanno i source png in questa matrice
  this.png = {
    bb: "/img/blackBishop.png",
    bki: "/img/blackKing.png",
    bkn: "/img/blackKnight.png",
    bp: "/img/blackPawn.png",
    bq: "/img/blackQueen.png",
    br: "/img/blackRook.png",
    wb: "/img/whiteBishop.png",
    wki: "/img/whiteKing.png",
    wkn: "/img/whiteKnight.png",
    wp: "/img/whiteKnight.png",
    wq: "/img/whiteQueen.png",
    wr: "/img/whiteRook.png"
  };

  this.getDim = function () {
    return 8;
  }

  this.init = function () {
    this.playGround = new Array(8);
    for(var i = 0; i < this.getDim(); i++) this.playGround[i] = new Array(this.getDim());
    this.iniRow(this.playGround[0], false, 'b');
    this.iniRow(this.playGround[1], true, 'b');
    this.iniRow(this.playGround[6], true, 'w');
    this.iniRow(this.playGround[7], false, 'w');
    for (var i = 2; i < 6; i++) {
      this.playGround[i].fill(-1);
    }
    this.createPlayGroundHtml();
  }


  this.iniRow = function (row, T, C) {
    //T: true=row of pawn, false= row of every else;
    if(T){
      if(C=="b") for(var i = 0 ; i < this.getDim() ; i++) row[i]= new Chess('p', C, this.png.bp);
      else for(var i = 0 ; i < this.getDim() ; i++) row[i]= new Chess('p', C, this.png.wp);
    }
    else{
      if(C=="b"){
        //TYPE ki=king,q=queen,r=rook,b=bishop,kn=knight,p=pawn
        row[0] = new Chess('r',C ,this.png.br);
        row[1] = new Chess('kn', C ,this.png.bkn);
        row[2] = new Chess('b',C ,this.png.bb);
        row[3] = new Chess('q', C ,this.png.bq);
        row[4] = new Chess('ki',C,this.png.bki);
        row[5] = new Chess('b',C,this.png.bb);
        row[6] = new Chess('kn',C,this.png.bkn);
        row[7] = new Chess('r',C,this.png.br);
      }
      else{
        row[0] = new Chess('r',C,this.png.wr);
        row[1] = new Chess('kn', C,this.png.wkn);
        row[2] = new Chess('b',C,this.png.wb);
        row[3] = new Chess('q',C,this.png.wq);
        row[4] = new Chess('ki',C,this.png.wki);
        row[5] = new Chess('b',C,this.png.wb);
        row[6] = new Chess('kn',C,this.png.wkn);
        row[7] = new Chess('r',C,this.png.wr);
      }
    }
  }

  this.getButton = function (X,Y) {
    if(this.playGround[X][Y]==-1) return this.tableButtonPLay.replace("{z_z_z}", ""+X+Y).replace("{x_x_x}", "").replace("{t_t_t}", "").replace("{y_y_y}", "board.play("+X+","+Y+")");
    else return this.tableButtonPLay.replace("{z_z_z}", ""+X+Y).replace("{x_x_x}", this.playGround[X][Y].getImg).replace("{t_t_t}", this.playGround[X][Y].getType).replace("{y_y_y}", "board.play("+X+","+Y+")");
  }


  this.createPlayGroundHtml = function() {
    var tableString="";
    for (var i = 0; i < this.getDim(); i++){
      tableString += this.HTMLelement.row;
      for(var j = 0; j < this.getDim(); j++){
        if((i%2==0 && j%2==0) || (i%2==1 && j%2==1))
          tableString+=this.HTMLelement.col.replace("{z_z_z}","white")+this.getButton(i,j)+this.HTMLelement.colE;
        else
          tableString+=this.HTMLelement.col.replace("{z_z_z}","black")+this.getButton(i,j)+this.HTMLelement.colE;
    }
        tableString+=this.HTMLelement.colE;
  }

  document.getElementById(this.tableId).innerHTML = tableString;
  }



  this.ableGoing = function (X,Y){

  }


  this.play = function (X, Y) {
    if(this.phase){
      if(this.playGround[X][Y] == -1) alert("Non c'é niente in questa casella");
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
  board = new Game();
  board.init();
}



a=0;




window.onload = startGame(false);
