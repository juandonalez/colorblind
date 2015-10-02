function Menu(d) {

	this.name = d.name;
	this.active = d.active;

	// object for all menu items
	// is empty now but overlays will add them
	this.menuItems = {};

	this.overlays = new Array(d.overlays.length);

	for (var i = 0; i < d.overlays.length; i++) {
		this.overlays[i] = new Overlay(this, d.overlays[i]);
	}

	d = null;

}

Menu.prototype.update = function() {

	if (this.active) {
		for (var i = 0; i < this.overlays.length; i++) {
			this.overlays[i].update();
		}
	}

}

Menu.prototype.draw = function() {

	if (this.active) {
		for (var i = 0; i < this.overlays.length; i++) {
			this.overlays[i].draw();
		}
	}

}

Menu.prototype.activate = function() {

	this.active = true;

	for (var i = 0; i < this.overlays.length; i++) {
		this.overlays[i].activate();
	}

}

Menu.prototype.changeItem = function(i) {

	this.menuItems[i].select();

}

Menu.prototype.deactivate = function() {

	for (var i = 0; i < this.overlays.length; i++) {
		this.overlays[i].deactivate();
	}

	var menu = this;
	setTimeout(function() {menu.active = false;}, 1000);

}