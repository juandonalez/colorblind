function Chaser() {

	this.image = fileManager.images["chaser"];
	this.dir = 1;
	this.offset = -75;
	this.speed = 1/30;
	this.accum = 0;

}

Chaser.prototype.update = function() {

	this.accum += globals.delta;

	if (this.accum >= this.speed) {
		if (this.offset === -75) {
			this.dir = -1;
		}
		else if (this.offset === -90) {
			this.dir = 1;
		}

		this.offset += this.dir;

		this.accum = 0;
	}

}

Chaser.prototype.draw = function() {

	globals.bufferCtx.globalAlpha = 1;
	globals.bufferCtx.drawImage(this.image, this.offset, 0);

}

Chaser.prototype.activate = Entity.prototype.activate;

Chaser.prototype.calculateCenter = Entity.prototype.calculateCenter;

Chaser.prototype.calculateOrigin = Entity.prototype.calculateOrigin;

Chaser.prototype.deactivate = Entity.prototype.deactivate;

Chaser.prototype.intersects = Entity.prototype.intersects;

Chaser.prototype.pause = Entity.prototype.pause;

Chaser.prototype.pctToPoint = Entity.prototype.pctToPoint;

Chaser.prototype.resize = Entity.prototype.resize;

Chaser.prototype.resume = Entity.prototype.resume;

Chaser.prototype.setAlpha = Entity.prototype.setAlpha;

Chaser.prototype.setCenter = Entity.prototype.setCenter;

Chaser.prototype.setOrigin = Entity.prototype.setOrigin;

Chaser.prototype.translate = Entity.prototype.translate;