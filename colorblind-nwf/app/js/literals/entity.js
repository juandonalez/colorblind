function Entity() {}

Entity.prototype.activate = function() {

	if (this.active !== null) {
		this.active = true;
	}

}

Entity.prototype.calculateCenter = function() {

	return new Point(Math.round(this.origin.x + (this.width/2)), Math.round(this.origin.y + (this.height/2)));

}

Entity.prototype.calculateOrigin = function() {

	return new Point(Math.round(this.center.x - (this.width/2)), Math.round(this.center.y - (this.height/2)));

}

Entity.prototype.deactivate = function() {

	if (this.active !== null) {
		this.active = false;
	}

}

Entity.prototype.intersects = function(ent) {

	return (
		this.origin.x <= ent.origin.x + ent.width &&
		ent.origin.x <= this.origin.x + this.width &&
		this.origin.y <= ent.origin.y + ent.height &&
		ent.origin.y <= this.origin.y + this.height
	);

}

Entity.prototype.pctToPoint = function(p) {

	return new Point(Math.round((this.width/100) * p.x + this.origin.x), Math.round((this.height/100) * p.y + this.origin.y));

}

Entity.prototype.resize = function(s) {

	this.width = Math.round(this.width*s);
	this.height = Math.round(this.height*s);
	this.origin = this.calculateOrigin();

}

Entity.prototype.setAlpha = function(a) {

	this.alpha = a;

}

Entity.prototype.setCenter = function(x, y) {

	this.center.x = x;
	this.center.y = y;
	this.origin = this.calculateOrigin();

}

Entity.prototype.setOrigin = function(x, y) {

	this.origin.x = x;
	this.origin.y = y;
	this.center = this.calculateCenter();

}

Entity.prototype.translate = function(x, y) {

	this.center.x += x;
	this.center.y += y;
	this.origin = this.calculateOrigin();

}