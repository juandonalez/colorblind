var main = main || {};

(function () {

	"use strict";

	var then = Date.now( );
	var now;
	var frames = 0;
	var frameTimer = 0;

	var scenes = {
		"splashScreen": new MenuScene("splashScreen"),
		"mainMenu": new MenuScene("mainMenu")//,
		//"stage1": new StageScene("stage1"),
		//"stage2": new StageScene("stage2"),
		//"stage3": new StageScene("stage3")
	};

	var currScene = "splashScreen";
	var running = false;

	function gameLoop() {

		update();
		draw();
		//window.webkitRequestAnimationFrame(gameLoop);
		window.requestAnimationFrame(gameLoop);

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

		if (running) {
			scenes[currScene].update();
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

		scenes[currScene].draw(2, 1, true);
		camera.draw();

		globals.gpCtx.drawImage(globals.buffer, 0, 0, globals.gpWidth, globals.gpHeight);
		//globals.tvCtx.drawImage(globals.buffer, 0, 0, globals.tvWidth, globals.tvHeight);

	}

	function startGame() {

		//window.removeEventListener('loaded', startGame, false);
		//scenes[currScene] = new MenuScene(currScene);
		camera.fadeIn();
		gameLoop();
		setTimeout(function() {main.changeScene("mainMenu")}, 3000);

	}

	main.changeScene = function(scene) {

		running = false;
		camera.fadeOut();
		currScene = "mainMenu";
		setTimeout(function() {camera.fadeIn(); running = true}, 3000);
		// maybe have fader event listener to tell us that it's finished. could also be used to signal end of animation, say when a character dies

	}

	window.onload = function() {

		//window.addEventListener('loaded', startGame, false);
		//fileManager.loadScene(currScene);
		startGame();

	}

})();