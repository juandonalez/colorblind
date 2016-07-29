var inputManager = inputManager || {};

(function() {

	inputManager.active = true;

	inputManager.left1 = false;
	inputManager.up1 = false;
	inputManager.right1 = false;
	inputManager.down1 = false;
	inputManager.confirm1 = false;
	inputManager.canConfirm1 = true;
	inputManager.cancel1 = false;
	inputManager.canCancel1 = true;
	inputManager.pause1 = false;

	inputManager.left2 = false;
	inputManager.up2 = false;
	inputManager.right2 = false;
	inputManager.down2 = false;
	inputManager.confirm2 = false;
	inputManager.canConfirm2 = true;
	inputManager.cancel2 = false;
	inputManager.canCancel2 = true;
	inputManager.pause2 = false;

	if (globals.isWiiU) {
		inputManager.gamePad = nwf.input.WiiUGamePad.getController();
		inputManager.wiimote = nwf.input.WiiRemote.getController(nwf.input.WiiRemote.REMOTE_1);
		inputManager.pro = nwf.input.WiiUProController.getController();
		inputManager.gpLStick = inputManager.gamePad.leftStick;
		inputManager.proLStick = inputManager.pro.leftStick;
		inputManager.gpLStick.addEventListener(nwf.events.MovementControlEvent.MOVE, onGPMove, this);
		inputManager.proLStick.addEventListener(nwf.events.MovementControlEvent.MOVE, onProMove, this);
	}

	window.addEventListener("keydown", onKeyPress, false);
	window.addEventListener("keyup", onKeyRelease, false);

	inputManager.isConnected1 = function() {

		if (globals.isWiiU) {
			return inputManager.gamePad.connected;
		}
		else {
			return true;
		}

	}

	inputManager.isConnected2 = function() {

		if (globals.isWiiU) {
			return inputManager.wiimote.connected || inputManager.pro.connected;
		}
		else {
			return true;
		}

	}

	inputManager.onPress = function(button) {

		// player 1
		if (button === "left1") {
			inputManager.left1 = true;
		}
		if (button === "up1") {
			inputManager.up1 = true;
		}
		if (button === "right1") {
			inputManager.right1 = true;
		}
		if (button === "down1") {
			inputManager.down1 = true;
		}
		if (button === "confirm1") {
			if (inputManager.canConfirm1) {
				inputManager.confirm1 = true;
				inputManager.canConfirm1 = false;
			}
			else {
				inputManager.confirm1 = false;
			}
		}
		if (button === "cancel1") {
			if (inputManager.canCancel1) {
				inputManager.cancel1 = true;
				inputManager.canCancel1 = false;
			}
			else {
				inputManager.cancel1 = false;
			}
		}
		if (button === "pause1") {
			inputManager.pause1 = true;
		}

		// player 2
		if (button === "left2") {
			inputManager.left2 = true;
		}
		if (button === "up2") {
			inputManager.up2 = true;
		}
		if (button === "right2") {
			inputManager.right2 = true;
		}
		if (button === "down2") {
			inputManager.down2 = true;
		}
		if (button === "confirm2") {
			if (inputManager.canConfirm2) {
				inputManager.confirm2 = true;
				inputManager.canConfirm2 = false;
			}
			else {
				inputManager.confirm2 = false;
			}
		}
		if (button === "cancel2") {
			if (inputManager.canCancel2) {
				inputManager.cancel2 = true;
				inputManager.canCancel2 = false;
			}
			else {
				inputManager.cancel2 = false;
			}
		}

	}

	inputManager.onRelease = function(button) {

		// player 1
		if (button === "left1") {
			inputManager.left1 = false;
		}

		if (button === "up1") {
			inputManager.up1 = false;
		}

		if (button === "right1") {
			inputManager.right1 = false;
		}

		if (button === "down1") {
			inputManager.down1 = false;
		}

		if (button === "confirm1") {
			inputManager.confirm1 = false;
			inputManager.canConfirm1 = true;
		}

		if (button === "cancel1") {
			inputManager.cancel1 = false;
			inputManager.canCancel1 = true;
		}

		if (button === "pause1") {
			inputManager.pause1 = false;
		}

		// player 2
		if (button === "left2") {
			inputManager.left2 = false;
		}

		if (button === "up2") {
			inputManager.up2 = false;
		}

		if (button === "right2") {
			inputManager.right2 = false;
		}

		if (button === "down2") {
			inputManager.down2 = false;
		}

		if (button === "confirm2") {
			inputManager.confirm2 = false;
			inputManager.canConfirm2 = true;
		}

		if (button === "cancel2") {
			inputManager.cancel2 = false;
			inputManager.canCancel2 = true;
		}

	}

	// listener for keys pressed on keyboard
	// enter = 13
	// spacebar = 32
	// shift = 16
	// ctrl = 17
	// esc = 27
	// a - z = 65 - 90
	// 0 - 9 = 48 - 57
	// left, up, right, down = 37 - 40

	function onKeyPress(e) {

		var code;
		if (!e) var e = window.event;
		if (e.keyCode) code = e.keyCode;
		else if (e.which) code = e.which;

		if (code === 37) {
			inputManager.onPress("left1");
		}
		if (code === 38) {
			inputManager.onPress("up1");
		}
		if (code === 39) {
			inputManager.onPress("right1");
		}
		if (code === 40) {
			inputManager.onPress("down1");
		}
		if (code === 32) {
			inputManager.onPress("confirm1");
		}
		if (code === 27) {
			inputManager.onPress("cancel1");
		}
		if (code === 13) {
			inputManager.onPress("pause1");
		}
		if (code === 65) {
			inputManager.onPress("left2");
		}
		if (code === 87) {
			inputManager.onPress("up2");
		}
		if (code === 68) {
			inputManager.onPress("right2");
		}
		if (code === 83) {
			inputManager.onPress("down2");
		}
		if (code === 16) {
			inputManager.onPress("confirm2");
		}
		if (code === 112) {
			inputManager.onPress("cancel2");
		}
		if (code === 8) {
			inputManager.onPress("pause2");
		}

	}

	function onKeyRelease(e) {

		var code;
		if (!e) var e = window.event;
		if (e.keyCode) code = e.keyCode;
		else if (e.which) code = e.which;

		if (code === 37) {
			inputManager.onRelease("left1");
		}
		if (code === 38) {
			inputManager.onRelease("up1");
		}
		if (code === 39) {
			inputManager.onRelease("right1");
		}
		if (code === 40) {
			inputManager.onRelease("down1");
		}
		if (code === 32) {
			inputManager.onRelease("confirm1");
		}
		if (code === 27) {
			inputManager.onRelease("cancel1");
		}
		if (code === 13) {
			inputManager.onRelease("pause1");
		}
		if (code === 65) {
			inputManager.onRelease("left2");
		}
		if (code === 87) {
			inputManager.onRelease("up2");
		}
		if (code === 68) {
			inputManager.onRelease("right2");
		}
		if (code === 83) {
			inputManager.onRelease("down2");
		}
		if (code === 16) {
			inputManager.onRelease("confirm2");
		}
		if (code === 112) {
			inputManager.onRelease("cancel2");
		}
		if (code === 8) {
			inputManager.onRelease("pause2");
		}

	}

	function onGPMove(e) {

		if (e.movementX > 0.2) {
			inputManager.onPress("right1");
			if (inputManager.left1) {
				inputManager.onRelease("left1");
			}
		}
		else if (e.movementX < -0.2) {
			inputManager.onPress("left1");
			if (inputManager.right1) {
				inputManager.onRelease("right1");
			}
		}
		else {
			inputManager.onRelease("left1");
			inputManager.onRelease("right1");
		}

		if (e.movementY > 0.2) {
			inputManager.onPress("down1");
			if (inputManager.up1) {
				inputManager.onRelease("up1");
			}
		}
		else if (e.movementY < -0.2) {
			inputManager.onPress("up1");
			if (inputManager.down1) {
				inputManager.onRelease("down1");
			}
		}
		else {
			inputManager.onRelease("up1");
			inputManager.onRelease("down1");
		}

	}

	function onProMove(e) {

		if (e.movementX > 0.2) {
			inputManager.onPress("right2");
			if (inputManager.left2) {
				inputManager.onRelease("left2");
			}
		}
		else if (e.movementX < -0.2) {
			inputManager.onPress("left2");
			if (inputManager.right2) {
				inputManager.onRelease("right2");
			}
		}
		else {
			inputManager.onRelease("left2");
			inputManager.onRelease("right2");
		}

		if (e.movementY > 0.2) {
			inputManager.onPress("down2");
			if (inputManager.up2) {
				inputManager.onRelease("up2");
			}
		}
		else if (e.movementY < -0.2) {
			inputManager.onPress("up2");
			if (inputManager.down2) {
				inputManager.onRelease("down2");
			}
		}
		else {
			inputManager.onRelease("up2");
			inputManager.onRelease("down2");
		}

	}

})();