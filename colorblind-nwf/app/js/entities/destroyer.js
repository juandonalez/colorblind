function Destroyer(x, y, width, height) {

	this.origin = new Point(x, y);
	this.center = new Point(0, 0);
	this.width = width;
	this.height = height;
	this.calculateCenter();

}

Destroyer.prototype.update = function() {

	this.origin.x = camera.origin.x;
	this.calculateCenter();

}

Destroyer.prototype.draw = function() {}

Destroyer.prototype.onCollision = function(ent) {

	if (ent.destroy) {
		ent.destroy();
	}

}

Destroyer.prototype.onHorizontalCollision = function(ent) {

	this.onCollision(ent);

}

Destroyer.prototype.onVerticalCollision = function(ent) {

	this.onCollision(ent);

}

Destroyer.prototype.activate = Entity.prototype.activate;

Destroyer.prototype.calculateCenter = Entity.prototype.calculateCenter;

Destroyer.prototype.calculateOrigin = Entity.prototype.calculateOrigin;

Destroyer.prototype.intersects = Entity.prototype.intersects;

Destroyer.prototype.pctToPoint = Entity.prototype.pctToPoint;

Destroyer.prototype.resize = Entity.prototype.resize;

Destroyer.prototype.setAlpha = Entity.prototype.setAlpha;

Destroyer.prototype.setCenter = Entity.prototype.setCenter;

Destroyer.prototype.setOrigin = Entity.prototype.setOrigin;

Destroyer.prototype.translate = Entity.prototype.translate;