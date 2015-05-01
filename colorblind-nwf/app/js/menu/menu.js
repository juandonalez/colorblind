function Menu() {

	this.overlays = [];

}

Menu.prototype.update = function() {

	for (var i = 0; i < this.overlays.length; i++) {
		this.overlays[i].update();
	}

}

Menu.prototype.draw = function() {

	for (var i = 0; i < this.overlays.length; i++) {
		this.overlays[i].draw();
	}

}