function Player(n) {

	this.type = "Player";
	this.state = "idle";
	this.origin = new Point(0, 0);
	this.center = new Point(-500, -500);
	this.alpha = 1;

	this.vel = new Point(0, 0);
	this.maxVel = 10;
	this.airVel = 1;
	this.maxJump = -20;
	this.isGrounded = false;

	this.components = new Array(3);

	this.image = fileManager.players[n]["jumping"][0];
	this.components[0] = new Player1Input(this);
	this.components[1] = new Animator(this, fileManager.players[n], 24);
	this.components[2] = new RigidBody(this);

	this.width = globals.playerWidth;
	this.height = globals.playerHeight;
	this.calculateOrigin();

}

Player.prototype.update = function() {

	if (this.isGrounded) {
		if (this.vel.x !== 0) {
			if (this.vel.y !== 0) {
				this.state = "jumping";
				this.isGrounded = false;
			}
			else {
				this.state = "running";
			}
		}
		else {
			this.state = "idle";
		}
	}
	else {
		this.state = "jumping";
	}

	for (var i = 0; i < this.components.length; i++) {
		this.components[i].update();
	}

}

Player.prototype.draw = function() {

	globals.bufferCtx.globalAlpha = this.alpha;
	globals.bufferCtx.drawImage(this.image, this.center.x - (this.image.width/2), this.center.y - (this.image.height/2));

	if (globals.debugMode && globals.debug.hitboxes) {
		globals.bufferCtx.strokeStyle = "blue";
		globals.bufferCtx.strokeRect(this.origin.x, this.origin.y, this.width, this.height);
	}

}

Player.prototype.activate = function(x, y) {

	this.setCenter(x, y);
	this.vel.x = 0;
	this.vel.y = 0;
	this.state = "idle";
	this.isGrounded = false;

}

Player.prototype.accelLeft = function() {

	if (this.isGrounded) {
		if (this.dir === "l") {
			this.vel.x = this.maxVel * -1;
		}
	}
	else {
		this.vel.x -= this.airVel;
		if (this.vel.x < (this.maxVel * -1)) {
			this.vel.x = this.maxVel * -1;
		}
	}

}

Player.prototype.accelRight = function() {

	if (this.isGrounded) {
		if (this.dir === "r") {
			this.vel.x = this.maxVel;
		}
	}
	else {
		this.vel.x += this.airVel;
		if (this.vel.x > this.maxVel) {
			this.vel.x = this.maxVel;
		}
	}

}

Player.prototype.applyFriction = function(f) {

	if (this.vel.x > 0) {
		this.vel.x -= f;
		if (this.vel.x < 0) {
			this.vel.x = 0;
		}
	}
	else if (this.vel.x < 0) {
		this.vel.x += f;
		if (this.vel.x > 0) {
			this.vel.x = 0;
		}
	}

}

Player.prototype.destroy = function() {

	console.log("destroyed");

}

Player.prototype.setImage = function(i) {

	this.image = i;

}

Player.prototype.jump = function() {

	if (this.state !== "jumping") {
		this.isGrounded = false;
		this.vel.y += this.maxJump;
		this.state = "jumping";
	}

}

Player.prototype.calculateCenter = Entity.prototype.calculateCenter;

Player.prototype.calculateOrigin = Entity.prototype.calculateOrigin;

Player.prototype.deactivate = Entity.prototype.deactivate;

Player.prototype.intersects = Entity.prototype.intersects;

Player.prototype.pause = Entity.prototype.pause;

Player.prototype.pctToPoint = Entity.prototype.pctToPoint;

Player.prototype.resize = Entity.prototype.resize;

Player.prototype.resume = Entity.prototype.resume;

Player.prototype.setAlpha = Entity.prototype.setAlpha;

Player.prototype.setCenter = Entity.prototype.setCenter;

Player.prototype.setOrigin = Entity.prototype.setOrigin;

Player.prototype.translate = Entity.prototype.translate;