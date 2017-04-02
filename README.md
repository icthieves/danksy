# Danksy (A PixelPals Stencil for Node\.js)

After a night of ~~googling~~ *Learning* Node\.js, I wrote a simple script that paints a picture to a [PixelPals](https://github.com/eternalthinker/pixelpals) canvas.

[This was the result](https://youtu.be/BYCcExb9uqs)
	
Usage: 
```javascript
node danksy.js "Abolute/path/to/image.png" [x-offset y-offset [canvasid]]
```

Features:

 * Uses [getpixels](https://www.npmjs.com/package/get-pixels), meaning it works with PNG, GIF, and JPG.
 * Writes the entire canvas in a single update to help prevent spamming the server.
 * Supports arbitrary canvasIDs (defaults to public). Must specify offsets explicitly, then canvasID.
 * Fun!


### Dependencies:

 * [getpixels](https://www.npmjs.com/package/get-pixels) for reading images
 * [firebase-client](https://github.com/jpstevens/firebase-client) for actually connecting and sending updates