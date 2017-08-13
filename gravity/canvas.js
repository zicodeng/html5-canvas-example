var canvas = document.getElementById("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext("2d");

// This variable represents gravity on the ball.
var gravity = 1;

// This variable represents friction when the ball hits the wall.
var friction = 0.9;

// This function creates a new ball object.
function Ball(x, y, r, vx, vy, color) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.vx = vx;
    this.vy = vy;
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
        // If the ball hits the wall, decrease its velocity by multiplying a friction,
        // and then reverse its direction.
        if(this.y + this.r > canvas.height || this.y - this.r < 0) {
            // According to real world physics, the ball will not retain its original velocity
            // when it hits the wall.
            // This is because the friction is applied, thus velocity is decreased slightly
            // every time the ball hits the wall.
            this.vy = -this.vy * friction;
        } else {
            // If the ball is moving on the air,
            // increase its y velocity by adding gravity to it.
            this.vy += gravity;
        }

        // Update position.
        this.y += this.vy;  

        // Re-draw the ball with updated parameters.
        this.draw();
    }   
}

var mBall;

function init() {
    mBall = new Ball(canvas.width / 2, 200, 50, 0, 1, "#000");
    mBall.draw(); 
}

init();

// This function animates a ball bouncing off the wall.
function bounceBall() {
    window.requestAnimationFrame(bounceBall);
    
    // Clear previous drawings.
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    mBall.updatePosition();
}

bounceBall();

