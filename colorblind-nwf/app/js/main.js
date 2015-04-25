(function () {

	"use strict";

	var displayManager = nwf.display.DisplayManager.getInstance();
		
	var gpDisplay = displayManager.getGamePadDisplay();
	var tvDisplay = displayManager.getTVDisplay();
	
	var gpCanvas = document.getElementById('gpCanvas');
	gpCanvas.width = 854;
	gpCanvas.height = 480;
	var gpCtx = gpCanvas.getContext('2d');

	var tvCanvas = tvDisplay.window.document.getElementById('tvCanvas');
	tvCanvas.height = 720;
	tvCanvas.width = (720/9)*16;
	var tvCtx = tvCanvas.getContext('2d');

	var then = Date.now( );
	var now;

	var BUFFER_WIDTH = 1280;
	var BUFFER_HEIGHT = 720;
	var buffer = document.createElement("canvas");
	buffer.width = BUFFER_WIDTH;
	buffer.height = BUFFER_HEIGHT;
	var bufferCTX = buffer.getContext("2d");

	var scenes = [];
	var currentScene = 0;

	function init() {

		scenes.push(new StageScene(0));
		//change to menu scene later
		scenes.push(new StageScene(1));
		scenes.push(new StageScene(2));
		scenes.push(new StageScene(3));

		currentScene = 1;
		fileManager.loadScene(currentScene);
		load();

	}

	function load() {

		if (fileManager.isLoading()) {
			window.webkitRequestAnimationFrame(load);
		}
		else {
			scenes[currentScene].init();
			gameLoop();
		}

	}

	function gameLoop() {

		update();
		draw();
		window.webkitRequestAnimationFrame(gameLoop);

	}

	function update() {

		frames++;
		now = Date.now();
		globals.delta = (now - then)/1000;
		then = now;

		scenes[currentScene].update();

	}

	function draw() {

		var ctx = gpCtx;
		ctx.clearRect(0, 0, gpCanvas.width, gpCanvas.height);
		bufferCTX.clearRect(0, 0, BUFFER_WIDTH, BUFFER_HEIGHT);

		scenes[currentScene].draw(2, 1, true, bufferCTX, buffer);

		ctx.imageSmoothingEnabled = false;
		ctx.drawImage(buffer, 0, 0, gpCanvas.width, gpCanvas.height);
		ctx = tvCtx;
		ctx.drawImage(buffer, 0, 0, tvCanvas.width, tvCanvas.height);

	}

	init();

})();