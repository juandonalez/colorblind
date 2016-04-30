function Component() {}

Component.prototype.activate = function() {

	if (this.active !== null) {
		this.active = true;
	}

}

Component.prototype.deactivate = function() {

	if (this.active !== null) {
		this.active = false;
	}

}

Component.prototype.draw = function() {}

Component.prototype.reset = function() {}

Component.prototype.translate = function(x, y) {

	this.x += x;
	this.y += y;
	this.updateBounds();

}

Component.prototype.update = function() {}

Component.prototype.updateBounds = function() {

	if (this.max) {
		this.center.x = this.x + (this.width/2);
		this.center.y = this.y + (this.height/2);
		this.max.x = this.x + this.width;
		this.max.y = this.y + this.height;
	}

}