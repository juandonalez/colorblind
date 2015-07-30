function Exploder(ent, points, colors) {

	this.ent = ent;
	this.active = false;
	this.interval = Math.round(this.ent.height/points);
	this.colors = colors;
	this.maxPower = 0;
	this.minPower = 0;

}

Exploder.prototype.update = function() {}

Exploder.prototype.draw = function() {

	if (this.active) {

		var ctx = globals.bufferCtx;
		ctx.globalAlpha = 1;

		var pos = this.ent.origin;
		var rand = 0;
		var randRadius = 0;
		var randColor = 0;

		for (var i = pos.y; i <= pos.y + this.ent.height; i += this.interval) {
			randRadius = Math.floor(Math.random() * (this.maxPower - this.minPower)) + this.minPower;
			randColor = Math.floor(Math.random() * this.colors.length);
			ctx.beginPath();
			ctx.arc(pos.x, i, randRadius, 0, 2*Math.PI);
			ctx.fillStyle = this.colors[randColor];
			ctx.fill();
		}

	}

}

Exploder.prototype.start = function(p) {

	this.maxPower = p;
	this.minPower = Math.round(p/2);
	this.active = true;
	this.accum = 0;

}