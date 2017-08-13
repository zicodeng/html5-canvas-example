# HTML5 Canvas Animation

This folder demonstrates how to use HTML5 canvas to create fancy animation on a web page.

## Canvas animation:
The idea behind canvas animation is that the canvas keeps refreshing in a fast speed (60 times/sec) and updating object position each time. 

Traditionally to create an animation, we relied on `setTimeout()` called recursively or `setInterval()` to repeatedly execute some code to change the object position. 

However, this method causes delay, consumes too much resource, and is inefficient.
    
`window.requestAnimationFrame()` is a refined method for creating animation. When this method is called, it tells the browser to get ready to handle animation. 

The code is executed on the next "available" screen repaint, instead of relying on user-defined interval time, which results in smoothier and more efficient animation.