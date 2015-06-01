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
		//globals.tvCtx.clearRect(0, 0, globals.tvWidth, globals.tvHeight);
		globals.bufferCtx.clearRect(0, 0, globals.bufferWidth, globals.bufferHeight);

		//scenes[currentScene].draw(2, 1, true);

		/*ctx.imageSmoothingEnabled = false;
		ctx.drawImage(buffer, 0, 0, gpCanvas.width, gpCanvas.height);
		ctx = tvCtx;
		ctx.drawImage(buffer, 0, 0, tvCanvas.width, tvCanvas.height);*/

		globals.currScene.draw(2, 1, true);
		camera.draw();

		globals.gpCtx.drawImage(globals.buffer, 0, 0, globals.gpWidth, globals.gpHeight);

		if (globals.isWiiU) {
			globals.tvCtx.drawImage(globals.buffer, globals.tvOffset, 0, Math.ceil((globals.tvHeight/9)*16), globals.tvHeight);
		}

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

		if (globals.debugMode) {
			globals.currScene = globals.scenes[globals.debug.startScene];
			running = true;
		}
		else {
			globals.currScene = globals.scenes["splashScreen"];
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
			running = true;
			camera.fadeIn();
		}, 1000);

	}

	window.onload = function() {

		window.addEventListener('loaded', startGame, false);
		fileManager.loadFiles();

	}

})();