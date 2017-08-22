var COLS = 26,
    ROWS = 26;

var EMPTY = 0,
    SNAKE = 1,
    FOOD  = 2;

// Direction of the snake.
var LEFT   = 0,
    UP     = 1,
    RIGHT  = 2,
    BOTTOM = 3;

// Key codes.
var KEY_LEFT = 37,
    KEY_UP = 38,
    KEY_RIGHT = 39,
    KEY_BOTTOM = 40;

// Create a grid object by using object literal.
// This grid represents the movement range of the snake.
var grid = {
    width: null,
    height: null,
    grid: null,

    // init function initializes the grid.
    init: function(val, cols, rows) {
        this.width = cols;
        this.height = rows;

        this.grid = [];

        // Making grid a 2D array.
        for(var i = 0; i < rows; i ++) {
            this.grid.push([]);
            for(var j = 0; j < cols; j ++) {
                // Fill the array with value.
                this.grid[i].push(val);
            }
        }
    },

    // set function sets a given value at a given coordinate.
    set: function(val, x, y) {
        this.grid[x][y] = val;
    },

    // get function returns a value at a given coordinate.
    get: function(x, y) {
        return this.grid[x][y];
    }
}

var snake = {
    // direction represents which direction the snake is facing.
    direction: null,

    // body represents body of the snake.
    body: null,

    // firstElem represents the first element in the body.
    firstElem: null,

    // init function initializes the snake.
    init: function(direction, x, y) {
        this.direction = direction;
        this.body = [];
        this.insert(x, y);
    },

    // insert function inserts a new coordinate at the beginning of the body,
    // causing the body of the snake to increase by one.
    insert: function(x, y) {
        this.body.unshift({x:x, y:y});
        this.firstElem = this.body[0];
    },

    // remove function removes an element at the end of the body,
    // causing the snake body to decrease by one.
    remove: function() {
        return this.body.pop();
    }
}

function setFood() {
    // emptyList keeps track of the coordinates of grid items that have value EMPTY left in the grid.
    var emptyList = [];

    // Loop through the grid.
    for(var x = 0; x < grid.width; x ++) {
        for(var y = 0; y < grid.height; y ++) {

            // If the value of the grid item is EMPTY,
            // push the coordinate of that grid item to emptyList.
            if(grid.get(x, y) === EMPTY) {
                emptyList.push({x:x, y:y});
            }
        }
    }

    // Randomly find a coordinate from the emptyList,
    // and set the value of this coordiante to be FOOD.
    // The reason why we want it to be based on emptyList instead of grid is that
    // it might accidentally generate a position that happen to be on snake's body.
    var randPos = emptyList[Math.floor(Math.random() * emptyList.length)];

    grid.set(FOOD, randPos.x, randPos.y);
}

// Game objects
var canvas,
    ctx,
    keyState,
    frames, // 60 times / sec
    snakeMovingSpeed, // The lower this variable, the faster the snake moves.
    score;
 
function main() {
    canvas = document.getElementById("canvas");
    canvas.width = COLS * 20;
    canvas.height = ROWS * 20;

    ctx = canvas.getContext("2d");
    ctx.font = "16px Helvetica";

    frames = 0;
    keyState = {};

    // When the user presses down any key on keyboard,
    // computer will send us a feedback via keyCode.
    window.addEventListener("keydown", function(e) {
        keyState[e.keyCode] = true;
    });

    window.addEventListener("keyup", function(e) {
        keyState[e.keyCode] = false;
    });

    init();
    loop();
}

// init function initializes grid and snake.
function init() {
    
    grid.init(EMPTY, COLS, ROWS);

    // startPos defines the starting position for the snake.
    var startPos = {x: Math.floor(COLS / 2), y: Math.floor(ROWS / 2)};

    // Initialize the snake.
    snake.init(UP, startPos.x, startPos.y);

    // Set the snake on the grid.
    grid.set(SNAKE, startPos.x, startPos.y);

    // Set food on the grid.
    setFood();

    snakeMovingSpeed = 10;

    score = 0;
}

// loop function keeps looping itself to draw the game on canvas.
function loop() {
    window.requestAnimationFrame(loop);

    // Clear previous drawings.
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    update();
    draw(); 
}

function update() {
    frames ++;

    // Change snake moving direction based on which key the user has pressed.
    // The second condition prevents the snake eating itself by moving
    // towards the opposite direction to its current direction.
    if(keyState[KEY_LEFT] && snake.direction !== RIGHT) {
        snake.direction = LEFT;
    }

    if(keyState[KEY_UP] && snake.direction !== BOTTOM) {
        snake.direction = UP;
    }

    if(keyState[KEY_RIGHT] && snake.direction !== LEFT) {
        snake.direction = RIGHT;
    }

    if(keyState[KEY_BOTTOM] && snake.direction !== UP) {
        snake.direction = BOTTOM;
    }

    // Add game difficulty.
    // Increase the snake moving speed as score increases.
    switch(score) {
        case 5:
            snakeMovingSpeed = 8;
            break;

        case 10:
            snakeMovingSpeed = 6;
            break;

        case 15:
            snakeMovingSpeed = 4;
            break;

        case 20:
            snakeMovingSpeed = 2;
            break;

        case 25:
            snakeMovingSpeed = 1;
            break; 
    }

    // Controlling snake moving speed.
    if(frames % snakeMovingSpeed === 0) {

        // nx and ny represent new x and y coordinates.
        var nx = snake.firstElem.x;
        var ny = snake.firstElem.y;

        switch(snake.direction) {
            case LEFT:
                nx --;
                break;

            case UP:
                ny --;
                break;

            case RIGHT:
                nx ++;
                break;

            case BOTTOM:
                ny ++;
                break;
        }

        // Restart the game if the snake hits the canvas border.
        if(nx < 0 || nx > grid.width - 1 || ny < 0 || ny > grid.height - 1) {
            window.alert("Game over! You just hit the wall!");
            return init();
        } else if(grid.get(nx, ny) === SNAKE) {
            window.alert("Game over! You just ate yourself!");
            return init();
        }

        // If the food is eaten by the snake,
        // increase score,
        // generate a new good on the grid,
        // and grow the snake's body.
        var tail;
        if(grid.get(nx, ny) === FOOD) {
            score ++;
            setFood();
            tail = {x:nx, y:ny};
        } else {
            // tail represents the tail of the snake, or last element in the body.
            tail = snake.remove();
        
            // Set the coordinate of the removed element to value EMPTY.
            // When the draw function gets called again, it will display black
            // at that particular position.
            grid.set(EMPTY, tail.x, tail.y);
            tail.x = nx;
            tail.y = ny;
        }

        // Set the snake on grid with updated position.
        grid.set(SNAKE, tail.x, tail.y);

        // Update snake's body.
        snake.insert(tail.x, tail.y);
    }
}

// draw function draws the game on canvas
// based on the the value of each grid item.
function draw() {

    // These two variables represent the width and height of each grid item.
    var gridItemWidth = canvas.width / grid.width;
    var gridItemHeight = canvas.height / grid.height;

    // The grid (large rectangle) is made of many grid items (small rectangles).
    // Loop through the grid to determine color for each grid item,
    // and then draw each grid item.
    for(var x = 0; x < grid.width; x ++) {
        for(var y = 0; y < grid.height; y ++) {

            // Switch color for different values of the grid item.
            switch(grid.get(x, y)) {
                case EMPTY:
                    ctx.fillStyle = "#000";
                    break;

                case SNAKE:
                    ctx.fillStyle = "#E74C3C";
                    break;

                case FOOD:
                    ctx.fillStyle = "#3498DB";
                    break;
            }

            // Drawing grid item.
            ctx.fillRect(x * gridItemWidth, y * gridItemHeight, gridItemWidth, gridItemHeight);
        }
    }

    // Write score on canvas.
    ctx.fillStyle = "#fff";
    ctx.fillText("SCORE: " + score, 10, canvas.height - 10);
    ctx.fillText("SPEED: " + snakeMovingSpeed, canvas.width - 90, canvas.height - 10);
}

main();