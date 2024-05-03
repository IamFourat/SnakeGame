const canvas = document.getElementById("game");
    const ctx =  canvas.getContext("2d");
      
    let tileCount = 20;
    let tileSize = canvas.width / tileCount-2;
    let headX = 10;
    let headY = 10;
    let appleX = 5;
    let appleY = 5;
    const snakeParts = [];
    let tailLength = 2;
    class SnakePart {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      }
    }
  
    let xVelocity = 0;
    let yVelocity = 0; 
    let isPaused=false;
      function drawGame(){
      clearScreen();
      changeSnakePosition();
      gameOver();
      checkAppCollision();
      checkWall()
      drawScore();
      drawSnake();
      drawApple();
      if (!isPaused) {
        setTimeout(drawGame, 1000 / 7);
      }
     }
      
      function clearScreen(){
      ctx.fillStyle="black";
      ctx.fillRect(0,0, canvas.width, canvas.height);
     }
  
      function drawSnake(){
      ctx.fillStyle = "orange";
      ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
      ctx.fillStyle = "green";
      for (let i = 0; i < snakeParts.length; i++) { 
      let part = snakeParts[i];
      ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
      }
  
    snakeParts.push(new SnakePart(headX, headY));
      while (snakeParts.length > tailLength) {
      snakeParts.shift();
      }
    }
      
      function changeSnakePosition(){
      headX = headX + xVelocity;
      headY = headY + yVelocity;
      ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
     }
    
    function drawApple(){
     ctx.fillStyle = "red";
     ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
     }
    
     function checkAppCollision(){
      if(appleX === headX && appleY === headY){
      appleX = Math.floor(Math.random() * tileCount);
      appleY = Math.floor(Math.random() * tileCount);
        tailLength++;
      }
    }
    
    function checkWall(){
       if(headY < 0)
        headY = 19;
      if(headY > 19)
        headY = 0;
      if(headX < 0)
        headX = 19;
      if(headX > 19)
        headX = 0;
    }
    
    function drawScore(){
      ctx.fillStyle = "white";
      ctx.font = "20px Verdana";
      ctx.fillText("Score " + (tailLength-2) ,canvas.width-100,40);
      }
      function gameOver() {
        if (xVelocity !== 0 || yVelocity !== 0) {
            for (let i = 0; i < snakeParts.length; i++) {
                let part = snakeParts[i];
                if (headX === part.x && headY === part.y) {
                    isPaused = true;
                    ctx.fillStyle = "white";
                    ctx.font = "40px Verdana";
                    ctx.fillText("Game Over ", 100, 200);
                    document.getElementById("startButton").addEventListener("click", resetGame);
                }
            }
        }
    }
    
   function resetGame() {
    headX = 10;
    headY = 10;
    appleX = 5;
    appleY = 5;
    snakeParts.length = 0;
    tailLength = 2;
    xVelocity = 0;
    yVelocity = 0;
    isPaused = false;
    clearScreen();
    drawGame();
    document.body.removeEventListener("keydown", keyDown);
    document.body.addEventListener("keydown", keyDown);
}
    
  
  document.body.addEventListener( "keydown", keyDown);
    
    function keyDown(event){
    if(event.keyCode == 38){
      if(yVelocity == 1)
        return; 
    yVelocity = -1;
    xVelocity = 0;
     } 
  
    if(event.keyCode == 40){
       if(yVelocity == -1)
         return;
    yVelocity = 1;
    xVelocity = 0;
     }
  
    if(event.keyCode == 37){
      if(xVelocity == 1)
         return;
    yVelocity = 0;
    xVelocity = -1;
     }
  
    if(event.keyCode == 39){
       if(xVelocity == -1)
         return;
    yVelocity = 0;
    xVelocity = 1;
     }  
  }
  document.addEventListener("DOMContentLoaded", function() {

    resetGame();
    drawGame();
  });
    