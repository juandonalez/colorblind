Camera.prototype = new GameObject();
Camera.constructor = Camera;

function Camera(x, y) {

	this.name = "camera";
	this.id = utilities.getNewID();

	this.startX = x;
	this.startY = y;

	this.x = x;
	this.y = y;
	this.roundX = x;
	this.roundY = y;
	this.width = globals.screenWidth;
	this.height = globals.screenHeight;
	this.center = new Point(0, 0);
	this.max = new Point(0, 0);
	this.updateBounds();

	this.vel = new Point(0, 0);
	this.alpha = 1;

	this.isShaking = false;
	this.shakeTime = 0;

	this.fader = new Fader(this);

}

Camera.prototype.update = function() {

	this.x += this.vel.x * globals.delta;

	this.roundX = Math.round(this.x);
	this.roundY = Math.round(this.y);

	this.updateBounds();

	this.fader.update();

	if (this.isShaking) {
		this.shake();
	}

}

Camera.prototype.draw = function() {

	if (this.alpha !== 0) {
		globals.bufferCtx.globalAlpha = this.alpha;
		globals.bufferCtx.fillStyle = "black";
		globals.bufferCtx.fillRect(0, 0, globals.gameWidth, globals.gameHeight);
		globals.gpCtx.drawImage(globals.buffer, 0, 0, globals.gpWidth, globals.gpHeight);
		globals.tvCtx.drawImage(globals.buffer, 0, 0, globals.tvWidth, globals.tvHeight);
	}

}

Camera.prototype.fadeIn = function() {

	this.fader.start(0, 5);

}

Camera.prototype.fadeOut = function() {

	this.fader.start(1, 5);

}

Camera.prototype.pctToHeight = function(h) {

	return Math.round((this.height/100) * h);

}

Camera.prototype.pctToPoint = function(p) {

	return new Point(Math.round((this.width/100) * p.x), Math.round((this.height/100) * p.y));

}

Camera.prototype.pctToWidth = function(w) {

	return Math.round((this.width/100) * w);

}

Camera.prototype.reset = function() {

	this.x = this.startX;
	this.y = this.startY;
	this.roundX = this.x;
	this.roundY = this.y;
	this.updateBounds();

}

Camera.prototype.shake = function() {

	if (!this.isShaking) {
		this.isShaking = true;
		this.shakeTime = 0;
	}

	this.shakeTime += globals.delta;

	if (this.shakeTime >= 0.5) {
		this.isShaking = false;
		this.y = 20;
	}
	else {
		this.y = 20 + (Math.floor(Math.random() * 40) - 20);
	}

}