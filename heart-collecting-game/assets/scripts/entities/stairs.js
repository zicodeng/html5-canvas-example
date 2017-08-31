var Stairs = (function(){
    // Stairs is a class for making a Stairs object.
    var newInstance = function(img, targetX, targetY, targetWidth, targetHeight) {
        this.type = "Stairs";
        this.sprite = new Entities.helper().Sprite(img, 21, 0, 100, 25);
        this.targetX = targetX;
        this.targetY = targetY;
        this.targetWidth = targetWidth;
        this.targetHeight = targetHeight;

        return this;
    };

    return {
        newInstance: newInstance
    }
})();