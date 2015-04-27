(function () {

	"use strict";

	var then = Date.now( );
	var now;
	var frames = 0;
	var frameTimer = 0;

	var scenes = [
			new StageScene(),
			new StageScene(),
			new StageScene(),
			new StageScene()
	];

	var currentScene = 1;
	var splashScreen;

	window.onload = function() {

		splashScreen = new Image();
		splashScreen.onload = splashLoaded;
		splashScreen.src = "images/splashScreen.png";
	}

	function splashLoaded() {

		camera.fadeIn();
		gameLoop();

	}

	function gameLoop() {

		update();
		draw();
		window.webkitRequestAnimationFrame(gameLoop);

	}

	function update() {

		now = Date.now();
		globals.delta = (now - then)/1000;
		then = now;
		/*frames++;
		frameTimer += globals.delta;

		if (frameTimer >= 1) {
			console.log(frames);
			frames = 0;
			frameTimer = 0;
		}

		scenes[currentScene].update();*/

		camera.update();

	}

	function draw() {

		globals.gpCtx.clearRect(0, 0, globals.gpWidth, globals.gpHeight);
		globals.tvCtx.clearRect(0, 0, globals.tvWidth, globals.tvHeight);
		globals.bufferCtx.clearRect(0, 0, globals.bufferWidth, globals.bufferHeight);

		//scenes[currentScene].draw(2, 1, true);

		/*ctx.imageSmoothingEnabled = false;
		ctx.drawImage(buffer, 0, 0, gpCanvas.width, gpCanvas.height);
		ctx = tvCtx;
		ctx.drawImage(buffer, 0, 0, tvCanvas.width, tvCanvas.height);*/

		globals.bufferCtx.globalAlpha = 1;
		globals.bufferCtx.drawImage(splashScreen, 0, 0, globals.bufferWidth, globals.bufferHeight);
		camera.draw();
		globals.gpCtx.drawImage(globals.buffer, 0, 0, globals.gpWidth, globals.gpHeight);
		globals.tvCtx.drawImage(globals.buffer, 0, 0, globals.tvWidth, globals.tvHeight);

	}

})();