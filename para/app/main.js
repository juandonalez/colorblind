var main = main || {};

var globals = {};
globals.tileSize = 40;

(function () {

	"use strict";

	window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;

	var prev = Date.now();
	var now = 0;
	var elapsed = 0;
	var frames = 0;
	var fpsTimer = 0;

	var level;

	var request = new XMLHttpRequest();
	request.overrideMimeType("application/json");
	request.open("GET", "test.json", false);
	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			level = new Level(JSON.parse(request.response));
		}
	}
	request.send();

	var image = new Image();
	image.onload = gameLoop;
	image.src = "serveimage.png";

	/*var displayManager = nwf.display.DisplayManager.getInstance();
	var gp = displayManager.getGamePadDisplay();

	var gpHeight = gp.height;
	var gpWidth = gp.width;

	var gpCtx = gp.getContext2D();
	gpCtx.width = gpWidth;
	gpCtx.height = gpHeight;

	var tv = displayManager.getTVDisplay();

	var tvHeight = tv.height;
	var tvWidth = tv.width;

	var tvCtx = tv.getContext2D();
	tvCtx.width = tvWidth;
	tvCtx.height = tvHeight;*/

	var canvas = document.getElementById("canvas");
	canvas.width = 640;
	canvas.height = 360;
	var canvasCtx = canvas.getContext("2d");

	var buffer = document.createElement("canvas");
	buffer.width = 1280;
	buffer.height = 720;
	var ctx = buffer.getContext("2d");

	function update() {}

	function draw() {

		/*gpCtx.clearRect(0, 0, gpWidth, gpHeight);
		tvCtx.clearRect(0, 0, tvWidth, tvHeight);
		ctx.clearRect(0, 0, 1280, 720);

		level.draw(ctx, image, 0);
		level.draw(ctx, image, 1);
		level.draw(ctx, image, 2);
		level.draw(ctx, image, 3);

		gpCtx.drawImage(buffer, 0, 0, gpWidth, gpHeight);
		gp.paintContext2D();

		tvCtx.drawImage(buffer, 0, 0, tvWidth, tvHeight);
		tv.paintContext2D();*/

		canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.clearRect(0, 0, 1280, 720);

		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, 1280, 720);

		canvasCtx.drawImage(buffer, 0, 0, canvas.width, canvas.height);

	}

	function gameLoop() {

		now = Date.now();
		elapsed = (now - prev);
		prev = now;
		frames++;
		fpsTimer += elapsed;
		if (fpsTimer >= 1000) {
			//console.log(frames);
			frames = 0;
			fpsTimer = 0;
		}

		update();
		draw();

		window.requestAnimationFrame(gameLoop);

	}

})();