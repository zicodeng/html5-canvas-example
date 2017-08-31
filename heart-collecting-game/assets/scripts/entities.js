var Entities = (function() {

    // Entities.init(data) function initializes entities,
    // and then pass them into data object,
    // so entities can be updated and drawn on screen later on.
    var init = function(data) {
        var character = new Character(data.spritesheet, 100, data.canvas.fgCanvas.height - 64 - 54, 32, 54);

        // Store it to data object.
        data.entities.character = character;
        
        var tree = new Tree(data.spritesheet, 100, data.canvas.bgCanvas.height - 350, 300, 298);
        data.entities.tree = tree;

        // Define heart locations.
        var heartLocations = [
            [800, data.canvas.fgCanvas.height - 650],
            [950, data.canvas.fgCanvas.height - 650],
            [1100, data.canvas.fgCanvas.height - 650],
            [1250, data.canvas.fgCanvas.height - 650],

            [875, data.canvas.fgCanvas.height - 250],
            [975, data.canvas.fgCanvas.height - 350],
            [1075, data.canvas.fgCanvas.height - 450],
            [1175, data.canvas.fgCanvas.height - 550],

            [800, data.canvas.fgCanvas.height - 150],
            [950, data.canvas.fgCanvas.height - 150],
            [1100, data.canvas.fgCanvas.height - 150],
            [1250, data.canvas.fgCanvas.height - 150],
        ];

        var heartList = [];

        // Create a new Heart object for each heart location,
        // and push it to heartList.
        heartLocations.forEach(function(location) {
            heartList.push(new Heart(data.spritesheet, location[0] + 40, location[1] - 30, 21, 19));
        });

        data.entities.heartList = heartList;

        // Define ground locations.
        var groundLocations = [];
        for(var i = 0; i < 100; i ++) {
            groundLocations.push(i * 50);
        } 

        var ground = []; 
        // Ground is made of multiple ground tiles.
        groundLocations.forEach(function(targetX) {
            ground.push(new Ground(data.spritesheet, targetX, data.canvas.fgCanvas.height - 64, 64, 64));
        }); 

        data.entities.ground = ground;


        // Define stairs locations.
        var stairsLocations = [
            [800, data.canvas.fgCanvas.height - 650],
            [950, data.canvas.fgCanvas.height - 650],
            [1100, data.canvas.fgCanvas.height - 650],
            [1250, data.canvas.fgCanvas.height - 650],

            [875, data.canvas.fgCanvas.height - 250],
            [975, data.canvas.fgCanvas.height - 350],
            [1075, data.canvas.fgCanvas.height - 450],
            [1175, data.canvas.fgCanvas.height - 550],

            [800, data.canvas.fgCanvas.height - 150],
            [950, data.canvas.fgCanvas.height - 150],
            [1100, data.canvas.fgCanvas.height - 150],
            [1250, data.canvas.fgCanvas.height - 150],
        ];

        var stairs = []; 
        stairsLocations.forEach(function(location) {
            stairs.push(new Stairs.newInstance(data.spritesheet, location[0], location[1], 100, 25));
        });

        data.entities.stairs = stairs;

        // Define cloud locations.
        var cloudLocations = [
            [300, 250],
            [650, 150],
            [1200, 300]
        ];

        var cloudList = [];
        cloudLocations.forEach(function(location) {
            cloudList.push(new Cloud(data.spritesheet, location[0], location[1], 157, 44));
        });

        data.entities.cloudList = cloudList;
    };

    var helper = function() {

        // Sprite is a class function for making a Sprite object.
        var Sprite = function(img, srcX, srcY, srcWidth, srcHeight) {
            this.img = img;
            this.srcX = srcX;
            this.srcY = srcY;
            this.srcWidth = srcWidth;
            this.srcHeight = srcHeight;

            return this;
        };

        // Public functions returned by helper.
        return {
            Sprite: Sprite
        }
    };

    // Public functions returned by Entities.
    return {
        init: init,
        helper: helper
    }
})();  