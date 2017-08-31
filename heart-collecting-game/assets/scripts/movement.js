var Movement = (function() {
    var update = function(data) {
        _characterMovement(data);
    };

    var _characterMovement = function(data) {
        data.entities.character.currentState.movement(data);
    };

    return {
        update: update
    }
})();