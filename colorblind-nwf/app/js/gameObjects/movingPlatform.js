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

	this.prevPos = new Point(0, 0);
	this.prevMax = new Point(0, 0);

	this.active = false;
	this.vel = new Point(velX, velY);
	this.friction = 3;

	this.container = new Bounds(this, this.x, this.y, this.width, this.height);

	this.components = new Array(1);
	this.components[0] = new RigidBody(this, false);

}

MovingPlatform.prototype.update = function() {

	if (this.active) {

		this.prevPos.x = this.x;
		this.prevPos.y = this.y;
		this.prevMax.x = this.max.x;
		this.prevMax.y = this.max.y;
		

		for (var i = 0; i < this.components.length; i++) {
			this.components[i].update();
		}

		for (var i = 0; i < 3; i++) {
			if (globals.players[i].max.y === this.prevPos.y - 1) {
				if (globals.players[i].x >= this.prevPos.x && globals.players[i].x <= this.prevMax.x ||
					globals.players[i].max.x >= this.prevPos.x && globals.players[i].max.x <= this.prevMax.x) {
						globals.players[i].translate(this.x - this.prevPos.x, this.y - this.prevPos.y);
				}
			}
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

MovingPlatform.prototype.translate = function(x, y) {

	this.x += x;
	this.y += y;
	this.updateBounds();
	this.container.translate(x, y);

}