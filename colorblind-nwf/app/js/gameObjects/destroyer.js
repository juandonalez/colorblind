Destroyer.prototype = new GameObject();
Destroyer.prototype.constructor = Destroyer;

function Destroyer(x, y, width, height, animationURL, drawX, drawY) {

	this.startX = x;
	this.startY = y;

	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.center = new Point(0, 0);
	this.max = new Point(0, 0);
	this.updateBounds();

	if (animationURL) {
		this.drawOrigin = new Point(drawX, drawY);
		this.image = fileManager.images[animationURL][0];
		this.animator = new Animator(this, animationURL, 24);
	}

}

Destroyer.prototype.update = function() {

	if (this.animator) {
		this.animator.update();
	}

}

Destroyer.prototype.draw = function() {

	if (this.animator) {
		globals.bufferCtx.globalAlpha = 1;
		globals.bufferCtx.drawImage(this.image, this.drawOrigin.x, this.drawOrigin.y);
	}

}

Destroyer.prototype.onCollision = function(ent) {

	if (ent.destroy) {
		ent.destroy();
	}

}

Destroyer.prototype.onHorizontalCollision = function(ent) {

	this.onCollision(ent);

}

Destroyer.prototype.onVerticalCollision = function(ent) {

	this.onCollision(ent);

}