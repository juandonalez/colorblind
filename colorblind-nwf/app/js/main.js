(function () {

	"use strict";

	var then = Date.now( );
	var now;
	var frames = 0;
	var frameTimer = 0;

	/*var BUFFER_WIDTH = 1280;
	var BUFFER_HEIGHT = 720;
	var buffer = document.createElement("canvas");
	buffer.width = BUFFER_WIDTH;
	buffer.height = BUFFER_HEIGHT;
	var bufferCTX = buffer.getContext("2d");*/

	var scenes = [];
	var currentScene = 0;

	function init() {

		/*scenes.push(new StageScene(0));
		//change to menu scene later
		scenes.push(new StageScene(1));
		scenes.push(new StageScene(2));
		scenes.push(new StageScene(3));

		currentScene = 1;
		fileManager.loadScene(currentScene);*/
		load();

	}

	function load() {

		/*if (fileManager.isLoading()) {
			window.webkitRequestAnimationFrame(load);
		}
		else {
			scenes[currentScene].init();
			gameLoop();
		}*/
console.log("start");
		if (fm.isLoaded()) {
			console.log(fm.tilesets);
			console.log(fm.levels);
		}
		else {
		console.log("...");
			window.webkitRequestAnimationFrame(load);
		}

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
		frames++;
		frameTimer += globals.delta;

		if (frameTimer >= 1) {
			console.log(frames);
			frames = 0;
			frameTimer = 0;
		}

		scenes[currentScene].update();

	}

	function draw() {

		/*var ctx = gpCtx;
		ctx.clearRect(0, 0, gpCanvas.width, gpCanvas.height);
		bufferCTX.clearRect(0, 0, BUFFER_WIDTH, BUFFER_HEIGHT);*/

		scenes[currentScene].draw(2, 1, true);

		/*ctx.imageSmoothingEnabled = false;
		ctx.drawImage(buffer, 0, 0, gpCanvas.width, gpCanvas.height);
		ctx = tvCtx;
		ctx.drawImage(buffer, 0, 0, tvCanvas.width, tvCanvas.height);*/

	}

	init();

})();