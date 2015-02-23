(function () {

	"use strict";

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

	window.addEventListener("load", function () {
		nwft.initialize(427, 240, init);
	});

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
			window.requestAnimationFrame(load);
		}
		else {
			scenes[currentScene].init();
			gameLoop();
		}

	}

	function update() {

		frames++;
		now = Date.now();
		globals.delta = (now - then)/1000;
		then = now;

		scenes[currentScene].update();

	}

	function draw() {

		var ctx = nwft.gpContext;
		ctx.clearRect(0, 0, nwft.GP_WIDTH, nwft.GP_HEIGHT);
		bufferCTX.clearRect(0, 0, BUFFER_WIDTH, BUFFER_HEIGHT);

		scenes[currentScene].draw(bufferCTX);

		ctx.imageSmoothingEnabled = false;
		ctx.drawImage(buffer, 0, 0, nwft.GP_WIDTH, nwft.GP_HEIGHT);
		ctx = nwft.tvContext;
		ctx.drawImage(buffer, 0, 0, nwft.TV_WIDTH, nwft.TV_HEIGHT);

	}

	function gameLoop() {

		update();
		draw();
		window.requestAnimationFrame(gameLoop);

	}

})();