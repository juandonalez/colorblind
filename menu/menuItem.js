function MenuItem() {}

MenuItem.prototype.update = function() {

	if (inputManger.left) {
		if (this.left) {
			this.left.hover();
			this.unhover();
		}
	}
	else if (inputManger.up) {
		if (this.up) {
			this.up.hover();
			this.unhover();
		}
	}
	else if (inputManger.right) {
		if (this.right) {
			this.right.hover();
			this.unhover();
		}
	}
	else if (inputManger.down) {
		if (this.down) {
			this.down.hover();
			this.unhover();
		}
	}

}

MenuItem.prototype.hover = function() {

	this.scaler.start("easeInBack", 1.1, 0.5);

}

MenuItem.prototype.unhover = function() {

	this.scaler.start("easeInBack", 0.9, 0.5);

}