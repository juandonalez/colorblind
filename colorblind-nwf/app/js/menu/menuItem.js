function MenuItem() {}

MenuItem.prototype.update = function() {

	if (this.selected && inputManager.active) {

		if (inputManager.left) {
			if (this.left) {
				this.menu.changeItem(this.left);
				this.deselect();
			}
		}
		else if (inputManager.up) {
			if (this.up) {
				this.menu.changeItem(this.up);
				this.deselect();
			}
		}
		else if (inputManager.right) {
			if (this.right) {
				this.menu.changeItem(this.right);
				this.deselect();
			}
		}
		else if (inputManager.down) {
			if (this.down) {
				this.menu.changeItem(this.down);
				this.deselect();
			}
		}

	}

	//this.scaler.update();

}

MenuItem.prototype.select = function() {

	this.selected = true;
	inputManager.active = false;
	setTimeout(function() {inputManager.active = true;}, 100);

}

MenuItem.prototype.deselect = function() {

	this.selected = false;

}