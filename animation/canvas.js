var canvas = document.getElementById("canvas");

// Set canvas width and height to the entire view.
// Make sure to remove scrollbar in CSS.
canvas.width = window.innerWidth; // This works too: canvas.width = document.documentElement.clientWidth;
canvas.height = window.innerHeight;

// Context is an object that provides methods for drawing on canvas.
// 2d means we only want to draw two dimensional elements.
var ctx = canvas.getContext("2d");

// This variable represents mouse object.
var mouse = {
    x: undefined,
    y: undefined
}

// Add mousemove event listener to the entire window.
window.addEventListener("mousemove", function(event) {
    // Set mouse object x and y position to mousemove event current position.
    mouse.x = event.x;
    mouse.y = event.y;
});

var maxRadius = 50;
var minRadius = 5;
var distance = 150; // Distance between user's mouse and center of the ball.
var sizeIncreaseSpeed = 4; // How fast the ball's size should increase when within the distance.
var sizeDecreaseSpeed = 2; // How fast the ball's size should decrease when out of the distance.

// This function creates a new ball object.
function Ball(x, y, r, dx, dy, color) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.dx = dx;
    this.dy = dy;
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
            this.dx = -this.dx;
        }

        if(this.y + this.r > window.innerHeight || this.y - this.r < 0) {
            this.dy = -this.dy;
        }

        // Update position.
        this.x += this.dx;
        this.y += this.dy;  

        // Interact with user's mouse.
        if(Math.abs(mouse.x - this.x) < distance && Math.abs(mouse.y - this.y) < distance) {
            // If the distance between user's mouse 
            // and the ball's center is less than a certain distance,
            // and if the current ball's radius is less than max radius,
            // increase the ball's radius.
            if(this.r < maxRadius) {
                this.r += sizeIncreaseSpeed; 
            }
        } else if (this.r > minRadius) {
            this.r -= sizeDecreaseSpeed;
        }

        // Re-draw the ball with updated parameters.
        this.draw();
    }   
}

colors = [
    "#F6546A",
    "#FFA500",
    "#40E0D0",
    "#3399FF",
    "#FFFF00"
]

// This array stores each individual ball object.
var balls = [];
var numOfBalls = 300;

// This function initializes balls on canvas.
function init() {

    // Create multiple balls.
    for(var i = 0; i < numOfBalls; i ++) {

        // Define ball's initial state.
        // Size
        var r = Math.random() * 100; // Ball radius 0 ~ 100.

        // Randomize ball's starting position.
        // (window.innerWidth - 2 * r) + r: this prevents the ball gets caught on the wall.
        var x = Math.random() * (window.innerWidth - 2 * r) + r; // X position.
        var y = Math.random() * (window.innerHeight - 2 * r) + r; // Y position.

        // Velocity
        // Randomize velocity, including both positive and negative.
        var dx = (Math.random() - 0.5) * 10; // Horizontal velocity.
        var dy = (Math.random() - 0.5) * 10; // Vertical velocity.

        // Color
        var colorIndex = Math.floor((Math.random() * colors.length)); // Random number 0 ~ (colors.length - 1).
        var color = colors[colorIndex];

        // Each individual ball has its own random starting point, size, and velocity.
        var mBall = new Ball(x, y, r, dx, dy, color);

        // Draw the ball we just created on canvas.
        mBall.draw();

        balls.push(mBall);
    }
}

// This function animates balls bouncing off the wall.
function animateBalls() {
    window.requestAnimationFrame(animateBalls);
    
    // Clear previous drawings.
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    // For each individual ball, call its own updatePosition method.
    for(var i = 0; i < balls.length; i ++) {
        balls[i].updatePosition();
    }
}

// Make the canvas size respond to window size.
window.addEventListener("resize", function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Clear balls list every time when the window is re-sized.
    balls = [];

    init();
});

// Call this method when this script is loaded on first time.
init();

// Execute animation.
animateBalls();
