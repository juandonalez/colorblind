Platform.prototype = new GameObject();
Platform.prototype.constructor = Platform;

function Platform(x, y, width, height) {

	this.name = "platform";
	//this.id = utilities.getNewID();

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

	this.lines = new Array(4);
	this.lines[0] = new Line(x, y, x + width, y);
	this.lines[1] = new Line(x + width, y, x + width, y + height);
	this.lines[2] = new Line(x + width, y + height, x, y + height);
	this.lines[3] = new Line(x, y + height, x, y);

}

Platform.prototype.draw = function() {

	globals.ctx.fillStyle = "red";
	globals.ctx.globalAlpha = 1;
	globals.ctx.fillRect(this.x, this.y, this.width, this.height);

	for (var i = 0; i < this.lines.length; i++) {
		this.lines[i].draw();
	}

}

Platform.prototype.onHorizontalCollision = function(go) {

	if (go.vel.x > 0) {
		go.setPosition(this.x - go.width - 1, go.y);
	}
	else if (go.vel.x < 0) {
		go.setPosition(this.max.x + 1, go.y);
	}

	go.vel.x = 0;

}

Platform.prototype.onVerticalCollision = function(go) {

	// if velocity is greater than 0 then game object is moving down
	// less than 0 it is moving up

	if (go.vel.y > 0) {

		if (go.applyFriction) {
			go.applyFriction(this.friction);
		}

		go.setPosition(go.x, this.y - go.height - 1);

		if (go.isGrounded !== null) {
			go.isGrounded = true;
		}

	}
	else if (go.vel.y < 0) {
		go.setPosition(go.x, this.max.y + 1);
	}

	go.vel.y = 0;

}

Platform.prototype.reset = function() {

	for (var i = 0; i < this.lines.length; i++) {
		this.lines[i].translate(this.startX - this.x, this.startY - this.y);
	}
	this.x = this.startX;
	this.y = this.startY;
	this.updateBounds();

}

Platform.prototype.translate = function(x, y) {

	this.x += x;
	this.y += y;
	for (var i = 0; i < this.lines.length; i++) {
		this.lines[i].translate(x, y);
	}
	this.updateBounds();

}