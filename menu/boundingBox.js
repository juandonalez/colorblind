function BoundingBox(origin, width, height) {

	this.origin = origin;
	this.center = new Point(origin.x + (width/2), origin.y + (height/2));
	this.width = width;
	this.height = height;

	this.setCenter = function(point) {

		this.center = point;
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

}