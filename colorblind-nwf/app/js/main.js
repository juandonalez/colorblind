var main = main || {};

(function () {

	"use strict";

	var then = Date.now( );
	var now;
	var frames = 0;
	var frameTimer = 0;

	var running = false;

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

		if (running) {
			globals.scenes[globals.currScene].update();
		}

		camera.update();

	}

	function draw() {

		globals.gpCtx.clearRect(0, 0, globals.gpWidth, globals.gpHeight);
		//globals.tvCtx.clearRect(0, 0, globals.tvWidth, globals.tvHeight);
		globals.bufferCtx.clearRect(0, 0, globals.bufferWidth, globals.bufferHeight);

		//scenes[currentScene].draw(2, 1, true);

		/*ctx.imageSmoothingEnabled = false;
		ctx.drawImage(buffer, 0, 0, gpCanvas.width, gpCanvas.height);
		ctx = tvCtx;
		ctx.drawImage(buffer, 0, 0, tvCanvas.width, tvCanvas.height);*/

		globals.scenes[globals.currScene].draw(2, 1, true);
		camera.draw();

		globals.gpCtx.drawImage(globals.buffer, 0, 0, globals.gpWidth, globals.gpHeight);
		//globals.tvCtx.drawImage(globals.buffer, 0, 0, globals.tvWidth, globals.tvHeight);

	}

	function gameLoop() {

		update();
		draw();
		//window.webkitRequestAnimationFrame(gameLoop);
		window.requestAnimationFrame(gameLoop);

	}

	function startGame() {

		window.removeEventListener('loaded', startGame, false);

		globals.scenes = {
			"splashScreen": new MenuScene("splashScreen"),
			"mainMenu": new MenuScene("mainMenu"),
			"stage1": new StageScene("stage1")//,
			//"stage2": new StageScene("stage2"),
			//"stage3": new StageScene("stage3")
		};

		gameLoop();
		camera.fadeIn();
		//setTimeout(function() {main.changeScene("mainMenu");}, 2000);
		setTimeout(function() {main.changeScene("stage1");}, 2000);

	}

	main.changeScene = function(scene) {

		running = false;
		camera.fadeOut();
		setTimeout(function() {
			globals.currScene = scene;
			running = true;
			camera.fadeIn();
		}, 1000);

	}

	window.onload = function() {

		window.addEventListener('loaded', startGame, false);
		fileManager.loadFiles();

	}

})();