function Destroyer(x, y, width, height, animationURL, drawX, drawY) {

	this.origin = new Point(x, y);
	this.center = new Point(0, 0);
	this.width = width;
	this.height = height;
	this.calculateCenter();

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

Destroyer.prototype.activate = Entity.prototype.activate;

Destroyer.prototype.calculateCenter = Entity.prototype.calculateCenter;

Destroyer.prototype.calculateOrigin = Entity.prototype.calculateOrigin;

Destroyer.prototype.deactivate = Entity.prototype.deactivate;

Destroyer.prototype.intersects = Entity.prototype.intersects;

Destroyer.prototype.pause = Entity.prototype.pause;

Destroyer.prototype.pctToPoint = Entity.prototype.pctToPoint;

Destroyer.prototype.resize = Entity.prototype.resize;

Destroyer.prototype.resume = Entity.prototype.resume;

Destroyer.prototype.setAlpha = Entity.prototype.setAlpha;

Destroyer.prototype.setCenter = Entity.prototype.setCenter;

Destroyer.prototype.setOrigin = Entity.prototype.setOrigin;

Destroyer.prototype.translate = Entity.prototype.translate;