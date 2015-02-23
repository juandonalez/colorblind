function Box(x, y, width, height) {

	this.minX = x;
	this.minY = y;
	this.maxX = x + width;
	this.maxY = y + height;
	this.centerX = x + (width/2);
	this.centerY = y + (height/2);
	this.width = width;
	this.height = height;

	this.moveTo = function(x, y) {

		this.minX = x;
		this.minY = y;
		this.recalculate();

	}

	this.recalculate = function() {

		this.maxX = x + width;
		this.maxY = y + height;
		this.centerX = x + (width/2);
		this.centerY = y + (height/2);

	}

}