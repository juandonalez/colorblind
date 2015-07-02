function Player(no) {

	this.state = "idle";

	this.center = new Point(-500, -500);
	this.width = globals.playerWidth;
	this.height = globals.playerHeight;
	this.origin = this.calculateOrigin();
	this.alpha = 1;
	this.vel = new Point(0, 0);
	this.maxVel = 200;
	this.isGrounded = true;

	this.components = [];

	if (no === 1) {
		this.image = fileManager.player1["idle"][0];
		this.components.push(new Player1Input(this));
		this.components.push(new RigidBody(this));
		this.components.push(new Animator(this, fileManager.player1, 24));
	}
	else {
		this.image = fileManager.player2["idle"][0];
		this.components.push(new Animator(this, fileManager.player2, 24));
	}

}

Player.prototype.update = function() {

	if (this.isGrounded) {
		if (this.vel.x !== 0) {
			this.state = "running";
		}
		else {
			this.state = "idle";
		}
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

Player.prototype.calculateCenter = GameObject.prototype.calculateCenter;

Player.prototype.calculateOrigin = GameObject.prototype.calculateOrigin;

Player.prototype.intersects = GameObject.prototype.intersects;

Player.prototype.accelLeft = function() {

	/*this.vel.x -= this.accel;
	this.vel.x += globals.currScene.friction;

	if (this.vel.x >= this.maxVel) {
		this.vel.x = this.maxVel;
	}
	else if (this.vel.x < 0) {
		this.vel.x = 0;
	}*/

}

Player.prototype.accelRight = function() {

	this.vel.x = this.maxVel;

}

Player.prototype.pctToPoint = GameObject.prototype.pctToPoint;

Player.prototype.resize = GameObject.prototype.resize;

Player.prototype.setAlpha = GameObject.prototype.setAlpha;

Player.prototype.setCenter = GameObject.prototype.setCenter;

Player.prototype.translate = GameObject.prototype.translate;