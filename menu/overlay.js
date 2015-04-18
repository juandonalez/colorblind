function Overlay(o) {

	this.active = o.active;
	this.activePos = camera.pctToPoint(o.activePos);
	this.activePos = this.activePos.subtract(camera.origin);
	this.inactivePos = camera.pctToPoint(o.inactivePos);
	this.inactivePos = this.inactivePos.subtract(camera.origin);

	if (this.active) {
		this.center = this.activePos;
	}
	else {
		this.center = this.inactivePos;
	}

	this.width = camera.pctToWidth(o.width);
	this.height = camera.pctToHeight(o.height);
	this.origin = this.calculateOrigin();
	this.alpha = 1;
	this.menuItems = [];

	for (var i = 0; i < o.menuItems.length; i++) {
		var m = o.menuItems[i];
		m.center = this.pctToPoint(m.center);
		if (m.type === "image") {
			this.menuItems.push(new MenuImage(m));
		}
		else {
			this.menuItems.push(new MenuText(m));
		}
	}

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
	if (this.menuItems) {
		for (var i = 0; i < this.menuItems.length; i++) {
			this.menuItems[i].draw();
		}
	}

}

Overlay.prototype.activate = function () {

	this.easer.start("easeOutBack", this.activePos, 1);

}

Overlay.prototype.calculateOrigin = Entity.prototype.calculateOrigin;

Overlay.prototype.deactivate = function () {

	//this.easer.start("easeInBack", this.inactivePos, 1);
	//this.fader.start(0.1, 1);
	//this.scaler.start("easeInBack", 0.5, 1);
	camera.fadeOut();

}

Overlay.prototype.moveCenter = function(p) {

	this.center = this.center.add(p);
	this.origin = this.calculateOrigin();

	if (this.menuItems) {
		for (var i = 0; i < this.menuItems.length; i++) {
			this.menuItems[i].moveCenter(p);
		}
	}

}

Overlay.prototype.pctToPoint = Entity.prototype.pctToPoint;

Overlay.prototype.resize = function(scale) {

	this.width *= scale;
	this.height *= scale;
	this.origin = this.calculateOrigin();

	if (this.menuItems) {
		for (var i = 0; i < this.menuItems.length; i++) {
			this.menuItems[i].resize(scale);
		}
	}

}

Overlay.prototype.setAlpha = function(a) {

	if (this.alpha) {
		this.alpha = a;
	}

	if (this.menuItems) {
		for (var i = 0; i < this.menuItems.length; i++) {
			if (this.menuItems[i].alpha) {
				this.menuItems[i].alpha = a;
			}
		}
	}

}

Overlay.prototype.setCenter = Entity.prototype.setCenter;