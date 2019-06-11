var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 3;
var dy = -3;
var ibsFace = new Image;
ibsFace.src="img/ibs.png";
var imgSide = 50;

var paddleHeight = 15;
var paddleWidth = 90;
var paddleX = (canvas.width-paddleWidth) / 2;


var rightPressed = false;
var leftPressed = false;

var brickRowCount = 3;
var brickColumnCount = 4;
var brickWidth = 80;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 80;
var lives = 1;


var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

var score = 0;
var name = "";

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
 }

  
function drawBall() {
 //   ctx.beginPath();
 //   ctx.arc(x, y, 10, 0, Math.PI*2);
 //   ctx.fillStyle = "#0095DD";
 //   ctx.fill();
 // ctx.closePath();
  
ctx.drawImage(ibsFace,x,y,imgSide,imgSide);
}
function doWin(){
    var nameApp = name;
    var namelc = name.toLowerCase();
    var hasIbs = false; 
    if(namelc == "ibrahim" || namelc == "ibs" || namelc == "ibbs" || namelc == "ibbi" || namelc == "ibi")
    {
	nameApp = "Happy Birthday "+name+"!!!";
	hasIbs = true; 

    }
    if(nameApp.includes("Ibrahim"))
    {
	hasIbs = true; 
    }
    if(hasIbs){
    alert("The birthday boy always wins!! Happy Birthday Ibbs <3");

    }
    else
    {
alert("YOU WIN, CONGRATULATIONS!");	
    }
    
}
function doLose(){
    var nameApp = name;
    var namelc = name.toLowerCase();
    var hasIbs = false; 
    if(namelc == "ibrahim" || namelc == "ibs" || namelc == "ibbs" || namelc == "ibbi" || namelc == "ibi")
    {
	nameApp = "Happy Birthday "+name+"!!!";
	hasIbs = true; 

    }
    if(nameApp.includes("Ibrahim"))
    {
	hasIbs = true; 
    }
    if(hasIbs){
    alert("The birthday boy always wins!! Happy Birthday Ibbs <3");

    }
    else
    {
alert("Game Over :( ");	
    }
    document.location.reload();
    
}
function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
	    if(bricks[c][r].status==1){
            var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
            var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
		ctx.closePath();
	    }
        }
    }
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}
function drawName(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0099DD";
    var nameApp = name;
    var namelc = name.toLowerCase();
    if(namelc == "ibrahim" || namelc == "ibs" || namelc == "ibbs" || namelc == "ibbi" || namelc == "ibi")
    {
	nameApp = "Happy Birthday "+name+"!!!"; 

    }
    var namel = nameApp.length;
    namel = namel+70;
    var cw = canvas.width/2;
    if(cw - namel < 0)
    {
	cw = canvas.width;
    }
    ctx.fillText(nameApp,cw-namel,20);
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    drawName();
    collisionDetection();
    if(x + dx > canvas.width - imgSide/2 || x + dx < 0) {
	dx = -dx;
    }
    if(y + dy < imgSide/2 ) {
	dy = -dy;
    }
    else if (y+dy > canvas.height - imgSide/2)
    {
	if(x  > paddleX && x+imgSide/2 < paddleX + paddleWidth) {
	    dy = -dy; 
	}
	else
	{
lives--;
if(!lives) {
    doLose();
    
    //clearInterval(interval); // Needed for Chrome to end game
}
else {
    x = canvas.width/2;
    y = canvas.height-30;
    dx = 3;
    dy = -3;
    paddleX = (canvas.width-paddleWidth)/2;
}
	}
    }
    x += dx;
    y += dy;

    if(rightPressed && paddleX < canvas.width - paddleWidth) {
	paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
	paddleX -= 7;
    }
    requestAnimationFrame(draw);
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
	
        paddleX = relativeX - paddleWidth;
	if(paddleX < 0)
	    paddleX = 0;
    }
}


function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
	    if(b.status == 1){
            if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                dy = -dy;
		b.status = 0;
		score++;
		if(score == brickRowCount*brickColumnCount) {
                    doWin();
                        document.location.reload();
                        //clearInterval(interval); // Needed for Chrome to end game
                    }
            }
	    }
        }
    }
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
}

function getName() {
    name = prompt("Hi! Name please: ");
    if (name === "null"){
	name = "Happy Birthday Ibrahim!!, Love Khala<3";
    }
}

getName();
draw();//var interval = setInterval(draw, 10);
