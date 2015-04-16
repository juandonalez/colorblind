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

	this.alpha = 1;

	this.easer = new Easer(this);
	this.scaler = new Scaler(this);
	this.fader = new Fader(this);

}

Overlay.prototype.update = function() {

	this.easer.update();
	this.scaler.update();
	this.fader.update();

}

Overlay.prototype.draw = function() {
globals.bufferCtx.globalAlpha = this.alpha;
globals.bufferCtx.fillStyle = "blue";
globals.bufferCtx.fillRect(this.origin.x, this.origin.y, this.width, this.height);
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

	//this.easer.start("easeInBack", this.inactivePos, 1);
	//this.fader.start(0.1, 1);
	this.scaler.start("easeInBack", 0.5, 1);

}

Overlay.prototype.moveCenter = function(p) {

	this.center = this.center.add(p);
	this.origin = this.calculateOrigin();

	if (this.entities) {
		for (var i = 0; i < this.entities.length; i++) {
			this.entities[i].moveCenter(p);
		}
	}

}

Overlay.prototype.pctToPoint = Entity.prototype.pctToPoint;

Overlay.prototype.resize = function(scale) {

	this.width *= scale;
	this.height *= scale;
	this.origin = this.calculateOrigin();

	if (this.entities) {
		for (var i = 0; i < this.entities.length; i++) {
			this.entities[i].resize(scale);
		}
	}

}

Overlay.prototype.setAlpha = function(a) {

	if (this.alpha) {
		this.alpha = a;
	}

	if (this.entities) {
		for (var i = 0; i < this.entities.length; i++) {
			if (this.entities[i].alpha) {
				this.entities[i].alpha = a;
			}
		}
	}

}

Overlay.prototype.setCenter = Entity.prototype.setCenter;