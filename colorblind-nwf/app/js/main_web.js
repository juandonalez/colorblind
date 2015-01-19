(function () {

	"use strict";

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

		scenes.push(new Stage(0));
		scenes.push(new Stage(1));
		scenes.push(new Stage(2));
		scenes.push(new Stage(3));

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

		scenes[currentScene].update();

	}

	function drawGP(layer) {
		var ctx = nwft.gpContext;
		ctx.clearRect(0, 0, nwft.GP_WIDTH, nwft.GP_HEIGHT);
		bufferCTX.clearRect(0, 0, BUFFER_WIDTH, BUFFER_HEIGHT);

		scenes[currentScene].draw(layer, bufferCTX);

		ctx.imageSmoothingEnabled = false;
		ctx.drawImage(buffer, 0, 0, nwft.GP_WIDTH, nwft.GP_HEIGHT);
	}


	function drawTV(layer) {
		var ctx = nwft.tvContext;
		ctx.clearRect(0, 0, nwft.TV_WIDTH, nwft.TV_HEIGHT);
		bufferCTX.clearRect(0, 0, BUFFER_WIDTH, BUFFER_HEIGHT);

		scenes[currentScene].draw(layer, bufferCTX);

		ctx.imageSmoothingEnabled = false;
		ctx.drawImage(buffer, 0, 0, nwft.TV_WIDTH, nwft.TV_HEIGHT);
	}

	function gameLoop() {

		update();
		drawGP(0);
		drawTV(0);
		window.requestAnimationFrame(gameLoop);

	}

})();