/*
Original Author: Ian Thieves
Date: April 1st, 2017
*/

// open the PixelPals canvas
const FirebaseClient = require('firebase-client');
const fs = require('fs')
const firebase = new FirebaseClient({
	// this is for the default public canvas, change the suffix to your own canvas
	// e.g. https://pixelpals-server.firebaseio.com/123456
  url: 'https://pixelpals-server.firebaseio.com/public'
});

// read a single pixel from an ndarray
function getPixel(x, y, pixels) {
    var out = [];
    var pointer = pixels.offset + (pixels.stride[0] * x) + (pixels.stride[1] * y);

    for(var i=0; i<4; i++) {
        out.push(pixels.data[pointer + (pixels.stride[2] * i)]);
    }

    return out;
}

var getPixels = require("get-pixels")
// starting offsets (top left is origin (0,0))
var x = (process.argv.length < 5) ? 0 : parseInt(process.argv[3]);
var y = (process.argv.length < 5) ? 0 : parseInt(process.argv[4]);
// maximum dimensions of the canvas (to prevent overruns)
var width = 150;
var height = 120;

// read a gif, png, or jpg into an ndarray
getPixels(process.argv[2], function(err, pixels) {
  if(err) {
    console.log("Bad image path")
    return
  }

  // create an object to store all changed pixels
  // this way the server receives one large update, rather than being spammed for every pixel
  const obj = {};
  for(var i=0; i<pixels.shape[0]&&i<height; i++){
	for(var j=0; j<pixels.shape[1]&&j<width; j++){
		// log and add the pixel to output array
		var pix = getPixel(j,i,pixels);
		console.log('#'+pix[0].toString(16)+pix[1].toString(16)+pix[2].toString(16));
		obj[(i+x)*150+(j+y)]='#'+pix[0].toString(16)+pix[1].toString(16)+pix[2].toString(16);
	}
  }
	// send the pixel update to the server
	firebase.update('/public', obj);
	// getPixels info
    // console.log("got pixels", pixels.shape.slice());
})
	

