// Character is a class function for making a Character object.
var Character = function(img, targetX, targetY, targetWidth, targetHeight) {
    var self = this;
    this.type = "Character";
    this.sprite = new Entities.helper().Sprite(img, 62, 54, 30, 54),
    this.targetX = targetX;
    this.targetY = targetY;
    this.targetWidth = targetWidth;
    this.targetHeight = targetHeight;

    // this.jumpSound = new Audio("...");
    this.direction = "right";
    this.velocityY = 4;
    this.velocityX = 4;
    this.heartCollection = 0; // How many hearts has this character collected.

    this.spriteAnimations = {
        // Walking animations.
        walkRight: {
            frames: [
                new Entities.helper().Sprite(img, 62, 54, 30, 54),
                new Entities.helper().Sprite(img, 32, 54, 30, 54),
                new Entities.helper().Sprite(img, 311, 0, 30, 54)
            ],
            currentFrame: 0
        },
        walkLeft: {
            frames: [
                new Entities.helper().Sprite(img, 376, 0, 30, 54),
                new Entities.helper().Sprite(img, 406, 0, 30, 54),
                new Entities.helper().Sprite(img, 0, 54, 30, 54)
            ],
            currentFrame: 0
        },

        // Standing animations.
        standRight: new Entities.helper().Sprite(img, 62, 54, 29, 54),
        standLeft: new Entities.helper().Sprite(img, 376, 0, 30, 54),

        // Jumping animations.
        jumpLeft: {
            frames: [
                new Entities.helper().Sprite(img, 278, 0, 33, 54)
            ]
        },
        jumpRight: {
            frames: [
                new Entities.helper().Sprite(img, 343, 0, 33, 54)
            ]
        }
    };

    this.states = {
        jumping: {
            movement: function(data) {
                // If velocity y is 0, it means that the character hasn't jumped yet,
                // and it is on the ground, not flying on the air.
                if(self.velocityY === 0) {
                    // cloneNode allows the user to press the jump key multiple times in a row
                    // before the last sound has finished, it will still create a new instance
                    // of the sound.
                    // var jumpSound = self.jumpSound.cloneNode();
                    // jumpSound.play();

                    // Force the character to jump up by change its y velocity to negative number.
                    self.velocityY = -18;
                }   
            },
            animation: function(data) {
                if(self.direction === "right") {
                    self.sprite = self.spriteAnimations.jumpRight.frames[0];
                } else {
                    self.sprite = self.spriteAnimations.jumpLeft.frames[0];
                }
            }
        },
        standing: {
            movement: function(data) {
                // No movement will occur when the character is standing.
                return;
            },
            animation: function(data) {
                switch (self.direction) {
                    case "left":
                        self.sprite = self.spriteAnimations.standLeft;
                        break;

                    case "right":
                        self.sprite = self.spriteAnimations.standRight;
                        break;
                        
                    default:
                        break;
                }
            }
        },
        walking: {
            movement: function(data) {
                switch (self.direction) {
                    case "left":
                        self.targetX -= self.velocityX;
                        break;

                    case "right":
                        self.targetX += self.velocityX;
                        break;
                    
                    default:
                        break;
                }
            },
            animation: function(data) {
                switch (self.direction) {
                    case "left":
                        if(data.animationFrame % 5 === 0) {
                            self.sprite = self.spriteAnimations.walkLeft.frames[self.spriteAnimations.walkLeft.currentFrame]; 
                            self.spriteAnimations.walkLeft.currentFrame ++;

                            // Reset current frame.
                            if(self.spriteAnimations.walkLeft.currentFrame > self.spriteAnimations.walkLeft.frames.length - 1) {
                                self.spriteAnimations.walkLeft.currentFrame = 0;
                            } 
                        }
                        break;
                        
                    case "right":
                        if(data.animationFrame % 5 === 0) {
                            self.sprite = self.spriteAnimations.walkRight.frames[self.spriteAnimations.walkRight.currentFrame]; 
                            self.spriteAnimations.walkRight.currentFrame ++;

                            // Reset current frame.
                            if(self.spriteAnimations.walkRight.currentFrame > self.spriteAnimations.walkRight.frames.length - 1) {
                                self.spriteAnimations.walkRight.currentFrame = 0;
                            } 
                        } 
                        break;

                    default:
                        break;
                }
            }
        },
    };

    this.currentState = self.states.standing;

    return this;
};