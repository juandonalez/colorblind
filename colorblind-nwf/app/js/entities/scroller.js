function Scroller(scene, d) {

	this.x = 0;
	this.y = d.y;
	this.speed = d.speed;

	if (d.name === "top") {
		this.pool = fileManager.topBgs[scene];
	}
	else if (d.name === "mid") {
		this.pool = fileManager.middleBgs[scene];
	}
	else {
		this.pool = fileManager.bottomBgs[scene];
	}

	this.indexes = new Array(3);

	for (var i = 0; i < 3; i++) {
		var rand = Math.floor(Math.random()*this.pool.length);
		this.indexes[i] = rand;
	}

	d = null;

}

Scroller.prototype.update = function() {

	/*this.x = Math.floor(this.x - (this.speed * globals.delta));

	var first = this.pool[this.indexes[0]];

	if (this.x + first.width < 0) {
		this.x += first.width;
		var rand = Math.floor(Math.random()*this.pool.length);
		this.indexes[0] = this.indexes[1];
		this.indexes[1] = this.indexes[2];
		this.indexes[2] = rand;
	}*/

}

Scroller.prototype.draw = function() {

	var ctx = globals.bufferCtx;
	ctx.globalAlpha = 1;

	var first = this.pool[this.indexes[0]];
	var second = this.pool[this.indexes[1]];
	var third = this.pool[this.indexes[2]];

	// *****figure out camera pos stuff ***
	ctx.drawImage(first, this.x, this.y);
	ctx.drawImage(second, this.x + first.width, this.y);
	ctx.drawImage(third, this.x + first.width + second.width, this.y);

}