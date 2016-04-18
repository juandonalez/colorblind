OneWayPlatform.prototype = new GameObject();
OneWayPlatform.prototype.constructor = OneWayPlatform;

function OneWayPlatform(x, y, width, height) {

	this.name = "oneWayPlatform";
	this.id = utilities.getNewID();

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

OneWayPlatform.prototype.onVerticalCollision = function(ent) {

	// if velocity is greater than 0 then entity is moving down
	// less than 0 it is moving up

	if (ent.vel.y > 0 && ent.max.y <= this.max.y) {

		if (ent.applyFriction) {
			ent.applyFriction(this.friction);
		}

		ent.setPosition(ent.x, this.y - ent.height - 1);

		if (ent.isGrounded !== null) {
			ent.isGrounded = true;
		}

		ent.vel.y = 0;

	}

}

OneWayPlatform.prototype.reset = function() {

	this.x = this.startX;
	this.y = this.startY;
	this.updateBounds();

}