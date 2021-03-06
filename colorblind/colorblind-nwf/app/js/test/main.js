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

	function update() {level.update()}

	function draw() {

		canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.clearRect(0, 0, 1280, 720);

		level.draw();

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