Player.prototype = new GameObject();
Player.prototype.constructor = Player;

function Player(n) {

	this.x = 200;
	this.y = 200;
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

	this.image = fileManager.images["players/" + n + "/idle/"][0];

	if (n === 2) {
		this.components[0] = new Player2Input(this);
	}
	else {
		this.components[0] = new Player1Input(this);
	}

	this.components[1] = new Animator(this, "players/" + n + "/", 24);
	this.components[2] = new RigidBody(this);

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

	var ctx = globals.bufferCtx;

	if (this.dir === "l") {
		ctx.translate(this.x + this.width, this.y);
		ctx.scale(-1, 1);
		ctx.drawImage(this.image, 0, 0);
		ctx.scale(-1, 1);
		ctx.translate((this.x + this.width) * -1, this.y * -1);
	}
	else {
		ctx.drawImage(this.image, this.x, this.y);
	}

	if (globals.debugMode && globals.debug.hitboxes) {
		ctx.strokeStyle = "blue";
		ctx.strokeRect(this.x, this.y, this.width, this.height);
	}

}

Player.prototype.activate = function(x, y) {

	this.setPosition(x, y);
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

	main.changeScene("mainMenu");

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