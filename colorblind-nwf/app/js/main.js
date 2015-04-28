var main = main || {};

(function () {

	"use strict";

	var then = Date.now( );
	var now;
	var frames = 0;
	var frameTimer = 0;

	var scenes = [
			new MenuScene(),
			new StageScene(),
			new StageScene(),
			new StageScene(),
			new MenuScene()
	];

	var currScene = 4;

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
		}*/

		scenes[currScene].update();
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

		scenes[currScene].draw(2, 1, true);
		camera.draw();

		globals.gpCtx.drawImage(globals.buffer, 0, 0, globals.gpWidth, globals.gpHeight);
		globals.tvCtx.drawImage(globals.buffer, 0, 0, globals.tvWidth, globals.tvHeight);

	}

	function startGame() {

		camera.fadeIn();
		gameLoop();
		setTimeout(function() {main.changeScene(0)}, 3000);

	}

	main.changeScene = function(scene) {

		console.log("change");

	}

	window.onload = function() {

		window.addEventListener('loaded', startGame, false);
		fm.loadScene(currScene);

	}

})();