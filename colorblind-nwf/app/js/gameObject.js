function GameObject() {}

GameObject.prototype.activate = function() {

	if (this.active !== null) {
		this.active = true;
	}

}

GameObject.prototype.deactivate = function() {

	if (this.active !== null) {
		this.active = false;
	}

}

GameObject.prototype.draw = function() {}

GameObject.prototype.init = function() {}

GameObject.prototype.intersects = function(ent) {

	return (
		this.x <= ent.max.x &&
		ent.x <= this.max.x &&
		this.y <= ent.max.y &&
		ent.y <= this.max.y
	);

}

GameObject.prototype.reset = function() {}

GameObject.prototype.resize = function(s) {

	this.width = Math.round(this.width*s);
	this.height = Math.round(this.height*s);
	this.updateBounds();

}

GameObject.prototype.setAlpha = function(a) {

	this.alpha = a;

}

GameObject.prototype.setPosition = function(x, y) {

	this.x = x;
	this.y = y;
	this.updateBounds();

}

GameObject.prototype.translate = function(x, y) {

	this.x += x;
	this.y += y;
	this.updateBounds();

}

GameObject.prototype.update = function() {}

GameObject.prototype.updateBounds = function() {

	if (this.max) {
		this.center.x = this.x + (this.width/2);
		this.center.y = this.y + (this.height/2);
		this.max.x = this.x + this.width;
		this.max.y = this.y + this.height;
	}

}