function Point(x, y) {

	this.x = x;
	this.y = y;

	this.add = function(p) {

		return new Point(this.x + p.x, this.y + p.y);

	}

	this.subtract = function(p) {

		return new Point(this.x - p.x, this.y - p.y);

	}

}