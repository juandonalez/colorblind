function GameObject () {}

GameObject.prototype.calculateOrigin = function() {

	return new Point(this.center.x - (this.width/2), this.center.y - (this.height/2));

}

GameObject.prototype.intersects = function(box) {

	return (
		this.origin.x <= box.origin.x + box.width &&
		box.x <= this.origin.x + this.width &&
		this.origin.y <= box.origin.y + box.height &&
		box.y <= this.origin.y + this.height
	);

}

GameObject.prototype.moveCenter = function(c) {

	this.center = this.center.add(c);
	this.origin = this.calculateOrigin();

}

GameObject.prototype.pctToPoint = function(p) {

	return new Point((this.width/100) * p.x + this.origin.x, (this.height/100) * p.y + this.origin.y);

}

GameObject.prototype.setCenter = function(c) {

	this.center = c;
	this.origin = this.calculateOrigin();

}