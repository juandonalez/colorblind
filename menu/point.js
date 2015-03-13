function Point(x, y) {

	this.x = x;
	this.y = y;

	this.add = function(p) {

		return new Point(this.x + p.x, this.y + p.y);

	}

	this.subtract = function(p) {

		return new Point(this.x - p.x, this.y - p.y);

	}

	this.equals = function(p) {

		return (this.x === p.x && this.y == p.y);

	}

	this.copy = function() {

		return new Point(this.x, this.y);

	}

}