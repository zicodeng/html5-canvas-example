// Animation module calls entity's own animation.
var Animation = (function() {
    var update = function(data) {
        _heartsAnimation(data);
        _characterAnimation(data);
    };

    var _heartsAnimation = function(data) {
        // Call animation on each individual heart.
        data.entities.heartList.forEach(function(heart) {
            heart.currentState.animation(data);
        });
    };

    var _characterAnimation = function(data) {
        data.entities.character.currentState.animation(data);
    };

    return {
        update: update
    }
}());