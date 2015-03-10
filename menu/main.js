(function () {

	"use strict";

	var then = Date.now( );
	var now;

	globals.tv = document.getElementById("canvas");
	globals.tvCtx = globals.tv.getContext("2d");

	globals.currentScene = new MenuScene();

	window.addEventListener("keyup", keyUp, false);

	// listener for keys pressed on keyboard
	// enter = 13
	// spacebar = 32
	// shift = 16
	// ctrl = 17
	// a - z = 65 - 90
	// 0 - 9 = 48 - 57
	// left, up, right, down = 37 - 40
	function keyUp(e) {

		var code;
		if (!e) var e = window.event;
		if (e.keyCode) code = e.keyCode;
		else if (e.which) code = e.which;

		if (code === 13) {
			globals.letsdothis = true;
		}

	}

	function update() {

		now = Date.now();
		globals.delta = (now - then)/1000;
		then = now;

		globals.currentScene.update();

	}

	function draw() {

		globals.bufferCtx.clearRect(0, 0, globals.buffer.width, globals.buffer.height);
		globals.tvCtx.clearRect(0, 0, globals.tv.width, globals.tv.height);
		globals.currentScene.draw();
		globals.tvCtx.drawImage(globals.buffer, 0, 0, globals.tv.width, globals.tv.height);

	}

	function gameLoop() {

		update();
		draw();
		window.requestAnimationFrame(gameLoop);

	}

	gameLoop();

})();