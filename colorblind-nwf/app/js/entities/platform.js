function Platform(ent, x, y, width, height) {

	this.type = "Platform";
	this.ent = ent;
	this.friction = 200;

	this.origin = new Point(x, y);
	this.center = new Point(0, 0);
	this.width = width;
	this.height = height;
	this.calculateCenter();

}

// drawing is only done in debug mode
Platform.prototype.draw = function() {

	globals.bufferCtx.globalAlpha = 1;
	globals.bufferCtx.strokeStyle = "blue";
	globals.bufferCtx.strokeRect(this.origin.x, this.origin.y, this.width, this.height);

}

Platform.prototype.onHorizontalCollision = function(ent) {

	if (ent.vel.x > 0) {
		ent.setOrigin(this.origin.x - ent.width - 1, ent.origin.y);
	}
	else if (ent.vel.x < 0) {
		ent.setOrigin(this.origin.x + this.width + 1, ent.origin.y);
	}

	ent.vel.x = 0;

}

Platform.prototype.onVerticalCollision = function(ent) {

	// if velocity is greater than 0 then entity is moving down
	// less than 0 it is moving up

	if (ent.vel.y > 0) {

		if (ent.applyFriction) {
			ent.applyFriction(this.friction);
		}

		ent.setOrigin(ent.origin.x, this.origin.y - ent.height - 1);

		if (ent.isGrounded !== null) {
			ent.isGrounded = true;
		}

	}
	else if (ent.vel.y < 0) {
		ent.setOrigin(ent.origin.x, this.origin.y + this.height + 1);
	}

	ent.vel.y = 0;

}

Platform.prototype.activate = Entity.prototype.activate;

Platform.prototype.calculateCenter = Entity.prototype.calculateCenter;

Platform.prototype.calculateOrigin = Entity.prototype.calculateOrigin;

Platform.prototype.deactivate = Entity.prototype.deactivate;

Platform.prototype.intersects = Entity.prototype.intersects;

Platform.prototype.pause = Entity.prototype.pause;

Platform.prototype.pctToPoint = Entity.prototype.pctToPoint;

Platform.prototype.resize = Entity.prototype.resize;

Platform.prototype.resume = Entity.prototype.resume;

Platform.prototype.setAlpha = Entity.prototype.setAlpha;

Platform.prototype.setCenter = Entity.prototype.setCenter;

Platform.prototype.setOrigin = Entity.prototype.setOrigin;

Platform.prototype.translate = Entity.prototype.translate;

Platform.prototype.update = Entity.prototype.update;