function BackgroundScroller(y, pool, speed) {

	this.x = 0;
	this.y = y;
	this.speed = speed;

	this.pool = pool;
	this.indexes = new Array(3);

	for (var i = 0; i < 3; i++) {
		var rand = Math.floor(Math.random()*this.pool.length);
		this.indexes[i] = rand;
	}

}

BackgroundScroller.prototype.update = function() {

	this.x = Math.floor(this.x - (this.speed * globals.delta));

	var first = this.pool[this.indexes[0]];

	if (this.x + first.width < 0) {
		this.x += first.width;
		var rand = Math.floor(Math.random()*this.pool.length);
		this.indexes[0] = this.indexes[1];
		this.indexes[1] = this.indexes[2];
		this.indexes[2] = rand;
	}

}

BackgroundScroller.prototype.draw = function() {

	var ctx = globals.bufferCtx;
	ctx.globalAlpha = 1;

	var first = this.pool[this.indexes[0]];
	var second = this.pool[this.indexes[1]];
	var third = this.pool[this.indexes[2]];
	var rounded = this.x - camera.origin.x;

	// *****figure out camera pos stuff ***
	ctx.drawImage(first, rounded, this.y - camera.origin.y);
	ctx.drawImage(second, rounded + first.width, this.y - camera.origin.y);
	ctx.drawImage(third, rounded + first.width + second.width, this.y - camera.origin.y);

}