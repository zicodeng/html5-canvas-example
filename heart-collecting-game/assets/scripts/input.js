var Input = (function() {

    var KEY_CODE = {
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40
    };

    var keyState = {};

    // Listen for the user input.
    var init = function() {
        window.addEventListener("keydown", function(e) {
            keyState[e.keyCode] = true;
        });
    
        window.addEventListener("keyup", function(e) {
            keyState[e.keyCode] = false;
        });
    };

    var update = function(data) {
        var character = data.entities.character;

        // Left key is pressed.
        if(keyState[KEY_CODE.LEFT]) {
            if(character.velocityY === 0) {
                // If the character is moving left on the ground,
                // change its current state to walking.
                character.currentState = character.states.walking; 
            } else {
                // If the character is jumping on the air (so it has y velocity),
                // we should still be able to control its movement as well.
                character.targetX -= character.velocityX;
            }
            character.direction = "left";
        } else {
            character.currentState = character.states.standing;
        }

        // Right key is pressed.
        if(keyState[KEY_CODE.RIGHT]) {
            if(character.velocityY === 0) {
                character.currentState = character.states.walking; 
            } else {
                character.targetX += character.velocityX; 
            }
            character.direction = "right";
        }

        // Up key is pressed.
        if(keyState[KEY_CODE.UP]) {
            character.currentState = character.states.jumping;
        }
    };

    return {
        init: init,
        update: update
    }
})();