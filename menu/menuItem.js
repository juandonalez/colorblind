function MenuItem() {}

MenuItem.prototype.update = function() {

	if (this.selected) {

		if (inputManager.left) {
			if (this.left) {
				this.left.select();
				this.deselect();
			}
		}
		else if (inputManager.up) {
			if (this.up) {
				this.up.select();
				this.deselect();
			}
		}
		else if (inputManager.right) {
			if (this.right) {
				this.right.select();
				this.deselect();
			}
		}
		else if (inputManager.down) {
			if (this.down) {
				this.down.select();
				this.deselect();
			}
		}

	}

}

MenuItem.prototype.select = function() {

	this.selected = true;

}

MenuItem.prototype.deselect = function() {

	this.selected = false;

}