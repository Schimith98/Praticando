let canvas = document.querySelector('canvas')
canvas.width = 800;
canvas.height = 400;
var ctx = canvas.getContext('2d')
let playerScore = 0
let computerScore = 0
let rounds = 3

function randomInt(min, max) {
    return min + Math.floor((max - min) * Math.random());
}
function randomY(){
    let ballY = randomInt(100, 301)
    ballY = ballY - ballY % 10
    return ballY
}
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
    moveUp() {
        if (this.y - this.speed >= 0) { // colisão com teto
            erase(this.x, this.y, this.width, this.height)
            this.y = this.y - this.speed
            draw(this.x, this.y, this.width, this.height)
        }
    }
    moveDown() {
        if (this.y + this.speed <= 350) { // colisão com chão
            erase(this.x, this.y, this.width, this.height)
            this.y = this.y + this.speed
            draw(this.x, this.y, this.width, this.height)
        }
    }
}
const playerPaddle = new Paddle(20, 180, 10, 50, 10)
const computerPaddle = new Paddle(770, 180, 10, 50, 10)

let ballMovement
class Ball {
    constructor(x, y, width, height, speed, horizontalDirection, verticalDirection) {
        console.log(y)
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.speed = speed
        this.horizontalDirection = horizontalDirection
        this.verticalDirection = verticalDirection
        this.drawBall()
        ballMovement = setInterval(() => { this.move() }, 50);
    }
    drawBall() {
        draw(this.x, this.y, this.width, this.height)
    }
    move() {
        erase(this.x, this.y, this.width, this.height)

        if (this.y <= 0) { //colide com o teto
            this.verticalDirection = 1
        }
        if (this.y >= 390) { //colide com o chão
            this.verticalDirection = 0
        }
        if (this.x <= 0) {  //computer goal 
            //this.horizontalDirection = 1
            clearInterval(ballMovement)
            computerScore++
            document.getElementById("computerScore").innerText = computerScore
            if (computerScore != rounds) {
                const ball = new Ball(390, randomY(), 10, 10, 10, randomInt(0, 2), randomInt(0, 2))
            }
        }
        if (this.x >= 790) {  //player goal 
            //this.horizontalDirection = 0
            clearInterval(ballMovement)
        }

        if (this.x - this.speed < playerPaddle.x + playerPaddle.width &&  // player paddle colision
            this.x + this.width - this.speed > playerPaddle.x &&
            this.y - this.speed < playerPaddle.y + playerPaddle.height &&
            this.y + this.height - this.speed > playerPaddle.y) {
            this.horizontalDirection = 1
        }
        if (this.x + this.speed < computerPaddle.x + computerPaddle.width &&  // computer paddle colision
            this.x + this.width + this.speed > computerPaddle.x &&
            this.y + this.speed < computerPaddle.y + computerPaddle.height &&
            this.y + this.height + this.speed > computerPaddle.y) {
            this.horizontalDirection = 0
        }

        if (this.horizontalDirection == 1) {
            this.x = this.x + this.speed
        } else {
            this.x = this.x - this.speed
        }
        if (this.verticalDirection == 1) {
            this.y = this.y + this.speed


        } else {
            this.y = this.y - this.speed
        }

        if (this.y <= computerPaddle.y) {
            computerPaddle.moveUp()
        }
        if (this.y >= computerPaddle.y) {
            computerPaddle.moveDown()
        }

        draw(this.x, this.y, this.width, this.height)
    }
}




function init(e) {
    e.target.setAttribute('disabled', true)

    const ball = new Ball(390, randomY(), 10, 10, 10, randomInt(0, 2), randomInt(0, 2))


    document.addEventListener('keydown', getKey)
    function getKey() {
        const key = event.keyCode;
        if (key == 38) {
            playerPaddle.moveUp()
        }
        if (key == 40) {
            playerPaddle.moveDown()
        }
    }
}