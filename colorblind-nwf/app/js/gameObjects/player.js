function Player(no) {

	this.state = "idle";

	this.center = new Point(-500, -500);
	this.width = globals.playerWidth;
	this.height = globals.playerHeight;
	this.origin = this.calculateOrigin();
	this.alpha = 1;
	this.vel = new Point(0, 0);

	this.components = [];

	if (no === 1) {
		this.image = fileManager.player1["idle"][0];
		this.components.push(new Animator(this, fileManager.player1, 24));
	}
	else {
		this.image = fileManager.player2["idle"][0];
		this.components.push(new Animator(this, fileManager.player2, 24));
	}

}

Player.prototype.update = function() {

	for (var i = 0; i < this.components.length; i++) {
		this.components[i].update();
	}

}

Player.prototype.draw = function() {

	globals.bufferCtx.globalAlpha = this.alpha;
	globals.bufferCtx.drawImage(this.image, this.origin.x, this.origin.y, this.image.width, this.image.height);

}

Player.prototype.calculateCenter = GameObject.prototype.calculateCenter;

Player.prototype.calculateOrigin = GameObject.prototype.calculateOrigin;

Player.prototype.intersects = GameObject.prototype.intersects;

Player.prototype.pctToPoint = GameObject.prototype.pctToPoint;

Player.prototype.resize = GameObject.prototype.resize;

Player.prototype.setAlpha = GameObject.prototype.setAlpha;

Player.prototype.setCenter = GameObject.prototype.setCenter;

Player.prototype.translate = GameObject.prototype.translate;