var inputManager = inputManager || {};

(function() {

	inputManager.left = false;
	inputManager.up = false;
	inputManager.right = false;
	inputManager.down = false;

	window.addEventListener("keydown", keyDown, false);
	window.addEventListener("keyup", keyUp, false);

	// listener for keys pressed on keyboard
	// enter = 13
	// spacebar = 32
	// shift = 16
	// ctrl = 17
	// a - z = 65 - 90
	// 0 - 9 = 48 - 57
	// left, up, right, down = 37 - 40

	function keyDown(e) {

		var code;
		if (!e) var e = window.event;
		if (e.keyCode) code = e.keyCode;
		else if (e.which) code = e.which;

		if (code === 37) {
			inputManager.left = true;
		}

		if (code === 38) {
			inputManager.up = true;
		}

		if (code === 39) {
			inputManager.right = true;
		}

		if (code === 40) {
			inputManager.down = true;
		}

	}

	function keyUp(e) {

		var code;
		if (!e) var e = window.event;
		if (e.keyCode) code = e.keyCode;
		else if (e.which) code = e.which;

		if (code === 37) {
			inputManager.left = false;
			console.log("left up");
		}

		if (code === 38) {
			inputManager.up = false;
		}

		if (code === 39) {
			inputManager.right = false;
		}

		if (code === 40) {
			inputManager.down = false;
		}

	}

})();