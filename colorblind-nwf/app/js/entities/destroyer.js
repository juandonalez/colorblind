function Destroyer(x, y, width, height, hasExploder) {

	this.origin = new Point(x, y);
	this.center = new Point(0, 0);
	this.width = width;
	this.height = height;
	this.calculateCenter();

	if (hasExploder) {
		this.exploder = new Exploder(this, 6, ["#000000", "#ffffff"]);
		this.exploder.start(100);
	}

}

Destroyer.prototype.update = function() {

	this.origin.x = camera.origin.x;
	this.calculateCenter();

}

Destroyer.prototype.draw = function() {

	if (this.exploder) {
		this.exploder.draw();
	}

}

Destroyer.prototype.calculateCenter = Entity.prototype.calculateCenter;

Destroyer.prototype.calculateOrigin = Entity.prototype.calculateOrigin;

Destroyer.prototype.intersects = Entity.prototype.intersects;

Destroyer.prototype.pctToPoint = Entity.prototype.pctToPoint;

Destroyer.prototype.resize = Entity.prototype.resize;

Destroyer.prototype.setAlpha = Entity.prototype.setAlpha;

Destroyer.prototype.setCenter = Entity.prototype.setCenter;

Destroyer.prototype.setOrigin = Entity.prototype.setOrigin;

Destroyer.prototype.translate = Entity.prototype.translate;