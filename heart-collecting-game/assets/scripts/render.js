var Render = (function() {
    // Render.init(data) function renders entities via background canvas context.
    // Thus, these entities live in background and will not interact with other entities.
    var init = function(data) {
        // Draw tree.
        _helper().drawEntity(data.entities.tree, data.canvas.bgCtx);

        // Draw cloud.
        data.entities.cloudList.forEach(function(cloud) {
            _helper().drawEntity(cloud, data.canvas.bgCtx);
        });
        
        // Draw ground.
        data.entities.ground.forEach(function(groundTile) {
            _helper().drawEntity(groundTile, data.canvas.bgCtx);
        });
    };
    
    // Render.update(data) function renders entities via foreground canvas context.
    // Thus, these entities live in foreground and will frequently interact with other entities,
    // and update game data.
    var update = function(data) {
        // Clear previous drawings.
        data.canvas.fgCtx.clearRect(0, 0, data.canvas.fgCanvas.width, data.canvas.fgCanvas.height);

        // Draw character.
        _helper().drawEntity(data.entities.character, data.canvas.fgCtx);
        
        // Draw stairs.
        data.entities.stairs.forEach(function(step) {
            _helper().drawEntity(step, data.canvas.bgCtx);
        });

        // Draw hearts.
        data.entities.heartList.forEach(function(heart) {
            _helper().drawEntity(heart, data.canvas.fgCtx);
        });

        // Draw score.
        var score = {
            content: "SCORE: " + data.entities.character.heartCollection,
            color: "black",
            font: "30px monospace",
            x: 50,
            y: 50
        }

        _helper().drawText(score, data.canvas.fgCtx);
    };

    // Private function _helper() contains methods that help draw entities on canvas.
    var _helper = function() {
        var drawEntity = function(entity, ctx) {
            ctx.drawImage(
                entity.sprite.img, 
                entity.sprite.srcX, 
                entity.sprite.srcY, 
                entity.sprite.srcWidth, 
                entity.sprite.srcHeight,
                entity.targetX,
                entity.targetY,
                entity.targetWidth,
                entity.targetHeight
            );
        };

        var drawText = function(text, ctx) {
            ctx.fillStyle = text.color;
            ctx.font = text.font;
            ctx.fillText(text.content, text.x, text.y);
        }

        return {
            drawEntity: drawEntity,
            drawText: drawText
        }
    };

    return {
        init: init,
        update: update
    }
})();