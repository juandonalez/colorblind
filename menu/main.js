(function () {

	"use strict";

	var then = Date.now( );
	var now;

	globals.tv = document.getElementById("canvas");
	globals.tvCtx = globals.tv.getContext("2d");

	globals.currentScene = new MenuScene();

	function update() {

		now = Date.now();
		globals.delta = (now - then)/1000;
		then = now;

		globals.currentScene.update();
		camera.update();

	}

	function draw() {

		globals.bufferCtx.clearRect(0, 0, globals.buffer.width, globals.buffer.height);
		globals.tvCtx.clearRect(0, 0, globals.tv.width, globals.tv.height);
		globals.currentScene.draw();
		globals.tvCtx.drawImage(globals.buffer, 0, 0, globals.tv.width, globals.tv.height);
		camera.draw();

	}

	function gameLoop() {

		update();
		draw();
		window.requestAnimationFrame(gameLoop);

	}

	gameLoop();

})();