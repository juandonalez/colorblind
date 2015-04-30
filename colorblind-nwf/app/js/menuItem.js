function MenuItem(o) {

	GameObject.call(this, o.center);

	if (o.selectable) {
		this.selected = o.selected;
		this.target = o.target;
		this.left = o.links[0];
		this.up = o.links[1];
		this.right = o.links[2];
		this.down = o.links[3];
	}

}

MenuItem.prototype.update = function() {

	if (this.selected) {

		/*if (inputManager.left) {
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
		}*/

	}

	//this.scaler.update();

}

MenuItem.prototype.select = function() {

	this.selected = true;

}

MenuItem.prototype.deselect = function() {

	this.selected = false;

}