canvas = document.getElementById("myCanvas");
ctx = canvas.getContext("2d");

var rectangles = []; 
var particles = [];

var leftCount;
var rightCount;


function startGame(){

    rectW = 50;
    rectH = 40;

    rectangles.push(new rectangle(225,0,rectW,rectH));
    rectangles.push(new rectangle(225,50,rectW,rectH));
    rectangles.push(new rectangle(225,100,rectW,rectH));
    rectangles.push(new rectangle(225,150,rectW,rectH));
    rectangles.push(new rectangle(225,200,rectW,rectH));
    rectangles.push(new rectangle(225,250,rectW,rectH));
    rectangles.push(new rectangle(225,300,rectW,rectH));
    rectangles.push(new rectangle(225,350,rectW,rectH));
    rectangles.push(new rectangle(225,400,rectW,rectH));
    rectangles.push(new rectangle(225,450,rectW,rectH));

    for(i=0; i<50; i++){
        particles.push(new component(random(1,230), random(1,479), random(1,2), random(1,2)));
    }
    

    console.log(particles);

    setInterval(updateGameArea, 20);   

}

function rectangle(rectX,rectY,rectWidth,rectHeight){
    this.rectX = rectX;
    this.rectY = rectY;
    this.rectWidth = rectWidth;
    this.rectHeight = rectHeight;
}

function component(x,y,xSpeed,ySpeed){
    this.x = x;
    this.y = y;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.radius = 5;

    this.update = function(){
    
        ctx.beginPath();
        ctx.arc(this.x,this.y,5,0,2 * Math.PI);
        ctx.rect(this.rectX, this.rectY, this.rectWidth, this.rectHeight)
        ctx.fillStyle = '#000000';
        ctx.fill();
        ctx.closePath();
    }

    this.newPos = function(){
        this.x = this.xSpeed + this.x;
        this.y = this.ySpeed + this.y;
    }

    this.detectBoundaryCollision = function(){
        
        if (this.y >= 480 || this.y <= 0){
            this.ySpeed = -this.ySpeed*random(0.95,1.05)
        }
        if (this.x >= 500 || this.x <= 0){
            this.xSpeed = -this.xSpeed*random(0.95,1.05)
        }
    }

    this.detectRectCollision = function(){
    for(i in rectangles){
        rect = rectangles[i];
        //left hand boundary
            if (
                (rect.rectX <= this.x && this.x <=  (rect.rectX + this.radius/2)) &&
                (rect.rectY <= this.y && this.y <=  (rect.rectY + rect.rectHeight)) 
            ){
                this.xSpeed = -this.xSpeed*random(0.95,1.05); 
            } 
            
            //top boundary
            if(
                (rect.rectY + this.radius/2 >= this.y && this.y >=  rect.rectY) &&
                (rect.rectX <= this.x && this.x <=  (rect.rectX + rect.rectWidth)) 
            )
            {
                this.ySpeed = -this.ySpeed*random(0.95,1.05);    
            }
            
            //right hand boundary
            if (
                (rect.rectX + rect.rectWidth >= this.x && this.x >=  (rect.rectX + rect.rectWidth - this.radius/2)) &&
                (rect.rectY <= this.y && this.y <=  (rect.rectY + rect.rectHeight)) 
            ){
                this.xSpeed = -this.xSpeed*random(0.95,1.05);
            } 
            
            //bottom side boundary
            if (
                (rect.rectY + rect.rectHeight - this.radius/2 <= this.y && this.y <=  (rect.rectY + rect.rectHeight)) &&
                (rect.rectX <= this.x && this.x <=  (rect.rectX + rect.rectWidth)) 
            )
            {
                this.ySpeed = -this.ySpeed*random(0.95,1.05);      
            }
        }
    }
}

function random(min, max) {
    var num = Math.random() * (max - min) + min;
    return num;
  }

function updateGameArea(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(0, 0, 500, 500);


    for(var i in rectangles){
        rect = rectangles[i];
        ctx.rect(rect.rectX, rect.rectY, rect.rectWidth, rect.rectHeight);
        ctx.fillStyle = '#000000';
        ctx.fill();
        ctx.closePath();
    }

    for(i in particles){
        particle = particles[i];
        particle.update();
        particle.newPos();
        particle.detectBoundaryCollision();
        particle.detectRectCollision();
    }

    let sumL = particles.reduce((acc, val) => {
        return val.x > 250 ? acc : acc + 1;
      }, 0);

    let sumR = particles.reduce((acc, val) => {
        return val.x < 250 ? acc : acc + 1;
      }, 0);


    ctx.font = "20px Comic Sans MS";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(sumL, 20, 470);
    ctx.fillText(sumR, 470, 470); 


}

startGame();





