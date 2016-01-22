Platform.prototype = new GameObject();
Platform.prototype.constructor = Platform;

function Platform(x, y, width, height) {

	this.startX = x;
	this.startY = y;

	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.center = new Point(0, 0);
	this.max = new Point(0, 0);
	this.updateBounds();

	this.friction = 3;

}

Platform.prototype.onHorizontalCollision = function(ent) {

	if (ent.vel.x > 0) {
		ent.setPosition(this.x - ent.width - 1, ent.y);
	}
	else if (ent.vel.x < 0) {
		ent.setPosition(this.max.x + ent.width + 1, ent.y);
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

		ent.setPosition(ent.x, this.y - ent.height - 1);

		if (ent.isGrounded !== null) {
			ent.isGrounded = true;
		}

	}
	else if (ent.vel.y < 0) {
		ent.setPosition(ent.x, this.max.y + ent.height + 1);
	}

	ent.vel.y = 0;

}

Platform.prototype.deactivate = function() {

	this.x = this.startX;
	this.y = this.startY;
	this.updateBounds();

}