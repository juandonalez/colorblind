var main = main || {};

(function () {

	"use strict";

	var then;
	var now;
	var frames = 0;
	var frameTimer = 0;

	var running = false;

	function update() {

		now = Date.now();
		globals.delta = (now - then)/1000;
		then = now;

		if (globals.delta > 0.15) {
			globals.delta = 0.15;
		}

		if (globals.debugMode && globals.debug.fpsCounter) {
			frames++;
			frameTimer += globals.delta;

			if (frameTimer >= 1) {
				console.log(frames);
				frames = 0;
				frameTimer = 0;
			}
		}

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

		update();
		draw();
		window.requestAnimationFrame(gameLoop);

	}

	function startGame() {

		window.removeEventListener('loaded', startGame, false);

		globals.scenes = {
			splashScreen: new Scene("splashScreen"),
			mainMenu: new Scene("mainMenu"),
			stage1: new Scene("stage1")//,
			//stage2: new Scene("stage2"),
			//stage3: new Scene("stage3")
		};

		globals.player1 = new Player(1);

		if (globals.debugMode) {
			globals.currScene = globals.scenes[globals.debug.startScene];
			globals.currScene.start();
			running = true;
		}
		else {
			globals.currScene = globals.scenes["splashScreen"];
			globals.currScene.start();
			setTimeout(function() {main.changeScene("mainMenu");}, 2000);
		}

		then = Date.now();
		gameLoop();
		camera.fadeIn();

	}

	main.changeScene = function(scene) {

		running = false;
		camera.fadeOut();
		setTimeout(function() {
			globals.currScene = globals.scenes[scene];
			globals.currScene.start();
			running = true;
			camera.fadeIn();
		}, 2000);

	}

	window.onload = function() {

		window.addEventListener('loaded', startGame, false);
		fileManager.loadFiles();

	}

})();