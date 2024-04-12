// board variables
let board;
let boardWidth = 720;
let boardHeight = 720;
let context;
let bounceMultiplier = 1.1;

// player variables
let playerWidth = 12;
let playerHeight = 80;
let playerVelocityY = 0;

// ball variables
let ballWidth = 16;
let ballHeight = 16;
let ball = {
    x: boardWidth/2 - ballWidth/2,
    y: boardHeight/2 - ballHeight/2,
    width: ballWidth,
    height: ballHeight,
    velocityX: 1,
    velocityY: 2
}

let player1Score = 0;
let player2Score = 0;

let player1 = {
    x: 12,
    y: boardHeight/2 - playerHeight/2,
    width: playerWidth,
    height: playerHeight,
    velocityY: playerVelocityY
}

let player2 = {
    x: boardWidth - playerWidth - 12,
    y: boardHeight/2 - playerHeight/2,
    width: playerWidth,
    height: playerHeight,
    velocityY: playerVelocityY
}

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d") // used for drawing on the board

    // draw initial player1
    context.fillStyle = "green";
    context.fillRect(player1.x, player1.y, player1.width, player1.height);

    // draw initial player2
    context.fillRect(player2.x, player2.y, player2.width, player2.height);

    // draw initial ball
    context.fillStyle = "red";
    context.fillRect(ball.x, ball.y, ball.width, ball.height);

    requestAnimationFrame(update);
    document.addEventListener("keyup", movePlayer);
}

function update() {
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);

    // update player positions
    let nextPlayer1Y = player1.y + player1.velocityY;
    let nextPlayer2Y = player2.y + player2.velocityY;

    if(!outOfBounds(nextPlayer1Y)) {
        player1.y = nextPlayer1Y;
    }

    if(!outOfBounds(nextPlayer2Y)) {
        player2.y = nextPlayer2Y;
    }

    // update ball position
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    // ball hits top or bottom
    if (ball.y <= 0 || (ball.y + ball.height >= boardHeight)) {
        ball.velocityY *= -1;
        ball.velocityX *= bounceMultiplier;
        ball.velocityY *= bounceMultiplier;
    }

    // ball hits paddle
    if (detectCollision(ball, player1)) {
        if (ball.x <= player1.x + player1.width) {
            // left side of ball touches right side of player1
            ball.velocityX *= -1; // flip x direction
        }
    }
    else if (detectCollision(ball, player2)) {
        if (ball.x + ballWidth >= player2.x) {
            // right side of ball touches left side of player2
            ball.velocityX *= -1; // flip x direction
        }
    }

    // draw player1
    context.fillStyle = "red";
    context.fillRect(player1.x, player1.y, player1.width, player1.height);

    // draw player2
    context.fillRect(player2.x, player2.y, player2.width, player2.height);

    // draw ball
    context.fillRect(ball.x, ball.y, ball.width, ball.height);

    // draw centerline
    for (let i = 10; i < board.height; i += 25) {
        // draw square every 25px down
        context.fillRect(board.width/2 - 10, i, 5, 5);
    }

    // scoring
    if (ball.x < 0) {
        player2Score++;
        resetGame(1);
    }
    else if (ball.x + ballWidth > boardWidth) {
        player1Score++;
        resetGame(-1);
    }

    // draw score
    context.font = "45px sans-serif";
    context.fillText(player1Score, boardWidth/5, 45);
    context.fillText(player2Score, boardWidth*4/5 - 45, 45)
}

function outOfBounds(yPosition) {
    return (yPosition < 0 || yPosition + playerHeight > boardHeight);
}

function movePlayer(e) {
    // player1
    if (e.code == "KeyW") {
        player1.velocityY = -3;
    }
    else if (e.code == "KeyS") {
        player1.velocityY = 3;
    }

    // player2
    if (e.code == "ArrowUp") {
        player2.velocityY = -3;
    }
    else if (e.code == "ArrowDown") {
        player2.velocityY = 3;
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width && // a's top left corner doesn't reach b's top right corner
           a.x + a.width > b.x && // a's top right corner passes b's top left corner
           a.y < b.y + b.height && // a's top left corner doesn't b's bottom left corner
           a.y + a.height > b.y; // a's bottom left corner passes b's top left corner
}

function resetGame(direction) {
    ball = {
        x: boardWidth/2 - ballWidth/2,
        y: boardHeight/2 - ballHeight/2,
        width: ballWidth,
        height: ballHeight,
        velocityX: direction,
        velocityY: 2
    }
}