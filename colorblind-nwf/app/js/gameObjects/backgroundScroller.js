function BackgroundScroller(y, pool, speed) {

	this.x = 0;
	this.y = y;
	this.speed = speed;

	this.pool = pool;
	this.bgs = [];

	for (var i = 0; i < 3; i++) {
		var rand = Math.floor(Math.random()*this.pool.length);
		this.bgs.push(rand);
	}

}

BackgroundScroller.prototype.update = function() {

	this.x = this.x - (this.speed * globals.delta);

	var first = this.pool[this.bgs[0]];

	if (this.x + first.width < 0) {
		this.x = 0;
		this.bgs.shift();
		var rand = Math.floor(Math.random()*this.pool.length);
		this.bgs.push(rand);
	}

}

BackgroundScroller.prototype.draw = function() {

	var ctx = globals.bufferCtx;
	globals.bufferCtx.globalAlpha = 1;

	var first = this.pool[this.bgs[0]];
	var second = this.pool[this.bgs[1]];
	var third = this.pool[this.bgs[2]];
	var rounded = Math.round(this.x);

	// *****figure out camera pos stuff ***
	ctx.drawImage(first, rounded, this.y);
	ctx.drawImage(second, rounded + first.width, this.y);
	ctx.drawImage(third, rounded + first.width + second.width, this.y);

}