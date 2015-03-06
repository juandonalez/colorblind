(function () {

	"use strict";

	var then = Date.now( );
	var now;

	globals.tv = document.getElementById("canvas");
	globals.tvCtx = globals.tv.getContext("2d");

	var scene = new MenuScene();

	function update() {

		now = Date.now();
		globals.delta = (now - then)/1000;
		then = now;

		scene.update();

	}

	function draw() {

		globals.bufferCtx.clearRect(0, 0, globals.buffer.width, globals.buffer.height);
		globals.tvCtx.clearRect(0, 0, globals.tv.width, globals.tv.height);
		scene.draw();
		globals.tvCtx.drawImage(globals.buffer, 0, 0, globals.tv.width, globals.tv.height);

	}

	function gameLoop() {

		update();
		draw();
		window.requestAnimationFrame(gameLoop);

	}

	gameLoop();

})();