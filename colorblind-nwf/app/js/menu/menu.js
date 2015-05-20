function Menu(d) {

	this.name = d.name;
	this.overlays = [];
	this.menuItems = {};

	var o;
	for (var i = 0; i < d.overlays.length; i++) {
		o = d.overlays[i];
		this.overlays.push(new Overlay(this, o));
	}

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