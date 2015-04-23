// Define the namespace for this Nintendo Web Framework Tutorial.
// Call nwft.js from main.js via an nwft object.
var nwft = nwft || {};

// Include the entire script in the function and execute it immediately, to limit the scope to the file.
// 
(function () {

	// Strictly check for source code errors in the function.
	"use strict";

	// This function initializes processes shared by tutorials.
	// Specify TV resolution and callback functions.
	nwft.initialize = function (tvWidth, tvHeight, callback) {

		// Determine whether the demo is running on a Wii U or being emulated on a PC.
		nwft.isWiiU = window.nwf && nwf.system && nwf.system.isWiiU();

		// Ensure that requestAnimationFrame runs on Wii U consoles and PCs.
		window.requestAnimationFrame =
			window.webkitRequestAnimationFrame || window.requestAnimationFrame;

		initializeCanvas(tvWidth, tvHeight, callback);
	};

	// Initialize the canvas.
	// Specify TV resolution and callback functions.
	function initializeCanvas(tvWidth, tvHeight, callback) {
		//nwft.GP_WIDTH = 854;
		//nwft.GP_HEIGHT = 480;
		nwft.GP_WIDTH = 427;
		nwft.GP_HEIGHT = 240;
		nwft.TV_WIDTH = tvWidth;
		nwft.TV_HEIGHT = tvHeight;

		nwft.gpCanvas = window.document.getElementById("gpCanvas");
		nwft.gpCanvas.width = nwft.GP_WIDTH;
		nwft.gpCanvas.height = nwft.GP_HEIGHT;
		nwft.gpContext = nwft.gpCanvas.getContext("2d");

		// Initialize the TV canvas and rendering context.
		// Initalization differs for the Wii U and a PC.
		if (nwft.isWiiU) {
			var tv = nwf.display.DisplayManager.getInstance().getTVDisplay();

			tv.addEventListener("load", function () {
				nwft.tvCanvas = tv.window.document.getElementById("tvCanvas");
				nwft.tvCanvas.width = tvWidth;
				nwft.tvCanvas.height = tvHeight;
				nwft.tvContext = nwft.tvCanvas.getContext("2d");

				callback();
			});

			tv.load("TV.html");
		} else {

			// Display a hidden canvas if run on a PC.
			nwft.tvCanvas = window.document.getElementById("tvCanvas");
			nwft.tvCanvas.width = nwft.TV_WIDTH;
			nwft.tvCanvas.height = nwft.TV_HEIGHT;
			nwft.tvCanvas.className = "show";
			nwft.tvContext = nwft.tvCanvas.getContext("2d");

			callback();
		}
	}

	// Execute the function to limit the scope.
})();
