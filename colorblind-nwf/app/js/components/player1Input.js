Player1Input.prototype = new Component();
Player1Input.prototype.constructor = Player1Input;

function Player1Input(go) {

	this.go = go;

}

Player1Input.prototype.update = function() {

	if (inputManager.right1) {
		if (!inputManager.left1) {
			this.go.dir = "r";
			this.go.accelRight();
		}
	}

	if (inputManager.left1) {
		if (!inputManager.right1) {
			this.go.dir = "l";
			this.go.accelLeft();
		}
	}

	if (inputManager.confirm1) {
		this.go.jump();
	}

}