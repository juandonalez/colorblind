function Player(no) {

	this.state = "idle";

	this.center = new Point(-500, -500);
	this.alpha = 1;
	this.vel = new Point(0, 0);
	this.maxVel = 600;
	this.airVel = 80;
	this.maxJump = -1200;
	this.isGrounded = false;

	this.components = new Array(3);

	if (no === 1) {
		this.image = fileManager.player1["jumping"][0];
		this.components[0] = new Player1Input(this);
		this.components[1] = new Animator(this, fileManager.player1, 24);
		this.components[2] = new RigidBody(this);
	}
	else {
		this.image = fileManager.player2["idle"][0];
		this.components[0] = new Player1Input(this);
		this.components[1] = new Animator(this, fileManager.player2, 24);
		this.components[2] = new RigidBody(this);
	}

	this.width = this.image.width;
	this.height = this.image.height;
	this.origin = this.calculateOrigin();

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
	globals.bufferCtx.drawImage(this.image, this.origin.x, this.origin.y, this.image.width, this.image.height);

	if (globals.debugMode && globals.debug.hitboxes) {
		globals.bufferCtx.strokeStyle = "blue";
		globals.bufferCtx.strokeRect(this.origin.x, this.origin.y, this.width, this.height);
	}

}

Player.prototype.changeImage = function(i) {

	this.width = i.width;
	this.height = i.height;
	this.origin = this.calculateOrigin();

}

Player.prototype.jump = function() {

	if (this.state !== "jumping") {
		this.isGrounded = false;
		this.vel.y += this.maxJump;
		this.state = "jumping";
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

Player.prototype.calculateCenter = GameObject.prototype.calculateCenter;

Player.prototype.calculateOrigin = GameObject.prototype.calculateOrigin;

Player.prototype.intersects = GameObject.prototype.intersects;

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

Player.prototype.pctToPoint = GameObject.prototype.pctToPoint;

Player.prototype.resize = GameObject.prototype.resize;

Player.prototype.setAlpha = GameObject.prototype.setAlpha;

Player.prototype.setCenter = GameObject.prototype.setCenter;

Player.prototype.setOrigin = GameObject.prototype.setOrigin;

Player.prototype.translate = GameObject.prototype.translate;