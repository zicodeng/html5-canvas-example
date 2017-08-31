var Game = (function(){

    // Initializes variables and functions for the game, 
    // and then runs the game.
    var init = function() {
        var bgCanvas = document.getElementById("bg-canvas");
        var fgCanvas = document.getElementById("fg-canvas");

        // Set canvas size.
        bgCanvas.width = window.innerWidth;
        bgCanvas.height = window.innerHeight;

        fgCanvas.width = window.innerWidth;
        fgCanvas.height = window.innerHeight;

        var canvas = {
            bgCanvas: bgCanvas,
            fgCanvas: fgCanvas,
            bgCtx: bgCanvas.getContext("2d"),
            fgCtx: fgCanvas.getContext("2d")
        };

        var spritesheet = new Image();
        spritesheet.src = "./assets/images/spritesheet/game-spritesheet.png";

        // Once the spritesheet finishes loading,
        // make a data object for storing the game's data,
        // and execute running the game.
        spritesheet.onload = function() {
            var data = {
                animationFrame: 0,
                spritesheet: spritesheet,
                canvas: canvas,
                entities: {}
            }
            
            // Initializes the Input, Entities, and Render before the game runs.
            Input.init();
            Entities.init(data);
            Render.init(data);

            _run(data);
        };
    }

    // _run function takes game data and runs the game.
    var _run = function(data) {
        var loop = function() {
            _input(data);
            _update(data);
            _render(data);
            
            // Update animation frame each time the loop goes through.
            data.animationFrame ++;

            window.requestAnimationFrame(loop);
        };

        loop();
    };

    // _input function collects the user input such as keydown.
    var _input = function(data) {
        Input.update(data);
    };

    // _update function updates game data.
    var _update = function(data) {
        Animation.update(data);
        Movement.update(data);
        Physics.update(data);
    }

    // _render function draws the game on canvas.
    var _render = function(data) {
        Render.update(data);
    }

    return {
        init: init
    }
})();

Game.init();
