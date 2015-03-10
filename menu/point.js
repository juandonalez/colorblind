function Point(x, y) {

	this.x = x;
	this.y = y;

	this.add = function(point) {

		var res = new Point(0, 0);
		res.x = this.x + point.x;
		res.y = this.y + point.y;
		return res;

	}

}