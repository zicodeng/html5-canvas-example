var canvas = document.getElementById("canvas");

// Set canvas width and height to the entire view.
// Make sure to remove scrollbar in CSS.
canvas.width = window.innerWidth; // This works too: canvas.width = document.documentElement.clientWidth;
canvas.height = window.innerHeight;

// Context is an object that provides methods for drawing on canvas.
// 2d means we only want to draw two dimensional elements.
var ctx = canvas.getContext("2d");

// Draw rectangle.
// ctx.fillRect(x, y, width, height);
// Define rectangle color.
ctx.fillStyle = "rgba(253, 77, 0, 0.8)";
// Execute drawing.
ctx.fillRect(100, 100, 100, 100);

ctx.fillStyle = "rgb(0, 255, 127)";
ctx.fillRect(500, 500, 100, 100);

// Draw line.
ctx.beginPath();
// Define starting point.
ctx.moveTo(50, 50);
// Define ending point.
ctx.lineTo(300, 50);
// Define more ending points to continue drawing.
ctx.lineTo(600, 100);
// Define line color.
ctx.strokeStyle = "#8ACFFF";
// Execute drawing.
ctx.stroke();

// Draw circle or arc.
// ctx.arc(x, y, radius, startAngle(radians), endAngle(radians), anti-clockwise?);
// (x, y) is the center of the circle.
ctx.beginPath(); 
ctx.arc(400, 400, 50, 0, Math.PI * 2, false);
ctx.strokeStyle = "#8A2BE2";
// Execute drawing.
ctx.stroke();

// Draw circles on random places.
for(var i = 0; i < 10; i ++) {
    var x = Math.random() * window.innerWidth;
    var y = Math.random() * window.innerHeight;

    ctx.beginPath();
    ctx.arc(x, y, 50, 0, Math.PI * 2, false);
    ctx.strokeStyle = "#FF4040";
    ctx.stroke();
}
