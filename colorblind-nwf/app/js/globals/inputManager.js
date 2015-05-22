var inputManager = inputManager || {};

(function() {

	inputManager.active = true;

	inputManager.left1 = false;
	inputManager.up1 = false;
	inputManager.right1 = false;
	inputManager.down1 = false;
	inputManager.confirm1 = false;
	inputManager.cancel1 = false;

	window.addEventListener("keydown", keyDown, false);
	window.addEventListener("keyup", keyUp, false);

	// listener for keys pressed on keyboard
	// enter = 13
	// spacebar = 32
	// shift = 16
	// ctrl = 17
	// esc = 27
	// a - z = 65 - 90
	// 0 - 9 = 48 - 57
	// left, up, right, down = 37 - 40

	function keyDown(e) {

		var code;
		if (!e) var e = window.event;
		if (e.keyCode) code = e.keyCode;
		else if (e.which) code = e.which;

		if (code === 37) {
			inputManager.left1 = true;
		}

		if (code === 38) {
			inputManager.up1 = true;
		}

		if (code === 39) {
			inputManager.right1 = true;
		}

		if (code === 40) {
			inputManager.down1 = true;
		}

		if (code === 13) {
			inputManager.confirm1 = true;
		}

		if (code === 27) {
			inputManager.cancel1 = true;
		}

	}

	function keyUp(e) {

		var code;
		if (!e) var e = window.event;
		if (e.keyCode) code = e.keyCode;
		else if (e.which) code = e.which;

		if (code === 37) {
			inputManager.left1 = false;
		}

		if (code === 38) {
			inputManager.up1 = false;
		}

		if (code === 39) {
			inputManager.right1 = false;
		}

		if (code === 40) {
			inputManager.down1 = false;
		}

		if (code === 13) {
			inputManager.confirm1 = false;
		}

		if (code === 27) {
			inputManager.cancel1 = false;
		}

	}

})();