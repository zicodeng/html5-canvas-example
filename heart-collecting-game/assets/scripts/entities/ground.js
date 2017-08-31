// Ground is a class function for making a Ground tile object.
var Ground = function(img, targetX, targetY, targetWidth, targetHeight) {
    this.type = "Ground";
    this.sprite = new Entities.helper().Sprite(img, 92, 54, 64, 64);
    this.targetX = targetX;
    this.targetY = targetY;
    this.targetWidth = targetWidth;
    this.targetHeight = targetHeight;

    return this;
};