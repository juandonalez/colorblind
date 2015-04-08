function Menu() {

	this.overlays = [];

}

Menu.prototype.update = function() {

	if (globals.letsdothis) {
		for (var i = 0; i < this.overlays.length; i++) {
			this.overlays[i].deactivate();
		}
		globals.letsdothis = false;
	}

	for (var i = 0; i < this.overlays.length; i++) {
		this.overlays[i].update();
	}

}

Menu.prototype.draw = function() {

	for (var i = 0; i < this.overlays.length; i++) {
		this.overlays[i].draw();
	}

}