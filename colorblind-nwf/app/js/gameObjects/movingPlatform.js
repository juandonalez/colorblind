MovingPlatform.prototype = new GameObject();
MovingPlatform.prototype.constructor = MovingPlatform;

function MovingPlatform(x, y, velX, velY) {

	this.name = "movingPlatform";
	this.id = utilities.getNewID();

	this.startX = x;
	this.startY = y;
	this.startVelX = velX;
	this.startVelY = velY;

	this.x = x;
	this.y = y;
	this.width = 4*globals.tileSize;
	this.height = globals.tileSize;
	this.center = new Point(0, 0);
	this.max = new Point(0, 0);
	this.updateBounds();

	this.active = false;
	this.vel = new Point(velX, velY);
	this.friction = 3;

	this.components = new Array(1);
	this.components[0] = new RigidBody(this, false);

}

MovingPlatform.prototype.update = function() {

	if (this.active) {
		for (var i = 0; i < this.components.length; i++) {
			this.components[i].update();
		}
	}

}

MovingPlatform.prototype.draw = function() {

	var ctx = globals.bufferCtx;
	ctx.globalAlpha = 1;
	ctx.fillStyle = "red";
	ctx.fillRect(this.x, this.y, this.width, this.height);

}

MovingPlatform.prototype.onVerticalCollision = function(ent) {

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

MovingPlatform.prototype.reset = function() {

	this.x = this.startX;
	this.y = this.startY;
	this.updateBounds();
	this.vel.x = this.startVelX;
	this.vel.y = this.startVelY;

}