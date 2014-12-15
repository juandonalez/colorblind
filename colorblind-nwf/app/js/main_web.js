(function () {

	"use strict";

	var GP_BUFFER_WIDTH = 854;
	var GP_BUFFER_HEIGHT = 480;
	var gpBuffer = document.createElement("canvas");
	gpBuffer.width = GP_BUFFER_WIDTH;
	gpBuffer.height = GP_BUFFER_HEIGHT;
	var gpBufferCTX = gpBuffer.getContext("2d");

	var TV_BUFFER_HEIGHT = 1920;
	var TV_BUFFER_WIDTH = 1080;
	var tvBuffer = document.createElement("canvas");
	tvBuffer.width = TV_BUFFER_WIDTH;
	tvBuffer.height = TV_BUFFER_HEIGHT;
	var tvBufferCTX = tvBuffer.getContext("2d");

	var scenes = [];
	var currentScene = 0;

	window.addEventListener("load", function () {
		nwft.initialize(480, 270, init);
	});

	function init() {

		scenes.push(new Stage(0));
		scenes.push(new Stage(1));
		scenes.push(new Stage(2));
		scenes.push(new Stage(3));

		currentScene = 1;
		scenes[currentScene].init();
		scenes[currentScene].begin();	//possibly see about how to wait for loading here

		window.requestAnimationFrame(loop);

	}

	function update() {

		scenes[currentScene].update();

	}

	function drawGP(layer) {
		var ctx = nwft.gpContext;
		ctx.clearRect(0, 0, nwft.GP_WIDTH, nwft.GP_HEIGHT);
		gpBufferCTX.clearRect(0, 0, GP_BUFFER_WIDTH, GP_BUFFER_HEIGHT);

		scenes[currentScene].draw(layer, gpBufferCTX);

		ctx.drawImage(gpBuffer, 0, 0, nwft.GP_WIDTH, nwft.GP_HEIGHT);
	}


	function drawTV() {
		/*var ctx = nwft.tvContext;
		ctx.clearRect(0, 0, nwft.TV_WIDTH, nwft.TV_HEIGHT);
		tvBufferCTX.clearRect(0, 0, TV_BUFFER_WIDTH, TV_BUFFER_HEIGHT);

		ctx.drawImage(tvBuffer, 0, 0, nwft.TV_WIDTH, nwft.TV_HEIGHT);*/
	}

	function loop() {

		update();
		drawGP(0);
		drawTV();
		window.requestAnimationFrame(loop);

	}

})();