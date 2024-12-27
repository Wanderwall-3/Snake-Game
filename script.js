const canvas=document.getElementById("gameCanvas");
const ctx=canvas.getContext("2d");
ctx.gridSize=20;
ctx.width=canvas.width;
ctx.height=canvas.height;

sco=document.getElementById("score");

let snake=[{x:80,y:80}];
let apple={x:120,y:120};
let direction={x:0,y:0};
let score=0;
let isGameOver=false;
let gameLoopInterval;
let snakeSpeed=200;

function drawRect(x,y,color){
    ctx.fillStyle=color;
    ctx.fillRect(x,y,ctx.gridSize,ctx.gridSize);
}

function drawSnake(){
    snake.forEach((arr)=>{drawRect(arr.x,arr.y,"lime")});
}

function drawFood(){
    drawRect(apple.x,apple.y,"red");
}

function updateSnake(head){
    // const head={x:snake[0].x+direction.x*ctx.gridSize,y:snake[0].y+direction.y*ctx.gridSize};
    snake.unshift(head);
    snake.pop();
    drawSnake();
    // ctx.clearRect(x,y,ctx.gridSize,ctx.gridSize);
}

function gameLoop(){

    const head={x:snake[0].x+direction.x*ctx.gridSize,y:snake[0].y+direction.y*ctx.gridSize};
    // snake.unshift(head);
    ctx.clearRect(0,0,ctx.width,ctx.height);
    updateSnake(head);
    // drawSnake();
    drawFood();      //Hidden fruit.
    for(let i=1;i<snake.length;i++){
        if(snake[0].x===snake[i].x && snake[0].y===snake[i].y){
            isGameOver=true;
        }
    }
    if(snake[0].x<0||snake[0].x>=ctx.width||snake[0].y<0||snake[0].y>=ctx.height){
        isGameOver=true;
    }
    
    if(head.x===apple.x && head.y===apple.y){
        score++;
        sco.innerHTML=`Score: ${score}`;
        ctx.clearRect(apple.x,apple.y,apple.x,apple.y);
        snake.unshift({x:apple.x,y:apple.y});
        
        apple.x=Math.floor(Math.random()*ctx.width/ctx.gridSize)*ctx.gridSize;
        apple.y=Math.floor(Math.random()*ctx.height/ctx.gridSize)*ctx.gridSize;      
        
        drawFood();
    }

    if(isGameOver){

        clearInterval(gameLoopInterval);
        alert(`Oops!, game is over \n Your score is ${score}`);
        restartGame();
        return;
    }

    // ctx.clearRect(0,0,ctx.width,ctx.height);
}

function changeDirection(event){
    switch(event.key){
        case "ArrowUp":
            direction={x:0,y:-1};
            break;
        case "ArrowDown":
            direction={x:0,y:1};
            break;
        case "ArrowLeft":
            direction={x:-1,y:0};
            break;
        case "ArrowRight":
            direction={x:1,y:0};
            break;
    }
}

function restartGame(){
    ctx.clearRect(0,0,ctx.width,ctx.height);
    snake=[{x:80,y:80}];
    apple={x:120,y:120};
    direction={x:0,y:0};
    score=0;
    sco.innerHtml=`Score: ${score}`;
    isGameOver=false;
    drawSnake();
    drawFood();
    gameLoopInterval=setInterval(gameLoop,snakeSpeed);

}

document.addEventListener("keydown",changeDirection);
restartGame();
