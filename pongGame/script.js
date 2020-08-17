let canvas = document.querySelector('canvas')
canvas.width = 800;
canvas.height = 400;
var ctx = canvas.getContext('2d')

// ------------------------------------------------------------------
function init() {
    document.getElementById("play").setAttribute('disabled', true)
    const game = new Game()
}
// ------------------------------------------------------------------
function draw(x, y, width, height, color = 'black') {
    if (canvas.getContext) {
        ctx.fillStyle = color
        ctx.fillRect(x, y, width, height)
    }
}
function erase(x, y, width, height) {
    if (canvas.getContext) {
        ctx.clearRect(x, y, width, height);
    }
}
// ------------------------------------------------------------------
class Ball {
    constructor(x, y, width, height, speed, horizontalDirection, verticalDirection) {
        this.x = x
        this.y = y()
        this.width = width
        this.height = height
        this.speed = speed
        this.horizontalDirection = horizontalDirection
        this.verticalDirection = verticalDirection
        this.drawBall()
    }
    drawBall() {
        draw(this.x, this.y, this.width, this.height)
    }
}
// ------------------------------------------------------------------
class Paddle {
    constructor(x, y, width, height, speed) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.speed = speed
        this.drawPaddle()
    }
    drawPaddle() {
        draw(this.x, this.y, this.width, this.height)
    }
    movePaddleUp() {
        if (this.y - this.speed >= 0) { // collision with ceiling
            erase(this.x, this.y, this.width, this.height)
            this.y = this.y - this.speed
            draw(this.x, this.y, this.width, this.height)
        }
    }
    movePaddleDown() {
        if (this.y + this.speed <= 350) { // collision with floor
            erase(this.x, this.y, this.width, this.height)
            this.y = this.y + this.speed
            draw(this.x, this.y, this.width, this.height)
        }
    }
}
// ------------------------------------------------------------------
let player = new Paddle(20, 180, 10, 50, 10)
let computer = new Paddle(770, 180, 10, 50, 10)
// ------------------------------------------------------------------
function Game() {
    let rounds = 3
    let computerScore = 0
    let playerScore = 0
    document.getElementById("playerScore").innerText = playerScore
    document.getElementById("computerScore").innerText = computerScore
    //-------------------------
    function randomInt(min, max) {
        return min + Math.floor((max - min) * Math.random());
    }
    //--------------------------

    // Player Paddle Movement
    document.addEventListener('keydown', getKey)
    function getKey() {
        const key = event.keyCode;
        if (key == 38) {
            player.movePaddleUp()
        }
        if (key == 40) {
            player.movePaddleDown()
        }
    }

    // ------------------------------------------

    function newBall() {
        const ball = new Ball(390, () => {
            let ballY = randomInt(100, 301)
            ballY = ballY - ballY % 10
            return ballY
        }, 10, 10, 10, randomInt(0, 2), randomInt(0, 2))

        // ------------------------------------------

        function ballMove() {
            erase(ball.x, ball.y, ball.width, ball.height)

            if (ball.y <= 0) { //collision with ceiling
                ball.verticalDirection = 1
            }
            if (ball.y >= 390) { //collision with floor
                ball.verticalDirection = 0
            }
            if (ball.x <= 0) {  //computer goal 
                clearInterval(ballLooping)
                clearInterval(computerLooping)
                computerScore++
                document.getElementById("computerScore").innerText = computerScore
                if (computerScore == rounds) {
                    document.getElementById("play").removeAttribute('disabled', true)
                }else{
                    newBall()
                }
            }
            if (ball.x >= 790) {  //player goal 
                clearInterval(ballLooping)
                clearInterval(computerLooping)
                playerScore++
                document.getElementById("playerScore").innerText = playerScore
                if (playerScore == rounds) {
                    document.getElementById("play").removeAttribute('disabled', true)
                }else{
                    newBall()
                }
            }

            if (ball.x - ball.speed < player.x + player.width &&  // player paddle colision
                ball.x + ball.width - ball.speed > player.x &&
                ball.y - ball.speed < player.y + player.height &&
                ball.y + ball.height - ball.speed > player.y) {
                ball.horizontalDirection = 1
            }
            if (ball.x + ball.speed < computer.x + computer.width &&  // computer paddle colision
                ball.x + ball.width + ball.speed > computer.x &&
                ball.y + ball.speed < computer.y + computer.height &&
                ball.y + ball.height + ball.speed > computer.y) {
                ball.horizontalDirection = 0
            }

            if (ball.horizontalDirection == 1) {
                ball.x = ball.x + ball.speed
            } else {
                ball.x = ball.x - ball.speed
            }
            if (ball.verticalDirection == 1) {
                ball.y = ball.y + ball.speed
            } else {
                ball.y = ball.y - ball.speed
            }

            draw(ball.x, ball.y, ball.width, ball.height)
        }
        let ballLooping = setInterval(() => { ballMove() }, 80);

        // Computer Paddle Movement
        function paddleAutoMove() {
            if (ball.y <= computer.y) {
                computer.movePaddleUp()
            } else {
                computer.movePaddleDown()
            }
        }
        let computerLooping = setInterval(() => { paddleAutoMove() }, 100);
        //----------------------------------------

        return ball
    }
    newBall()
}