Player.prototype = new GameObject();
Player.prototype.constructor = Player;

function Player(n) {

	this.name = "player";
	this.id = utilities.getNewID();

	this.x = globals.playerStartX;
	this.y = globals.playerStartY;
	this.width = globals.playerWidth;
	this.height = globals.playerHeight;
	this.center = new Point(0, 0);
	this.max = new Point(0, 0);
	this.updateBounds();

	this.state = "idle";
	this.dir = "r";

	this.alpha = 1;

	this.vel = new Point(0, 0);
	this.maxVel = 10;
	this.airVel = 1;
	this.maxJump = -20;
	this.isGrounded = false;

	this.components = new Array(3);

	if (n === 2) {
		this.components[0] = new Player2Input(this);
	}
	else {
		this.components[0] = new Player1Input(this);
	}

	this.components[1] = new Sprite(this, -15, -2, "players/" + n + "/");
	this.components[2] = new RigidBody(this, true);

	this.sprite = this.components[1];

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

	this.sprite.draw();

	if (globals.debugMode && globals.debug.hitboxes) {
		var ctx = globals.bufferCtx;
		ctx.globalAlpha = 1;
		ctx.strokeStyle = "blue";
		ctx.strokeRect(this.x, this.y, this.width, this.height);
	}

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

	main.changeScene("mainMenu");

}

Player.prototype.reset = function() {

	this.x = globals.playerStartX;
	this.y = globals.playerStartY;
	this.vel.x = 0;
	this.vel.y = 0;
	this.state = "idle";
	this.dir = "r";
	this.isGrounded = false;

	for (var i = 0; i < this.components.length; i++) {
		this.components[i].reset();
	}

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