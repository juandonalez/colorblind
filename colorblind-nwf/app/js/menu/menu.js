function Menu(d) {

	this.name = d.name;
	this.active = d.active;
	this.overlays = [];
	this.menuItems = {};

	var o;
	for (var i = 0; i < d.overlays.length; i++) {
		o = d.overlays[i];
		this.overlays.push(new Overlay(this, o));
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

	setTimeout(function() {this.active = false;}, 1000);

}