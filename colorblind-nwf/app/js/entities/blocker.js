function Blocker(x, y, width, height) {

	this.origin = new Point(x, y);
	this.center = new Point(0, 0);
	this.width = width;
	this.height = height;
	this.calculateCenter();

}

Blocker.prototype.update = function() {

	this.origin.x = camera.origin.x + camera.width;
	this.calculateCenter();

}

Blocker.prototype.onHorizontalCollision = function(ent) {

	if (ent.type && ent.type === "Player") {

		if (ent.vel.x > 0) {
			ent.setOrigin(this.origin.x - ent.width - 1, ent.origin.y);
		}
		else if (ent.vel.x < 0) {
			ent.setOrigin(this.origin.x + this.width + 1, ent.origin.y);
		}

	}

}

Blocker.prototype.activate = Entity.prototype.activate;

Blocker.prototype.calculateCenter = Entity.prototype.calculateCenter;

Blocker.prototype.calculateOrigin = Entity.prototype.calculateOrigin;

Blocker.prototype.deactivate = Entity.prototype.deactivate;

Blocker.prototype.draw = Entity.prototype.draw;

Blocker.prototype.intersects = Entity.prototype.intersects;

Blocker.prototype.pause = Entity.prototype.pause;

Blocker.prototype.pctToPoint = Entity.prototype.pctToPoint;

Blocker.prototype.resize = Entity.prototype.resize;

Blocker.prototype.resume = Entity.prototype.resume;

Blocker.prototype.setAlpha = Entity.prototype.setAlpha;

Blocker.prototype.setCenter = Entity.prototype.setCenter;

Blocker.prototype.setOrigin = Entity.prototype.setOrigin;

Blocker.prototype.translate = Entity.prototype.translate;