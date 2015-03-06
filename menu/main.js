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

		scene.draw();

	}

	function gameLoop() {

		update();
		draw();
		window.requestAnimationFrame(gameLoop);

	}

	gameLoop();

})();