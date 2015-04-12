function Overlay(activePos, inactivePos, width, height, active) {

	if (active) {
		this.center = activePos;
	}
	else {
		this.center = inactivePos;
	}

	this.activePos = activePos;
	this.inactivePos = inactivePos;

	this.width = width;
	this.height = height;

	this.origin = this.calculateOrigin();

	this.entities = [];

	this.active = active;

	this.easer = new Easer(this);
	this.scaler = new Scaler(this);

}

Overlay.prototype.update = function() {

	this.easer.update();
	this.scaler.update();

}

Overlay.prototype.draw = function() {

	if (this.entities) {
		for (var i = 0; i < this.entities.length; i++) {
			this.entities[i].draw();
		}
	}

}

Overlay.prototype.activate = function () {

	this.easer.start("easeOutBack", this.activePos, 1);

}

Overlay.prototype.addEntity = function(e) {

	var relative = this.pctToPoint(e.center);
	e.setCenter(relative);
	this.entities.push(e);

}

Overlay.prototype.calculateOrigin = Entity.prototype.calculateOrigin;

Overlay.prototype.deactivate = function () {

	this.scaler.start("easeInBack", 1.5, 1);

}

Overlay.prototype.moveCenter = Entity.prototype.moveCenter;

Overlay.prototype.pctToPoint = Entity.prototype.pctToPoint;

Overlay.prototype.resize = Entity.prototype.resize;

Overlay.prototype.setCenter = Entity.prototype.setCenter;