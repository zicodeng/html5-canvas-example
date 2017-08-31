// Heart is a class function for making a Heart object.
var Heart = function(img, targetX, targetY, targetWidth, targetHeight) {
    var self = this;
    this.type = "Heart";
    this.sprite = new Entities.helper().Sprite(img, 0, 0, 21, 19);
    this.targetX = targetX;
    this.targetY = targetY;
    this.targetWidth = targetWidth;
    this.targetHeight = targetHeight;

    // spriteAnimations field stores frames for creating animations.
    this.spriteAnimations = {
        float: {
            frames: [
                self.targetY = self.targetY + 5,
                self.targetY = self.targetY - 5
            ],
            currentFrame: 0
        }
    };

    // states field stores animations for this object.
    this.states = {
        floating: {
            animation: function(data) {
                if(data.animationFrame % 25 === 0) {
                    self.targetY = self.spriteAnimations.float.frames[self.spriteAnimations.float.currentFrame];
                    self.spriteAnimations.float.currentFrame ++;
                    if(self.spriteAnimations.float.currentFrame > self.spriteAnimations.float.frames.length - 1) {
                        self.spriteAnimations.float.currentFrame = 0;
                    }
                }
            }
        }
    };

    // Current animation.
    this.currentState = self.states.floating;

    return this;
}