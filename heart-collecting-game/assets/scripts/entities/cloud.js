// Clound is a class function for making a Cloud object.
var Cloud = function(img, targetX, targetY, targetWidth, targetHeight) {
    this.type = "Cloud";
    this.sprite = new Entities.helper().Sprite(img, 121, 0, 157, 44);
    this.targetX = targetX;
    this.targetY = targetY;
    this.targetWidth = targetWidth;
    this.targetHeight = targetHeight;

    return this;
};