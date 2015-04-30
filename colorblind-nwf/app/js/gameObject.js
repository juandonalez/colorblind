function GameObject(center, origin) {

	this.center = center;
	this.vel = new Point(0, 0);
	this.active = false;
	this.visible = true;
	this.alpha = 1;

}

GameObject.prototype.calculateCenter = function() {

	return new Point(this.center.x - (this.width/2), this.center.y - (this.height/2));

}

GameObject.prototype.calculateOrigin = function() {

	return new Point(this.center.x - (this.width/2), this.center.y - (this.height/2));

}

GameObject.prototype.intersects = function(e) {

	return (
		this.origin.x <= e.origin.x + e.width &&
		e.x <= this.origin.x + this.width &&
		this.origin.y <= e.origin.y + e.height &&
		e.y <= this.origin.y + this.height
	);

}

GameObject.prototype.moveCenter = function(p) {

	this.center = this.center.add(p);
	this.origin = this.calculateOrigin();

}

GameObject.prototype.pctToPoint = function(p) {

	return new Point((this.width/100) * p.x + this.origin.x, (this.height/100) * p.y + this.origin.y);

}

GameObject.prototype.resize = function(scale) {

	this.width *= scale;
	this.height *= scale;
	this.origin = this.calculateOrigin();

}

GameObject.prototype.setAlpha = function(a) {

	this.alpha = a;

}

GameObject.prototype.setCenter = function(c) {

	this.center = c;
	this.origin = this.calculateOrigin();

}