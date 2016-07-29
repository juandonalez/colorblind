var main = main || {};

(function () {

	"use strict";

	var isWiiU = window.nwf && nwf.system && nwf.system.isWiiU();
	window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;

	var image = new Image();
	image.onload = gameLoop;
	image.src = "serveimage.jpg";

	if (isWiiU) {
		var displayManager = nwf.display.DisplayManager.getInstance();
		var gp = displayManager.getGamePadDisplay();

		var gpHeight = gp.height;
		var gpWidth = gp.width;

		var gpCanvas = gp.window.document.getElementById('gpCanvas');
		var gpCtx = gpCanvas.getContext("2d");

		var tv = displayManager.getTVDisplay();

		var tvHeight = tv.height;
		var tvWidth = tv.width;

		var tvCanvas = tv.window.document.getElementById('tvCanvas');
		var tvCtx = tvCanvas.getContext("2d");

		tv.setViewport(0, 0, tvWidth, tvHeight);
		gp.setViewport(0, tvHeight, gpWidth, gpHeight);

		console.log(gp);
		console.log(tv);
	}
	else {
		var gpHeight = 480;
		var gpWidth = 854;

		var gpCanvas = window.document.getElementById('gpCanvas');
		var gpCtx = gpCanvas.getContext("2d");

		var tvHeight = 1080;
		var tvWidth = 1920;

		var tvCanvas = window.document.getElementById('tvCanvas');
		var tvCtx = tvCanvas.getContext("2d");
	}

	function update() {}

	function draw() {

		gpCtx.clearRect(0, 0, gpWidth, gpHeight);
		tvCtx.clearRect(0, 0, tvWidth, tvHeight);

		gpCtx.drawImage(image, 0, 0, gpWidth, gpHeight);
		//gp.paintContext2D();

		//tvCtx.drawImage(image, -107, 0, 854, tvHeight);
		tvCtx.drawImage(image, 0, 0, tvWidth, tvHeight);
		//tv.paintContext2D();

	}

	function gameLoop() {

		update();
		draw();

		window.requestAnimationFrame(gameLoop);

	}

})();