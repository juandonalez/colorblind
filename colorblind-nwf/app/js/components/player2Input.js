Player2Input.prototype = new Component();
Player2Input.prototype.constructor = Player2Input;

function Player2Input(go) {

	this.go = go;

}

Player2Input.prototype.update = function() {

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