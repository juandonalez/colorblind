function Player1Input(gameObject) {

	this.gameObject = gameObject;

}

Player1Input.prototype.update = function() {

	if (inputManager.left1) {
		this.gameObject.accelLeft();
	}

	if (inputManager.right1) {
		this.gameObject.accelRight();
	}

	if (inputManager.confirm1) {
		
	}

}