// Include the entire script in the function and execute it immediately, to limit the scope to the file.
// 
(function () {

	// Strictly check for source code errors in the function.
	"use strict";

	var touchX = 0, touchY = 0;
	
	var GP_BUFFER_HEIGHT = 854;
	var GP_BUFFER_WIDTH = 480;
	var gpBuffer = document.createElement("canvas");
	gpBuffer.width = GP_BUFFER_WIDTH;
	gpBuffer.height = GP_BUFFER_HEIGHT;
	var gpBufferCTX = gpBuffer.getContext("2d");

	var TV_BUFFER_HEIGHT = 1920;
	var TV_BUFFER_WIDTH = 1080;
	var tvBuffer = document.createElement("canvas");
	tvBuffer.width = TV_BUFFER_WIDTH;
	tvBuffer.height = TV_BUFFER_HEIGHT;
	var tvBufferCTX = tvBuffer.getContext("2d");

	// Define the entry point for the demo.
	window.addEventListener("load", function () {

		// Call the initialization routine shared by tutorials from nwft.js.
		// Call start() when initialization is finished.
		nwft.initialize(480, 270, start);
	});

	// Start the demo.
	function start() {

		// Initialize the touch coordinates and start the main loop.
		// Initialize the mouse cursor position if running on a PC.
		touchX = nwft.GP_WIDTH / 2;
		touchY = nwft.GP_HEIGHT / 2;

		// Get the coordinates when the mouse moves on the GamePad canvas if running on a PC.
		nwft.gpCanvas.addEventListener("mousemove", function (e) {
			touchX = e.clientX;
			touchY = e.clientY;
		});

		window.requestAnimationFrame(loop);
	}

	// Draw the GamePad.
	function drawGP() {
		var ctx = nwft.gpContext;
		ctx.clearRect(0, 0, nwft.GP_WIDTH, nwft.GP_HEIGHT);
		gpBufferCTX.clearRect(0, 0, GP_BUFFER_WIDTH, GP_BUFFER_HEIGHT);

		ctx.drawImage(gpBuffer, 0, 0, nwft.GP_WIDTH, nwft.GP_HEIGHT);
	}

	// Draw the TV.
	function drawTV() {
		var ctx = nwft.tvContext;
		ctx.clearRect(0, 0, nwft.TV_WIDTH, nwft.TV_HEIGHT);
		tvBufferCTX.clearRect(0, 0, TV_BUFFER_WIDTH, TV_BUFFER_HEIGHT);

		ctx.drawImage(tvBuffer, 0, 0, nwft.TV_WIDTH, nwft.TV_HEIGHT);
	}

	// This code is the main loop of the demo.
	function loop() {

		// GamePad and TV rendering are split into separate functions.
		drawGP();
		drawTV();
		window.requestAnimationFrame(loop);
	}

	// Execute the function to limit the scope.
})();