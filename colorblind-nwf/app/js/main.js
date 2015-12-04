var main = main || {};

(function () {

	"use strict";

	var prevTick, prevFrame, now, elapsed;
	var interval = Math.round(1000/globals.fps);

	var frames = 0;
	var fpsTimer = 0;

	var running = false;

	function update() {

		if (running) {
			globals.currScene.update();
		}

		camera.update();

	}

	function draw() {

		globals.gpCtx.clearRect(0, 0, globals.gpWidth, globals.gpHeight);
		globals.tvCtx.clearRect(0, 0, globals.tvWidth, globals.tvHeight);
		globals.bufferCtx.clearRect(0, 0, globals.gameWidth, globals.gameHeight);

		globals.currScene.draw();
		camera.draw();

	}

	function gameLoop() {

		// get the time since last tick.
		// if it is over the fps lock then update and draw
		now = Date.now();
		elapsed = (now - prevTick);

		if (elapsed >= interval) {

			prevTick = now - (elapsed % interval);
			globals.delta = elapsed/1000;
			frames++;

			if (globals.delta > 0.5) {
				globals.delta = 0.5;
			}

			update();
			draw();

		}

		// get time since last frame.
		// if it is over 1 second then output the number of frames
		fpsTimer += (now - prevFrame);
		prevFrame = now;

		if (fpsTimer >= 1000) {
			if (globals.debugMode && globals.debug.fpsCounter) {
				console.log(frames);
			}
			frames = 0;
			fpsTimer = 0;
		}

		window.requestAnimationFrame(gameLoop);

	}

	function startGame() {

		window.removeEventListener('loaded', startGame, false);

		globals.scenes = {
			splashScreen: new Scene("splashScreen"),
			mainMenu: new Scene("mainMenu"),
			stage1: new Scene("stage1"),
			stage2: new Scene("stage2")
		};

		globals.player0 = new Player(0);
		globals.player1 = new Player(1);
		globals.player2 = new Player(2);

		if (globals.debugMode) {
			globals.currScene = globals.scenes[globals.debug.startScene];
			globals.currScene.activate();
			running = true;
		}
		else {
			globals.currScene = globals.scenes["splashScreen"];
			globals.currScene.activate();
			setTimeout(function() {main.changeScene("mainMenu");}, 2000);
		}

		prevTick = Date.now();
		prevFrame = Date.now();
		gameLoop();
		camera.fadeIn();

	}

	main.changeScene = function(scene) {

		running = false;
		camera.fadeOut();
		globals.currScene.deactivate();
		setTimeout(function() {
			globals.currScene = globals.scenes[scene];
			globals.currScene.activate();
			running = true;
			camera.fadeIn();
		}, 2000);

	}

	window.onload = function() {

		window.addEventListener('loaded', startGame, false);
		fileManager.loadFiles();

	}

})();