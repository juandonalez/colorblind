function Player1Input(ent) {

	this.ent = ent;

}

Player1Input.prototype.update = function() {

	if (inputManager.right1) {
		if (!inputManager.left1) {
			this.ent.dir = "r";
			this.ent.accelRight();
		}
	}

	if (inputManager.left1) {
		if (!inputManager.right1) {
			this.ent.dir = "l";
			this.ent.accelLeft();
		}
	}

	if (inputManager.confirm1) {
		this.ent.jump();
	}

}