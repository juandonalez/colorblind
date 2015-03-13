function BoundingBox(center, width, height) {

	//this.origin = origin;
	//this.center = new Point(origin.x + (width/2), origin.y + (height/2));
	this.center = center;
	this.origin = new Point(center.x - (width/2), center.y - (height/2));
	this.width = width;
	this.height = height;

	this.setCenter = function(point) {

		this.center = point;
		this.origin.x = this.center.x - (this.width/2);
		this.origin.y = this.center.y - (this.height/2);

	}

	this.moveCenter = function(point) {

		this.center.x += point.x;
		this.center.y += point.y;
		this.origin.x = this.center.x - (this.width/2);
		this.origin.y = this.center.y - (this.height/2);

	}

	this.intersects = function(box) {

		return (
			this.origin.x <= box.origin.x + box.width &&
			box.x <= this.origin.x + this.width &&
			this.origin.y <= box.origin.y + box.height &&
			box.y <= this.origin.y + this.height
		);

	}

	this.pctToPoint = function(p) {

		return new Point((this.width/100) * p.x + this.origin.x, (this.height/100) * p.y + this.origin.y);

	}

}