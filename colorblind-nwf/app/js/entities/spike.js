function Spike(x, y, layer) {

	this.active = false;
	this.startPos = new Point(x, y);
	this.origin = new Point(x, y);
	this.center = new Point(0, 0);
	this.width = 40;
	this.height = 40;
	this.calculateCenter();
	this.layer = parseInt(layer);

}

Spike.prototype.update = function() {

	if (this.active) {
	
	}

}

Spike.prototype.draw = function(layer) {

	if (this.layer === layer) {
		globals.bufferCtx.globalAlpha = 1;
		globals.bufferCtx.fillStyle = "blue";
		globals.bufferCtx.fillRect(this.origin.x, this.origin.y, this.width, this.height);
	}

}

Spike.prototype.deactivate = function() {

	this.origin.x = this.startPos.x;
	this.origin.y = this.startPos.y;
	this.calculateCenter();
	this.active = false;

}

Spike.prototype.activate = Entity.prototype.activate;

Spike.prototype.calculateCenter = Entity.prototype.calculateCenter;

Spike.prototype.calculateOrigin = Entity.prototype.calculateOrigin;

Spike.prototype.intersects = Entity.prototype.intersects;

Spike.prototype.pause = Entity.prototype.pause;

Spike.prototype.pctToPoint = Entity.prototype.pctToPoint;

Spike.prototype.resize = Entity.prototype.resize;

Spike.prototype.resume = Entity.prototype.resume;

Spike.prototype.setAlpha = Entity.prototype.setAlpha;

Spike.prototype.setCenter = Entity.prototype.setCenter;

Spike.prototype.setOrigin = Entity.prototype.setOrigin;

Spike.prototype.translate = Entity.prototype.translate;