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

	this.images;
	this.texts = [];

	this.active = active;

	this.easer = new Easer(this);

}

Overlay.prototype.calculateOrigin = GameObject.prototype.calculateOrigin;
Overlay.prototype.pctToPoint = GameObject.prototype.pctToPoint;
Overlay.prototype.setCenter = GameObject.prototype.setCenter;

Overlay.prototype.update = function() {

	if (this.easer.isEasing) {
		var prevPos = this.center.copy();
		this.easer.update();
		if (!prevPos.equals(this.center)) {
			var diff = this.center.subtract(prevPos);
			if (this.images) {
				for (var i = 0; i < this.images.length; i++) {
					// maybe should use move center instead so that origin is also updated
					this.images[i].center.add(diff);
				}
			}
			if (this.texts) {
				for (var i = 0; i < this.texts.length; i++) {
					this.texts[i].moveCenter(diff);
				}
			}
		}
	}

}

Overlay.prototype.draw = function() {

	if (this.images) {
		for (var i = 0; i < this.images.length; i++) {
			this.images[i].draw();
		}
	}

	if (this.texts) {
		for (var i = 0; i < this.texts.length; i++) {
			this.texts[i].draw();
		}
	}

}

Overlay.prototype.activate = function () {

	this.easer.ease("easeOutBack", this.activePos, 1);

}

Overlay.prototype.addText = function(t) {

	var relative = this.pctToPoint(t.center);
	t.setCenter(relative);
	this.texts.push(t);

}

Overlay.prototype.deactivate = function () {

	this.easer.ease("easeInBack", this.inactivePos, 1);

}