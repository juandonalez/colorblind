function Entity() {}

Entity.prototype.calculateOrigin = function() {

	return new Point(this.center.x - (this.width/2), this.center.y - (this.height/2));

}

Entity.prototype.intersects = function(e) {

	return (
		this.origin.x <= e.origin.x + e.width &&
		e.x <= this.origin.x + this.width &&
		this.origin.y <= e.origin.y + e.height &&
		e.y <= this.origin.y + this.height
	);

}

Entity.prototype.moveCenter = function(p) {

	this.center = this.center.add(p);
	this.origin = this.calculateOrigin();

}

Entity.prototype.pctToPoint = function(p) {

	return new Point((this.width/100) * p.x + this.origin.x, (this.height/100) * p.y + this.origin.y);

}

Entity.prototype.resize = function(scale) {

	this.width *= scale;
	this.height *= scale;
	this.origin = this.calculateOrigin();

}

Entity.prototype.setAlpha = function(a) {

	if (this.alpha) {
		this.alpha = a;
	}

}

Entity.prototype.setCenter = function(c) {

	this.center = c;
	this.origin = this.calculateOrigin();

}