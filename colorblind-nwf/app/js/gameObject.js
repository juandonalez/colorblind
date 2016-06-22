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

GameObject.prototype.intersects = function(go) {

	return (
		this.x <= go.max.x &&
		go.x <= this.max.x &&
		this.y <= go.max.y &&
		go.y <= this.max.y
	);

}

GameObject.prototype.onHorizontalCollision = function() {}

GameObject.prototype.onVerticalCollision = function() {}

GameObject.prototype.pctToHeight = function(h) {

	return Math.round((this.height/100) * h);

}

GameObject.prototype.pctToPoint = function(p) {

	return new Point(this.x + Math.round((this.width/100) * p.x), this.y + Math.round((this.height/100) * p.y));

}

GameObject.prototype.pctToWidth = function(w) {

	return Math.round((this.width/100) * w);

}

GameObject.prototype.reset = function() {}

GameObject.prototype.resize = function(s) {

	this.width = Math.round(this.width*s);
	this.height = Math.round(this.height*s);
	this.x = this.center.x - (this.width/2);
	this.y = this.center.y - (this.height/2);
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