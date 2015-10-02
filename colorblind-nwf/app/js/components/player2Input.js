function Player2Input(ent) {

	this.ent = ent;

}

Player2Input.prototype.update = function() {

	if (inputManager.right2) {
		if (!inputManager.left2) {
			this.ent.dir = "r";
			this.ent.accelRight();
		}
	}

	if (inputManager.left2) {
		if (!inputManager.right2) {
			this.ent.dir = "l";
			this.ent.accelLeft();
		}
	}

	if (inputManager.confirm2) {
		this.ent.jump();
	}

}