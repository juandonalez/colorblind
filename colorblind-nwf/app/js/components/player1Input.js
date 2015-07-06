function Player1Input(gameObject) {

	this.gameObject = gameObject;

}

Player1Input.prototype.update = function() {

	var go = this.gameObject;

	if (inputManager.right1) {
		if (!inputManager.left1) {
			go.dir = "r";
			go.accelRight();
		}
	}

	if (inputManager.left1) {
		if (!inputManager.right1) {
			go.dir = "l";
			go.accelLeft();
		}
	}

	if (inputManager.confirm1) {
		go.jump();
	}

}