Camera.prototype = new GameObject();
Camera.constructor = Camera;

var camera = new Camera();

function Camera() {

	this.x = globals.tileSize;
	this.y = globals.tileSize;
	this.width = globals.gameWidth - (2*globals.tileSize);
	this.height = globals.gameHeight - (2*globals.tileSize);
	this.center = new Point(0, 0);
	this.max = new Point(0, 0);
	this.updateBounds();
	this.alpha = 1;

	this.isShaking = false;
	this.shakeTime = 0;

	this.gpWidth = this.width;
	this.gpHeight = this.height;

	if (globals.isWide) {
		this.tvWidth = this.width;
		this.tvHeight = this.height;
	}
	else {
		this.tvHeight = this.height;
		this.tvWidth = (this.tvHeight/3) * 4;
	}

	this.fader = new Fader(this);

}

Camera.prototype.update = function() {

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

	this.fader.activate(0, 1);

}

Camera.prototype.fadeOut = function() {

	this.fader.activate(1, 1);

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