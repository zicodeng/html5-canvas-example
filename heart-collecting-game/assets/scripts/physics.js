// Physics creates physics engine for the game.
var Physics = (function() {
    var update = function(data) {
        _gravity(data.entities.character);
        _collisionDetection(data);
    };

    // Check whether or not the collision has occurred.
    var _collisionDetection = function(data) {
        var character = data.entities.character;

        // _entityCollisionCheck is a private function to _collisionDetection.
        // It checks if a collision has occurred between the character and any specified entity.
        var _entityCollisionCheck = function(entity) {
            if(
                // if character is inside of the entity, it means a collision has occurred.
                character.targetX < entity.targetX + entity.targetWidth && // Left collision.
                character.targetX + character.targetWidth > entity.targetX && // Right collision.
                character.targetY < entity.targetY + entity.targetHeight && // Top collision.
                character.targetY + character.targetHeight > entity.targetY // Bottom collison.
            ) {
               _handleCollision(data, entity);
            }
        };

        var ground = data.entities.ground;
        ground.forEach(function(grass) {
            _entityCollisionCheck(grass);
        });

        var stairs = data.entities.stairs;
        stairs.forEach(function(step) {
            _entityCollisionCheck(step);
        });

        var heartList = data.entities.heartList;
        heartList.forEach(function(heart) {
            _entityCollisionCheck(heart);
        });
    };

    var _handleCollision = function(data, entity) {
        var character = data.entities.character;

        // Handle collision with ground.
        if(entity.type === "Ground") {

            // Top of the ground collision.
            if(
                character.targetY < entity.targetY &&
                character.targetX + character.targetWidth / 2 > entity.targetX &&
                character.targetX + character.targetWidth / 2 < entity.targetX + entity.targetWidth &&
                character.velocityY >= 0
            ) {
                character.currentState = character.states.standing;
                character.targetY = entity.targetY - character.targetHeight;
                character.velocityY = 0;
            }
        }

        // Handle collision with stairs.
        if(entity.type === "Stairs") {

            // Top of the stairs collision.
            if(
                character.targetY < entity.targetY &&
                character.targetX + character.targetWidth / 2 > entity.targetX &&
                character.targetX + character.targetWidth / 2 < entity.targetX + entity.targetWidth &&
                character.velocityY >= 0
            ) {
                character.currentState = character.states.standing;
                character.targetY = entity.targetY - character.targetHeight;
                character.velocityY = 0;
            }

            //  Bottom of the stairs collision.
            else if(
                character.targetY > entity.targetY &&
                character.velocityY <= 0
            ) {
                character.currentState = character.states.standing;
                character.targetY = entity.targetY + entity.targetHeight;
                character.velocityY = 2;
            }
    
            // Left side of the stairs collision.
            else if(
                character.targetX < entity.targetX &&

                // Ensure the y position of the center of the character is below the entity's y position.
                character.targetY + character.targetHeight / 2 > entity.targetY
            ) {
                character.targetX = entity.targetX - character.targetWidth;
            }
            
            // Right side of the stairs collision.
            else if(
                character.targetX > entity.targetX &&
                character.targetY + character.targetHeight / 2 > entity.targetY
            ) {
                character.targetX = entity.targetX + entity.targetWidth;
            }
        }

        // When the character collides with the heart,
        // it will act as collecting it.
        if(entity.type === "Heart") {
            var heartList = data.entities.heartList;
            var removedHeartIndex = heartList.indexOf(entity);

            // Remove the heart that is collected by the character from the heartList.
            heartList.splice(removedHeartIndex, 1);

            // Increase the character's heartCollection by one.
            character.heartCollection ++;
        }
    };

    var _gravity = function(entity) {
        // Gradually increases y velocity as it falls down.
        entity.velocityY += 1.23;

        // Update entity's y position.
        entity.targetY += entity.velocityY; 
    };

    return {
        update: update
    }
})();