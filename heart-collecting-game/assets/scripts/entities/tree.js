// Tree is a class function for making a Tree object.
var Tree = function(img, targetX, targetY, targetWidth, targetHeight) {
    this.type = "Tree";
    this.sprite = new Entities.helper().Sprite(img, 156, 54, 300, 298);
    this.targetX = targetX;
    this.targetY = targetY;
    this.targetWidth = targetWidth;
    this.targetHeight = targetHeight;

    return this;
};