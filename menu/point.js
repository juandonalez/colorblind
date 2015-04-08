function Point(x, y) {

	this.x = x;
	this.y = y;

}

Point.prototype.add = function(p) {

	return new Point(this.x + p.x, this.y + p.y);

}

Point.prototype.copy = function() {

	return new Point(this.x, this.y);

}

Point.prototype.equals = function(p) {

	return (this.x === p.x && this.y == p.y);

}

Point.prototype.subtract = function(p) {

	return new Point(this.x - p.x, this.y - p.y);

}