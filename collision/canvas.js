var canvas = document.getElementById("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext("2d");

var mouse = {
    x: undefined,
    y: undefined,

    // These two variables represent how fast the user's mousing is moving.
    // They will be used on big ball's vx and vy.
    vx: 0,
    vy: 0
}

var timestamp = null;
var lastMouseX = null;
var lastMouseY = null;

window.addEventListener("mousemove", function(e) {
    mouse.x = e.x;
    mouse.y = e.y;

    if (timestamp === null) {
        timestamp = Date.now();
        lastMouseX = e.x;
        lastMouseY = e.y;
        return;
    }

    var now = Date.now();
    var dt =  now - timestamp;
    var dx = e.x - lastMouseX; // Horizontal distance change within dt.
    var dy = e.y - lastMouseY; // Vertical distance change within dt.

    // Obtain instant velocity.
    var vx = Math.round(dx / dt);
    var vy = Math.round(dy / dt);

    timestamp = now;
    lastMouseX = e.x;
    lastMouseY = e.y;

    mouse.vx = vx;
    mouse.vy = vy;
});

// This function creates a new ball object.
function Ball(x, y, r, vx, vy, color) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.vx = vx; // Horizontal velocity.
    this.vy = vy; // Vertical velocity.
    this.color = color;

    // This function draws a ball on canvas.
    this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    
    // This function updates the ball's position. 
    this.updatePosition = function() {
        // If the ball hits the wall, reverse its velocity.
        if(this.x + this.r > window.innerWidth || this.x - this.r < 0) {
            this.vx = -this.vx;
        }

        if(this.y + this.r > window.innerHeight || this.y - this.r < 0) {
            this.vy = -this.vy;
        }

        // Update position.
        this.x += this.vx;
        this.y += this.vy;  

        // Re-draw the ball with updated parameters.
        this.draw();
    }   
}

var smallBall;
var bigBall;

function init() {
    smallBall = new Ball(undefined, undefined, 50, 0, 0, "#E74C3C");
    smallBall.draw();

    bigBall = new Ball(canvas.width / 2, canvas.height / 2, 100, 0, 0, "#3498DB");
    bigBall.draw(); 
}

init();

// This function animates two balls colliding each other.
function collideBalls() {
    window.requestAnimationFrame(collideBalls);
    
    // Clear previous drawings.
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    // Set small ball's position to the user's current mouse position,
    // so that the small ball moves as the mouse moves.
    smallBall.x = mouse.x;
    smallBall.y = mouse.y;

    smallBall.draw();
    bigBall.draw();

    var distance = getDistance(smallBall.x, smallBall.y, bigBall.x, bigBall.y);

    // If the small ball collides with the big ball,
    // give the mouse's current velocity to the big ball's velocity.
    if(distance < smallBall.r + bigBall.r) {

        // Make sure mouse is actually moving and has velocity.
        if(mouse.vx !== 0 || mouse.vy !== 0) {
            bigBall.vx = mouse.vx * 10;
            bigBall.vy = mouse.vy * 10; 
        }
    }

    bigBall.updatePosition();
}

collideBalls();

// This function uses pythagorean theorem to calculate
// the distance between the small ball and the big ball.
function getDistance(smallBallX, smallBallY, bigBallX, bigBallY) {

    // Get horizontal and vertical distances between the two balls.
    var xDistance = bigBallX - smallBallX;
    var yDistance = bigBallY - smallBallY;

    var distance = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));

    return distance;
}