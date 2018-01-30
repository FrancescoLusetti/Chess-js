var Chess = function(T,C,I){
  this.type = T;
  this.color = C;
  this.img = I;
  //TYPE ki=king,q=queen,r=rook,b=bishop,kn=knight,p=pawn
  //COLOR w=white,b=black
  this.getType = function() {return this.type;}
  this.getColor = function() {return this.color;}
  this.getImg = function () {return this.img;}

  this.setType = function(nX) {this.type = nX;}
  this.setColor = function(xX) {this.color = nX;}
  this.setImg = function (Nx) {this.img = nX;}

}

var Game = function(){
  this.turn = 'b';
  this.phase = false;
  //false=first click; false=second click
  this.tableId = "TableGame";

  this.remPos = new Array(-1, -1);
  //tabella 8*8

  this.tableButtonPLay = '<input type="image" src="{x_x_x}" alt="{t_t_t}" onclick="{y_y_y}" width="64" height="64">';
  this.HTMLelement = {
    row: "<tr>",
    rowE: "</tr>",
    col: '<td class="{z_z_z}" id="{y_y_y}">',
    colE: "</td>",
  };
//ci vanno i source png in questa matrice
  this.png = {
    bb: "./img/bb.png",
    bki: "./img/bki.png",
    bkn: "./img/bkn.png",
    bp: "./img/bp.png",
    bq: "./img/bq.png",
    br: "./img/br.png",
    wb: "./img/wb.png",
    wki: "./img/wki.png",
    wkn: "./img/wkn.png",
    wp: "./img/wp.png",
    wq: "./img/wq.png",
    wr: "./img/wr.png"
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
        row[0] = new Chess('r',C , this.png.br );
        row[1] = new Chess('kn', C , this.png.bkn );
        row[2] = new Chess('b',C , this.png.bb );
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
    if(this.playGround[X][Y]==-1) return this.tableButtonPLay.replace("{x_x_x}", "").replace("{t_t_t}", "").replace("{y_y_y}", "board.play("+X+","+Y+")");
    else return this.tableButtonPLay.replace("{x_x_x}", this.playGround[X][Y].getImg()).replace("{t_t_t}", this.playGround[X][Y].getType()).replace("{y_y_y}", "board.play("+X+","+Y+")");
  }


  this.createPlayGroundHtml = function() {
    var tableString="";
    for (var i = 0; i < this.getDim(); i++){
      tableString += this.HTMLelement.row;
      for(var j = 0; j < this.getDim(); j++){
        if((i%2==0 && j%2==0) || (i%2==1 && j%2==1))
          tableString+=this.HTMLelement.col.replace("{z_z_z}","white").replace("{y_y_y}", ""+i+j)+this.getButton(i,j)+this.HTMLelement.colE;
        else
          tableString+=this.HTMLelement.col.replace("{z_z_z}","black").replace("{y_y_y}", ""+i+j)+this.getButton(i,j)+this.HTMLelement.colE;
    }
        tableString+=this.HTMLelement.colE;
  }

  document.getElementById(this.tableId).innerHTML = tableString;
  }



  this.ableGoing = function (X,Y){
    switch (this.playGround[this.remPos[0]][this.remPos[1]].getType()) {
      case "p":
          if(this.turn=='n'){
            if(this.remPos[0]==X && (this.remPos[1]==(Y+2)||this.remPos[1]==(Y+1))) return true;
          }

        break;
      default: return true;
    }
  }

  this.changePos = function (X,Y) {
    this.playGround[X][Y] = this.playGround[this.remPos[0]][this.remPos[1]];
    this.playGround[this.remPos[0]][this.remPos[1]] = -1;
    document.getElementById(""+X+Y).innerHTML = this.getButton(X,Y);
    document.getElementById(""+this.remPos[0]+this.remPos[1]).innerHTML = this.getButton(this.remPos[0],this.remPos[1]);
  }


  this.play = function (X, Y) {
    if(this.phase == false){
      if(this.playGround[X][Y] == -1) alert("Non c'é niente in questa casella");
      else{
        if(this.playGround[X][Y].getColor()!=this.turn){
          if(this.turn == 'b' ) alert("É il turno dei neri");
          else alert("É il turno dei bianchi");
        }
        else{
          this.phase=true;
          this.remPos[0]=X;
          this.remPos[1]=Y;
        }
      }
    }
    else{
      if(this.ableGoing(X,Y)){
        this.phase=false;
        if(this.turn == 'b') this.turn='w';
        else this.turn='b';
        this.changePos(X,Y);
        this.remPos[0]=-1;
        this.remPos[1]=-1;
      }
      alert("Non puoi andare qua");
    }


  }


}

function startGame(){
  board = new Game();
  board.init();
}



a=0;




window.onload = startGame(false);
